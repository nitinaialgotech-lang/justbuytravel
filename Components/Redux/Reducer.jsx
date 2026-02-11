
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    SelectAll: "all",
    SearchDetail: {
        lat: "",
        long: "",
        name: ""
    },
    SearchFlight: {
        startfrom: "",
        endto: "",
        startDate: "",
        endDate: "",
        type:"1"

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
        // *******************
        setSearchFlight: (state, action) => {
            state.SearchFlight = {
                startfrom: action.payload.startfrom || "",
                endto: action.payload.endto || "",
                startDate: action.payload.startDate || "",
                endDate: action.payload.endDate || "",
                type: action.payload.type || "",
            };
        },

        resetAction: () => initialState,
    }
})
export const { SetSelectAll, setLat, setLong, nameCity, setSearchFlight, resetAction } = counterSlice.actions;
export default counterSlice.reducer
