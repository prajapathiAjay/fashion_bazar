import { createSlice } from "@reduxjs/toolkit"
import { fetchProducts } from "./productThunks"

const initialState = {
  products: [],
  loading: false,
  error: null
}

const productSice = createSlice({
  name: "products",
  initialState: {},
  reducers: {
    addProduct: (state, action) => {

    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {

      state.loading = true;
      state.error = null;


    })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  }

})


export const { addProduct } = productSice.actions
export default productSice.reducer