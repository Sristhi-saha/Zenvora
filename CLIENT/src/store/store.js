import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import adminProductSlice from "./admin/product-slice.js";
import shopProductSlice from "./shop/product-slice/index.js";
import cartSlice from "./shop/cart-slice";
import addressSlice from "./shop/address-slice/index.js";




const store = configureStore({
    reducer:{
        auth:authReducer,
        adminProducts:adminProductSlice,
        shopProducts:shopProductSlice,
        shopCart: cartSlice,
        shopAddress: addressSlice
    },
})

export default store;