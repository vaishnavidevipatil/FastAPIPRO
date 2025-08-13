from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field, validator

class Token(BaseModel):
    access_token: str
    token_type: str

class ItemBase(BaseModel):
    title: str
    description: Optional[str] = None

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    name: str
    password: str = Field(..., alias="password")       # maps "pass" from JSON
    re_password: str = Field(..., alias="re_password") # maps "re_pass" from JSON

class User(BaseModel):
    id: int
    name: str
    email: str
    is_active: bool

    class Config:
        orm_mode = True