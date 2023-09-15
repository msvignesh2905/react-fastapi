from datetime import timedelta
import logging
from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy import orm
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import schemas
import services
import utils
import constants

logging.basicConfig(
    level=logging.INFO,  # Set your desired log level (e.g., INFO, DEBUG, etc.)
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)


services.create_database()
app = FastAPI()


@app.post("/api/users")
async def create_user(user: schemas.UserCreate, db: orm.session = Depends(services.get_db)):
    logging.info(f'create user')
    db_user = await services.get_user_by_email(user.email, db)

    if db_user:
        raise HTTPException(status_code=400, detail="Email already exist")

    user = await services.create_user(user=user, db=db)
    access_token_expires = timedelta(
        minutes=constants.ACCESS_TOKEN_EXPIRE_MINUTES)
    return await services.create_token(user=user, access_token_expires=access_token_expires)


@app.post("/api/token")
async def generate_token(
        form_data: OAuth2PasswordRequestForm = Depends(),
        db: orm.session = Depends(services.get_db)
):
    logging.info("generate token")
    user = await services.authenticate_user(
        email=form_data.username, password=form_data.password, db=db)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(
        minutes=constants.ACCESS_TOKEN_EXPIRE_MINUTES)
    return await services.create_token(user, access_token_expires)


@app.get("/api/users/me", response_model=schemas.UserBase)
async def get_current_user(user: schemas.User = Depends(services.get_current_user)):
    logging.info(f"get current user")
    user_base = schemas.UserBase(
        name=user.name,
        email=user.email,
        date_of_birth=utils.convert_date_to_str(user.date_of_birth),
        gender=user.gender,
        is_active=user.is_active
    )
    return user_base


@app.get("/api/live")
async def live_check():
    return {"message": "Ready to response"}
