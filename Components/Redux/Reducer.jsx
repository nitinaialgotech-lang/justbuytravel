
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: "user",
    initialState: {
        SelectAll: "all",

    },
    reducers: {
        SetSelectAll: (state, action) => {
            state.SelectAll = action.payload
        }

    }

})
export const { SetSelectAll } = counterSlice.actions;
export default counterSlice.reducer
