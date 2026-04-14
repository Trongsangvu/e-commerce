import { createAsyncThunk } from "@reduxjs/toolkit";
import cartEndpoints from "../../api/cart.api";
import { addToCart, updateCart } from "../../services/cart-service";
import { CartData, ICartResponse } from "../../types/cart-type";
import { handleAxiosError, RejectType } from "../../utils/error.util";

export const addToCartAction = createAsyncThunk<
  ICartResponse,
  CartData,
  { rejectValue: RejectType }
>(cartEndpoints.addToCart, async (data, { rejectWithValue }) => {
  try {
    const response = await addToCart(data);
    return response;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const updateCartAction = createAsyncThunk<
  ICartResponse,
  CartData,
  { rejectValue: RejectType }
>(cartEndpoints.updateCart, async (data, { rejectWithValue }) => {
  try {
    const response = await updateCart(data);
    return response;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});
