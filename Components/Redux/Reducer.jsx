
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    SelectAll: "all",
    SearchDetail: {
        lat: "",
        long: "",
        name: ""
    }
}

// 
const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        SetSelectAll: (state, action) => {
            state.SelectAll = action.payload;
        },
        setLat: (state, action) => {
            state.SearchDetail.lat = action.payload
        },
        setLong: (state, action) => {
            state.SearchDetail.long = action.payload
        },
        nameCity: (state, action) => {
            state.SearchDetail.name = action.payload
        },
        resetAction: () => initialState,
    }
})
export const { SetSelectAll, setLat, setLong, nameCity, resetAction } = counterSlice.actions;
export default counterSlice.reducer
