import { createAsyncThunk, createSlice,PayloadAction } from "@reduxjs/toolkit";
import Item from "../../models/Item"; 
import { createItem, deleteItem, fetchItems, updateItem } from "../../service/ItemService";
export interface ItemState {
    items:Array<Item>
    item:any
}
const initialState:ItemState = {
    items:[],
    item:{}
};

export const getItems=createAsyncThunk("getItems",async()=>{
    const {data}= await fetchItems();
    return data;
 })
 

 export const postItem=createAsyncThunk("category/post",
 async (newcategory: Item) => {
     const { data } = await createItem(newcategory);
     return data;
   }
 );

 export const putItem = createAsyncThunk(
    "item/update",
    async (item:Item) => {
      const { data } = await updateItem(item);
      return data;
    }
  );

  export const deleteItem1 = createAsyncThunk(
    "item/delete",
    async (id:any) => {
        debugger
    await deleteItem(id);
      return id;
    }
  );


 
export const ItemSlice=createSlice({
    name:'item',
    initialState,
    reducers:{
        //הוספה, הצגת כל הפריטים, מחיקת פריט, עדכון פריט
        //הוספת פריט
        addItem:(state,action:PayloadAction<Item>)=>{
            state.item=action.payload;
        },

        //מחיקת פריט
        // deleteItem:(state,action:PayloadAction<BigInt>)=>{
        //     state.items=state.items.filter(x=>x.id!=action.payload);
        // },

        // אם הפריט מושאל או מנהל רוצה לעדכן- עדכון פריט
        // updateItem:(state,action:PayloadAction<Item>)=>{
        //     state.items=state.items.filter(x=>x.id!=action.payload.id);
        //     state.items.push(action.payload)
        // }



    },
    extraReducers: (builder) => {
        //הפעולה הצליחה
        builder.addCase(getItems.fulfilled,(state, action: PayloadAction<any>)=>{
          state.items=action.payload;
        })
        builder.addCase(postItem.fulfilled,(state, action:PayloadAction<any>)=>{
            state.items=action.payload;
        })
        builder.addCase(putItem.fulfilled,(state, action:PayloadAction<any>)=>{
            state.items=action.payload;
        })
        builder.addCase(deleteItem1.fulfilled,(state, action:PayloadAction<any>)=>{
            state.items=action.payload;
        })


  
        
        },
})
export const {addItem} = ItemSlice.actions
export default ItemSlice.reducer