import datetime

# import sqlalchemy

from sqlalchemy import Boolean, Column, Date, DateTime, Integer, String, orm

from passlib import hash

from database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    gender = Column(String)
    date_of_birth = Column(Date)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow)

    def verify_password(self, password: str):
        return hash.bcrypt.verify(password, self.hashed_password)
