import { baseApi } from "./api/baseApi";
import { cartSlice } from "./features/cartSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  cart: cartSlice.reducer,
};
