import axios from "axios";
import Category from "../models/Category";

// server קיבלנו מה
export const API=axios.create({
     baseURL: "http://localhost:8585/api/Category",
});

// הוספת קטגוריה חדש לשרת
export const createCategory =(newCategory:Category )=>API.post("",newCategory);

//קבלת כל הקטגוריהים מהשרת
export const fetchCategorys=()=>API.get("/Categorys");

//קבלת קטגוריה מהשרת ע"י הקוד הייחודי
export const fetchCategoryById= (id:number)=> API.get(`/${id}`);

// //קבלת קטגוריה מהשרת ע"י השם
// export const fetchCategoryByName= (name:String)=> API.get(`/${name}`);

//עדכון קטגוריה
export const updateCategory=(Category:Category)=>API.put(`/${Category.id}`,Category);

//מחיקת קטגוריה מהשרת ע"י קוד ייחודי
export const deleteCategory =  (id:number) =>  API.delete(`/${id}`);

