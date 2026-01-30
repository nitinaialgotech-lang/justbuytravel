
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
    name: "user",
    initialState: {
        SelectAll: "",
        Hotels: "",
        Flight: "",
        RestaurantL: ""
    },
    reducers: {
        SetSelectAll: (state, action) => {
            state.SelectAll = action.payload
        },
        SetHotels: (state, action) => {
            state.Hotels = action.payload
        },
        SetFlight: (state, action) => {
            state.Flight = action.payload
        },
        SetRestaurant: (state, action) => {
            state.RestaurantL = action.payload
        },
    }

})
export const { SelectAll, SetFlight, SetHotels, SetRestaurant } = counterSlice.actions;
export default counterSlice.reducer
