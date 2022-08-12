import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};


export const getCartItems = createAsyncThunk('cart/getCartItems',() => {
  return fetch(url).then(resp => resp.json()).catch((error) => console.log(error))
})

const cartSlice = createSlice({


  name: "cart",
  initialState,
  reducers: {


    clearCart: (state) => {
      state.cartItems = [];
    },

    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    increaseItem: (state, { payload }) => {
      const itemId = payload.id;
      state.cartItems.map((item) => {
        if (item.id === itemId) {
          return (item.amount = item.amount + 1);
        }
      });
    },
  


  decreaseItem : (state,action) => {
    const itemId = action.payload;
    state.cartItems.map((item) => {
        if (item.id === itemId) {

          if(item.amount  > 1){
             return (item.amount = item.amount - 1);
          }
         
        }
      });
},

calculateTotals : (state) => {
    let amount = 0;
    let total = 0;
    state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price
    })

    state.amount=amount;
    state.total = total;

}
  },
  extraReducers : {
    [getCartItems.pending] : (state) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled] : (state,action) => {
      state.isLoading = false
      state.cartItems = action.payload;
    },
    [getCartItems.rejected] : (state) => {
      state.isLoading = false
    },

  },

});

export const { clearCart, removeItem, increaseItem, decreaseItem,calculateTotals  } = cartSlice.actions;

export default cartSlice.reducer;
