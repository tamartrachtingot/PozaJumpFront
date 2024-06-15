import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Lend from "../../models/Lend";
import User from "../../models/User";
import { createLend, fetchLends, updateLend } from "../../service/LendService";

export interface LendState {
    lends: Array<Lend>,
    lend:Lend
    status: boolean
}


export const getLends = createAsyncThunk("Lend/getLends", async () => {
    const { data } = await fetchLends();
    return data;
});

export const 
postLend = createAsyncThunk(
    "Lend/post",
    async (newLend: Lend) => {
        console.log(newLend);
        const { data } = await createLend(newLend);
        return data;
    }
);


  export const putLend = createAsyncThunk(
    "Lend/update",
    async (lend:Lend) => {
      const { data } = await updateLend(lend);
      return data;
    }
  );

const initialState: LendState = {
    lends: [],
    lend:{},
    status: false
};
export const LendSlice = createSlice({
    name: 'lend',
    initialState,
    reducers: {
        //הוספה, הצגת כל הקטגוריות, מחיקת קטגוריה, עדכון קטגוריה

        //השאלה 
        addLend: (state, action: PayloadAction<Lend>) => {
            state.lend=action.payload
        },

        //החזרת פריט 
        deleteLend: (state, action: PayloadAction<BigInt>) => {
            state.lends = state.lends.filter(x => x.id != action.payload);
        },

        //אם רוצה לעשות הארכה- עדכון השאלה
        // updateLend: (state, action: PayloadAction<Lend>) => {
        //     state.lends = state.lends.filter(x => x.id != action.payload.id);
        //     state.lends.push(action.payload);
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(getLends.fulfilled, (state, action: PayloadAction<any>) => {
            state.lends = action.payload;
            state.status = false;
        })

        builder.addCase(postLend.fulfilled, (state, action: PayloadAction<any>) => {
            state.lends.push(action.payload)
            state.status = false;
        })

    }


})
export const { addLend, deleteLend} = LendSlice.actions
export default LendSlice.reducer