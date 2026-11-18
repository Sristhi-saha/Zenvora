import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isloading: false,
  productList: [],
  productDetails: null,
};

// 1. Fetch filtered notes with query parameters
export const fetchAllFilterProducts = createAsyncThunk(
  "/products/getProducts",
  async ({ filterParams = {}, sortParams = "newest" } = {}) => {
    // Build query params: e.g. category=dsa,os&brand=handwritten&sortBy=newest
    const queryParts = [];

    if (filterParams.category && filterParams.category.length > 0) {
      queryParts.push(`category=${filterParams.category.join(",")}`);
    }

    if (filterParams.brand && filterParams.brand.length > 0) {
      queryParts.push(`brand=${filterParams.brand.join(",")}`);
    }

    if (sortParams) {
      queryParts.push(`sortBy=${sortParams}`);
    }

    const queryString = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";

    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get${queryString}`
    );
    return result?.data;
  }
);

// 2. Fetch single note by ID for modal
export const fetchProductDetails = createAsyncThunk(
  "/products/getProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );
    return result?.data;
  }
);

const shopProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    // Reset note details when modal closes
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchAllFilterProducts.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchAllFilterProducts.fulfilled, (state, action) => {
        state.isloading = false;
        state.productList = action.payload?.data || [];
      })
      .addCase(fetchAllFilterProducts.rejected, (state) => {
        state.isloading = false;
        state.productList = [];
      })

      // Fetch Single Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isloading = false;
        state.productDetails = action.payload?.data || null;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isloading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shopProductSlice.actions;

export default shopProductSlice.reducer;
