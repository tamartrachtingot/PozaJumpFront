import axios from "axios";
import Lend from "../models/Lend";

// server קיבלנו מה
export const API=axios.create({
     baseURL: "http://localhost:8585/api/Lend",
});

// הוספת השאלה חדש לשרת
export const createLend =(newLend:Lend )=>API.post("",newLend);

//קבלת כל ההשאלהים מהשרת
export const fetchLends=()=>API.get("/Lends");

//קבלת השאלה מהשרת ע"י הקוד הייחודי
export const fetchLendById= (id:number)=> API.get(`/${id}`);

// //קבלת השאלה מהשרת ע"י השם
// export const fetchLendByName= (name:String)=> API.get(`/${name}`);

//עדכון השאלה בשרת
export const updateLend=async(lend:Lend)=> await API.put(`/${lend.id}`,lend);

//מחיקת השאלה מהשרת ע"י קוד ייחודי
export const deleteLend =  (id:number) =>  API.delete(`/${id}`);

