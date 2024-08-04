import uuid

from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from urllib.parse import quote_plus
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    email = Column(String(64), unique=True, index=True)
    hashed_password = Column(String(64))
    is_active = Column(Boolean, default=True)

    items = relationship("Item", back_populates="owner")


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True)
    title = Column(String(64), index=True)
    description = Column(String(64), index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="items")