from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote_plus

username = 'root'
password = quote_plus('root')
host = 'localhost'
port = '3306'  # Default MySQL port is 3306
database = 'inventory'

engine = create_engine(f'mysql+pymysql://{username}:{password}@{host}:{port}/{database}')

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
