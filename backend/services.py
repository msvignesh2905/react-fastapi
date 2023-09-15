

from datetime import datetime, timedelta
import logging
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from jose import JWTError, jwt
import models
import schemas
from database import Base, engine, SessionLocal
from sqlalchemy import orm
from models import User
from passlib import hash
import utils
import constants

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")


def create_database():
    Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def get_user_by_email(email: str, db: orm.session):
    return db.query(User).filter(User.email == email).first()


async def create_user(user: schemas.UserCreate, db: orm.session):
    db_user = User(
        name=user.name,
        email=user.email,
        hashed_password=hash.bcrypt.hash(user.hashed_password),
        gender=user.gender,
        date_of_birth=utils.convert_str_to_date(user.date_of_birth)
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


async def authenticate_user(email: str, password: str, db: orm.session):
    user = await get_user_by_email(email=email, db=db)

    # print(f"user -> {email}")
    # print(f"password -> {password}")
    # print(f'verification -> {user.verify_password(password)}')
    if not user:
        return False

    if not user.verify_password(password):
        return False

    return user


async def create_token(user: models.User, access_token_expires: timedelta):
    claims = {
        "sub": user.email,
        "exp": datetime.utcnow() + access_token_expires
    }
    jwt_token = jwt.encode(claims, constants.SECRET_KEY, constants.ALGORITHM)
    return {"access_token": jwt_token, "token_type": "bearer", "user_details": {
        "name": user.name
    }}


async def get_current_user(token: str = Depends(oauth2_scheme), db: orm.session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, constants.SECRET_KEY,
                             algorithms=[constants.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await get_user_by_email(email=username, db=db)
    if user is None:
        raise credentials_exception
    return user
