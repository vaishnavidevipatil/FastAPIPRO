from fastapi import FastAPI, Path,HTTPException,status, Query, Response, Request
from typing import Optional
from pydantic import BaseModel
from fastapi.templating import Jinja2Templates

from fastapi.responses import HTMLResponse

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine

app = FastAPI()




class Item(BaseModel):
    name:str
    price: float
    brand: Optional[str] = None

class UpdateItem(BaseModel):
    name: Optional[str]=None
    price:Optional[float]=None
    brand: Optional[str] =None

# model.py
class Model:
    def __init__(self):
        pass


inventory={
    1: {
        "name": "Milk",
        "price":2.44,
        "brand":"regular"
    },
    
}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/get-item/{item_id}")
def get_item(item_id: int = Path(..., description="The ID of the item you'd like to view.", gt=0, lt=3)):
    # Validate if the item_id is in the inventory
    # if item_id in inventory:
    return inventory[item_id]
    # return {"error": "Item not found"}

# @app.get("/get-by-name/{item_id}")
# def get_item_by_name(*,item_id: int, name: Optional[str] = None, test: int = 0):
#     for item_id in inventory:
#         if inventory[item_id]["name"] == name:
#             return inventory[item_id]
#     return {"error": "Data not found"}
@app.get("/get-by-name")
def get_item(name:str= Query(None, title="name", description="name of item"), test: int = 0):
    for item_id in inventory:
        if inventory[item_id].name== name:
            return inventory[item_id]
        return {"Data": "Not Found"}
    raise HTTPException(status_code=404, detail="Item Id not found")

@app.post("/create-item/{item_id}")
def create_item(item_id, item: Item):
    if item_id in inventory:
       raise HTTPException(status_code=404, detail="Item already exits.")
   
    inventory[item_id]= item 
    return inventory[item_id]

# #to update the item
# @app.put("/update-item/{item_id}")
# def update_item(item_id:int, item:UpdateItem):
#     if item_id not in inventory:
#         raise HTTPException(status_code=404, detail="Item Id not exits")
#     if item.name != None:
#         inventory[item_id].name= item.name

#     if item.price != None:
#         inventory[item_id].price= item.price

#     if item.brand!=None:
#         inventory[item_id].brand=item.brand

#     return inventory[item_id]

# @app.delete("/delete-item")
# def delete_item(item_id: int =Query(..., description="The ID of the item to delete", ge=0)):
#     if item_id not in inventory:
#         raise HTTPException(status_code=404, detail="Item Id does not exist")
#     del inventory[item_id]
#     return {"Sucess": "Item deleted"}


