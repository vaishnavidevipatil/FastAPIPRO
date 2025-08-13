from auth import authenticate_user,create_access_token, get_password_hash

from typing  import List
from datetime import timedelta

from fastapi.security import OAuth2PasswordRequestForm
import crud, model, schemas, dependency
from auth import authenticate_user, create_access_token, get_password_hash, verify_token
from typing import List
from fastapi.security import OAuth2PasswordBearer
from datetime import timedelta
# import yfinance as yf
import requests, json
from model import StockRequest

from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session

from fastapi.security import OAuth2PasswordRequestForm
import crud,model, schemas

from database import SessionLocal, engine

from fastapi.middleware.cors import CORSMiddleware

from database import get_db
import crud, schemas

model.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add this OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this if your React app is hosted elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = authenticate_user(db, form_data.name, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(
        data={"sub": user.email}
    )
    return {"access_token": access_token, "token_type": "bearer"}

# @app.post("/token", response_model=schemas.Token)
# # def login_for_access_token(user: schemas.UserCreate, db: Session = Depends(get_db)):
# def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
#     user = authenticate_user(db, form_data.userzname, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect email or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     # Use the maximum expiration set in auth.py
#     access_token = create_access_token(
#         data={"sub": user.email}
#     )
#     return {"access_token": access_token, "token_type": "bearer"}

@app.post("/user/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if email exists
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    new_user = model.User(
        name=user.name,
        email=user.email,
        hashed_password=hashed_password,
        is_active=True
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user, 201


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/users/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)

@app.get("/items/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items

# Update the homepage endpoint to accept both GET and POST methods
@app.get("/homepage/")
async def get_welcome_message(current_user: model.User = Depends(dependency.get_current_user)):
    return {
        "message": "Welcome to the homepage!",
        "user": current_user.email
    }

@app.post("/homepage/")
async def post_welcome_message(current_user: model.User = Depends(dependency.get_current_user)):
    return {
        "message": "Welcome to the homepage!",
        "user": current_user.email
    }
    
# Update the users endpoint
@app.get("/users")
async def get_users(
    current_user: model.User = Depends(dependency.get_current_user),
    db: Session = Depends(get_db)
):
    return crud.get_users(db)
