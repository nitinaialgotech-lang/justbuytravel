import { createSlice } from "@reduxjs/toolkit";


const USER = createSlice({
    name: "user",
    initialState: {
        search: "ytg ",
        active: false
    },
    reducers: {
        searching: (state, action) => {
            state.search = action.payload;
        },
        Setactive: (state, action) => {
            state.active = action.payload
        }

    }
}
)
export const { searching, Setactive } = USER.actions;
export default USER.reducer;