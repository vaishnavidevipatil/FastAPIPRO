# FastAPIPRO

UVICORN= SERVER WHICH RUN WEB APPLICATION TO API AND CONNECT

UVICORN file_name : app --reload

ex- uvicorn main:app --reload

path parameter
query parameter

Purpose: Optional is used to indicate that a variable or parameter can either be of a specified type or be None. It is a way to express that a value is not strictly required and that None is an acceptable value.

When to Use Optional
Parameters: When a function parameter might not be passed or could be None.
Return Types: When a function might return a value of a certain type or None.

/get-by-name?test=2&name=Milk 
O/p:=

{"name":"Milk","price":2.44,"brand":"regular"}

the process of creating a FastAPI blog application integrated with a MySQL database, using SQLAlchemy for database interaction. You'll learn to define data models with Pydantic and how to use MySQL Workbench for database management. Finally, we'll show you how to serve your application using uvicorn.