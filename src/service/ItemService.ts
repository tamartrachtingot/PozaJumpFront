import axios from "axios";
import Item from "../models/Item";

// server קיבלנו מה
export const API=axios.create({
     baseURL: "http://localhost:8585/api/Item",
});

// הוספת פריט חדש לשרת
export const createItem =(newItem:Item )=>API.post("",newItem);

//קבלת כל הפריטים מהשרת
export const fetchItems=()=>API.get("/Items");

//קבלת פריט מהשרת ע"י הקוד הייחודי
export const fetchItemById= (id:number)=> API.get(`/${id}`);

//קבלת פריט מהשרת ע"י השם
export const fetchItemByName= (name:String)=> API.get(`/${name}`);

//עדכון פריט
export const updateItem=(Item:Item)=>API.put(`/${Item.id}`,Item);

//מחיקת פריט מהשרת ע"י קוד ייחודי
export const deleteItem =  (id:number) =>  API.delete(`/${id}`);

