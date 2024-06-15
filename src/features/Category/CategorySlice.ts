import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import Category from "../../models/Category"; 
import Item from "../../models/Lend";
import { createCategory, fetchCategorys, updateCategory } from "../../service/CategoryService";
import { fetchItems } from "../../service/ItemService";


export interface CategoryState {
    categories: Array<Category> ,
    category:Category
}

const initialState:CategoryState = {
    categories:[],
    category:{}
};
export const getCategorys=createAsyncThunk("category/getcategorys",async()=>{
    const {data} = await fetchCategorys();
    return data;
 })
 

 export const postCategory=createAsyncThunk("category/post",
 async (newcategory: Category) => {
     const { data } = await createCategory(newcategory);
     return data;
   }
 );
 
 export const putCategory = createAsyncThunk(
     "category/update",
     async (category:Category) => {
       const { data } = await updateCategory(category);
       return data;
     }
   );

   export const categoryIn=createAsyncThunk(
    "categoryIn",
    async (category:Category) => {
      const { data } = await fetchItems();
      return data;
    }
  );
 

export const CategorySlice=createSlice({
    name:'category',
    initialState,
    reducers:{
        //הוספה, הצגת כל הקטגוריות, מחיקת קטגוריה, עדכון קטגוריה
        // categoryIn:(state,action:PayloadAction<Category>)=>{
        //     state.category=action.payload;
        // },
        categoryOut:(state)=>{
            state.category={description:"",id:BigInt(-1),image:"",name:""}
        }
        //הוספת קטגוריה
        // addCategory:(state,action:PayloadAction<Category>)=>{
        //     state.categories.push(action.payload)
        // },

        // //מחיקת קטגוריה
        // deleteCategory:(state,action:PayloadAction<BigInt>)=>{
        //     state.categories=state.categories.filter(x=>x.id!=action.payload);
        // },

        // //עדכון קטגוריה
        // updateCategory:(state,action:PayloadAction<Category>)=>{
        //     state.categories=state.categories.filter(x=>x.id!=action.payload.id);
        //     state.categories.push(action.payload);
        // }
    },
    extraReducers: (builder) => {
        //הפעולה הצליחה
        builder.addCase(getCategorys.fulfilled,(state, action: PayloadAction<any>)=>{
          state.categories=action.payload;
        })
        // builder.addCase(putCategory.fulfilled,(state, action:PayloadAction<any>)=>{
        //     state.categories=action.payload;
        // })
        builder.addCase(categoryIn.fulfilled,(state, action:PayloadAction<any>)=>{
                state.category=action.payload;
            })
        
        },
    
})
// export const {categoryIn,categoryOut} = CategorySlice.actions
export default CategorySlice.reducer