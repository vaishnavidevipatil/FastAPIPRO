import crud
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from model import User
from database import SessionLocal
from sqlalchemy.orm import Session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, "your_secret_key", algorithms=["HS256"])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code= 401, detail="Invaild authenticated cresentials")
        user = crud.get_user(db, user_id= user_id)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except jwt.PyError:
        raise HTTPException(status_code=401, detail="Invaild authenticated credentials")
