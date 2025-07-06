// const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  product: [],
  productDetails: null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `http://localhost:5000/api/shop/products/fetch?${query}`,
      {}
    );
    return result?.data;
  }
);
export const fetchProductDetails = createAsyncThunk(
  "/productsDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/fetch/${id}`,
      {}
    );
    return result?.data;
  }
);

const shopProductSlice = createSlice({
  name: "shopppingProducts",
  initialState,
  reducers: {
    setProductDetails : (state, action) => {
      state.productDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        console.log(action.payload, "action payload");
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.products = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
    
        state.isLoading = false;
        state.productDetails = action.payload.data;
            console.log(action.payload, "action payload");
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});
export const { setProductDetails } = shopProductSlice.actions;

export default shopProductSlice.reducer;
