import uuid
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from urllib.parse import quote_plus
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from database import Base
from pydantic import BaseModel

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(64))
    email = Column(String(64), unique=True, index=True)
    hashed_password = Column(String(255))
    is_active = Column(Boolean, default=True)

class StockRequest(BaseModel):
    symbol: str