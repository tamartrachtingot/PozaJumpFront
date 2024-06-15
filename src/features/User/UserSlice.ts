import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { features } from "process";
import User from "../../models/User"; 
import { createUser, fetchUsers,putCurrentUsers } from "../../service/UserService";

export interface UserState {
    users: Array<User>
    user:User
}

const initialState:UserState =
 {
  users:[],
  user:{status:0}
};
export const getUsers=createAsyncThunk("user/getUsers",async()=>{
   const {data} = await fetchUsers();
   return data;
})

export const postUser=createAsyncThunk("postUser",
async (newUser: User) => {
  
    const { data } = await createUser(newUser);
    return data;
  }
);

export const putUser = createAsyncThunk(
    "user/update",
    async (user:User) => {
      const { data } = await putCurrentUsers(user);
      return data;
    }
  );



export const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        //הוספה, הצגת כל הקטגוריות, מחיקת קטגוריה, עדכון קטגוריה

        //הוספת משתמש חדש -singUp
        addUser:(state,action:PayloadAction<User>)=>{
            state.users.push(action.payload)
        },

        // //מחיקת משתמש
        // deleteUser:(state,action:PayloadAction<BigInt>)=>{
        //     state.users=state.users.filter(x=>x.id!=action.payload);
        // },

        //עדכון משתמש
        updateUser:(state,action:PayloadAction<User>)=>{
          
            state.users=state.users.filter(x=>x.id!=action.payload.id);
            state.users.push(action.payload);
        },

        saveUser:(state,action:PayloadAction<User>)=>{
          console.log(action.payload);
          state.user=action.payload;
        }
    },
    extraReducers: (builder) => {
        //הפעולה הצליחה
        builder.addCase(getUsers.fulfilled,(state, action: PayloadAction<any>)=>{
          state.users=action.payload;
        })
        builder.addCase(putUser.fulfilled,(state, action:PayloadAction<any>)=>{
            state.users=state.users.filter(x=>x.id!=action.payload.id);
            state.users.push(action.payload);
            state.users=action.payload;
        })

        builder.addCase(postUser.fulfilled,(state, action: PayloadAction<any>)=>{
          state.user=action.payload;
          state.users.push(action.payload);
        })
        },
    
})
export const {addUser,updateUser,saveUser} = UserSlice.actions
export default UserSlice.reducer