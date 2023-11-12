import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [
    {
      id: "",
      products: []
    }
  ]
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addKH: (state, action) => {
      const checkUserCartExist = state.carts.find((item) => item.id === action.payload.idKH)
      const userCart = state.carts.find((item) => item.id === '');
      if (checkUserCartExist != undefined) {
        userCart.products.forEach(i => {
          const item = checkUserCartExist.products.find((item) => item.chitietMathangDTO.id === i.chitietMathangDTO.id);
          if (item) {
            item.quantity += i.quantity;
          } else {
            checkUserCartExist.products.push(i);
          }
        });
        userCart.products = []
        return
      }
      userCart.id = action.payload.idKH
      state.carts.push({
        id: "",
        products: []
      })
    },
    addToCart: (state, action) => {
      const userCart = state.carts.find((item) => item.id === action.payload.idU);
      if (userCart) {
        const item = userCart.products.find((item) => item.chitietMathangDTO.id === action.payload.item.chitietMathangDTO.id);
        if (item) {
          item.quantity += action.payload.item.quantity;
        } else {
          userCart.products.push(action.payload.item);
        }
      }
      else {
        state.carts.push({ "id": action.payload.idU, "products": action.payload.item })
      }
    },
    removeItem: (state, action) => {
      const userCart = state.carts.find((item) => item.id === action.payload.idU);
      userCart.products = userCart.products.filter(item => item.chitietMathangDTO.id !== action.payload.id)
    },
    resetCart: (state, action) => {
      const userCart = state.carts.find((item) => item.id === action.payload.idU);
      userCart.products = []
    },
    add: (state, action) => {
      const userCart = state.carts.find((item) => item.id === action.payload.idU);
      const item = userCart.products.find((item) => item.chitietMathangDTO.id === action.payload.item.chitietMathangDTO.id);
      item.quantity += 1;
    },
    minus: (state, action) => {
      const userCart = state.carts.find((item) => item.id === action.payload.idU);
      const item = userCart.products.find((item) => item.chitietMathangDTO.id === action.payload.item.chitietMathangDTO.id);
      if (item.quantity == 1) return
      item.quantity -= 1;
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart, add, minus, addKH } = cartSlice.actions;

export default cartSlice.reducer;
