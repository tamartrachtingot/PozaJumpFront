import axios from "axios";
import User from "../models/User";

// server קיבלנו מה
export const API=axios.create({
     baseURL: "http://localhost:8585/api/User",
});

// הוספת משתמש חדש לשרת
export const createUser =(newUser:User)=>API.post("",newUser);

export const fetchUsers=()=>API.get("/Users");

//קבלת משתמש מהשרת ע"י הקוד הייחודי
export const fetchUserById= (id:number)=> API.get(`/${id}`);

export const putCurrentUsers=(user:User)=>API.put(`/${user.id}`,user);




