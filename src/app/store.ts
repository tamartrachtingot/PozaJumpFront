import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from '../features/Category/CategorySlice'
import ItemSlice from '../features/Item/ItemSlice'
import LendSlice from '../features/Lend/LendSlice'
import UserSlice from '../features/User/UserSlice'

//יצירת כעין מנהל האפליקציה שבו נוכל להשתמש בכל הדברים
export const store = configureStore({
    reducer:{CategorySlice,ItemSlice,LendSlice,UserSlice}
})
//מחזיר את הסטייט עצמו
export type RootState = ReturnType<typeof store.getState>
//מחזיר את הפעולות - על מנת שנוכל להשתמש בהם כדי לשנות את הסטטיט
export type AppDispatch=typeof store.dispatch
