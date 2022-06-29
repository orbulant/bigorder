import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import publicOrderService from "./publicOrderService";

const initialState = {
    publicOrder: {},
    isError: false,
    isCreated: false,
    isSuccess: false,
    isLoading: false,
    isLoaded: false,
    isDeleted: false,
    message: "",
};

// Create new order
export const createOrder = createAsyncThunk(
    "order/create",
    async (orderData, thunkAPI) => {
        try {
            return await publicOrderService.createOrder(orderData);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const publicOrderSlice = createSlice({
    name: "publicOrder",
    initialState,
    reducers: {
        reset: (state) => initialState,
        setCurrentOrderInfo: (state, action) => {
            state.publicOrder.originMenuId = action.payload.originMenuId;
            state.publicOrder.tableNumber = action.payload.tableNumber;
            state.publicOrder.completed = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isCreated = true;
                state.message = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});
export const { reset, setCurrentOrderInfo } = publicOrderSlice.actions;
export default publicOrderSlice.reducer;
