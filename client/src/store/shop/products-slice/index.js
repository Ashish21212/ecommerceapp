// const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  product: [],
}

export const fetchAllFilteredProducts = createAsyncThunk(
  '/products/fetchAllProducts',
  async ({filterParams,sortParams})=>{

  const query =new URLSearchParams({
    ...filterParams,
    sortBy: sortParams

  })
    
  const result = await axios.get(
    `http://localhost:5000/api/shop/products/fetch?${query}`,{
   
  })
  return result?.data;
})

const shopProductSlice = createSlice({
  name: 'shopppingProducts',
  initialState,
  reducers:{},
  extraReducers: (builder) => {
     builder.addCase(fetchAllFilteredProducts.pending, (state)=>{
      state.isLoading = true;
     })
     .addCase(fetchAllFilteredProducts.fulfilled, (state, action)=>{
      console.log(action.payload, "action payload")
      state.isLoading = false;
      state.products = action.payload.data;
     })
     .addCase(fetchAllFilteredProducts.rejected, (state, action)=>{
      state.isLoading = false;
      state.products = [];
     })
    }

})

export default shopProductSlice.reducer;