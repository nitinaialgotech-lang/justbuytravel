import counterSlice from "./Reducer";

const { configureStore } = require("@reduxjs/toolkit");


const store = configureStore({
    reducer: {
        user: counterSlice
    }
})
export default store;