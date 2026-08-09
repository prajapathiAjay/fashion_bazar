import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts=createAsyncThunk("products/fetchProducts",
    async()=>{

  try{
    const res=await axios.get("http://localhost:3200/api/products");
    console.log("response",res)
    return res.data
  }catch(error){

    console.error("Error fetching products:", error);
    // return rejectWithValue(error.response.data);
  }


    })