# import os
# import crud
# import bcrypt
# from datetime import datetime, timedelta
# from fastapi.security import OAuth2PasswordBearer
# from jose import jwt
# # disable passlib bcrypt wrap-bug auto-detection which can trigger
# # bcrypt C-extension errors with long test vectors
# os.environ.setdefault("PASSLIB_NO_AUTO_DETECT_BCRYPT_WRAP_BUG", "1")
# from passlib.context import CryptContext

# # Security setup
# SECRET_KEY = "123"  # Use a secure random key
# from typing import Optional, Annotated
# from datetime import datetime, timedelta
# from fastapi import Depends, HTTPException, status
# from jose import jwt, JWTError
# from passlib.context import CryptContext
# from jwt.exceptions import InvalidTokenError
# from fastapi.security import OAuth2PasswordBearer

# # Security setup
# SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ"  # Use a secure random key
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # Set maximum token expiration to 24 hours (1440 minutes)

# pwd_context = CryptContext(schemes=["bcrypt_sha256"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# def verify_password(plain_password: str, hashed_password: str) -> bool:
#     return pwd_context.verify(plain_password, hashed_password)

# def get_password_hash(password: str) -> str:
#     return pwd_context.hash(password)

# def authenticate_user(db, email: str, password: str):
#     user = crud.get_user_by_email(db, email=email)
#     if not user:
#         return False
#     if not verify_password(password, user.hashed_password):
#         return False
#     return user

# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
#     to_encode = data.copy()
#     # Enforce maximum expiration time
#     expires_delta = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     expire = datetime.utcnow() + expires_delta
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

#     return encoded_jwt

# async def verify_token(token: Annotated[str, Depends(oauth2_scheme)]):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         name: str = payload.get("sub")
#         if name is None:
#             raise credentials_exception
#     except (InvalidTokenError, JWTError):
#         raise credentials_exception
#     return name

from datetime import datetime, timedelta
from typing import Optional, Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from passlib.context import CryptContext

import crud

# ================= SECURITY CONFIG =================

SECRET_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours

pwd_context = CryptContext(schemes=["bcrypt_sha256"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# ================= PASSWORD UTILS =================

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_user(db, email: str, password: str):
    user = crud.get_user_by_email(db, email=email)
    if not user:
        return False
    if not user.hashed_password:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

# ================= JWT =================

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def verify_token(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        sub: str = payload.get("sub")
        name: str = payload.get("name")
        if sub is None:
            raise credentials_exception
        print("Authenticated user:::::::::::::::", name)
        return sub
    except JWTError:
        raise credentials_exception
   