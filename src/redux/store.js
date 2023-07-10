import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import productSlice from "./features/product/productSlice";
import filterSlice from "./features/product/filterSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice,
        filter: filterSlice
    }
})

export default store

