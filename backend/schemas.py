

from datetime import datetime
from enum import Enum
from pydantic import BaseModel


class Gender(str, Enum):
    male = "male"
    female = "female"
    other = "other"


class UserBase(BaseModel):
    name: str
    email: str
    gender: Gender
    date_of_birth: str
    is_active: bool


class UserResponse(BaseModel):
    name: str
    email: str
    gender: Gender
    date_of_birth: datetime
    is_active: bool


class UserCreate(UserBase):
    hashed_password: str


class User(UserBase):
    id: int

    class Config:
        from_attributes = True
