import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
    orders: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    isLoaded: false,
    isDeleted: false,
    message: "",
};

//Get Specific Order
export const getOrder = createAsyncThunk(
    "publicorder/getorder",
    async (orderId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await orderService.getOrder(token, orderId);
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

//Get Paid Orders
export const getPaidOrders = createAsyncThunk(
    "publicorder/getpaidorder",
    async (menuId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await orderService.getPaidOrders(token, menuId);
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

//Get Uncompleted Orders
export const getUncompletedOrders = createAsyncThunk(
    "publicorder/getuncompleted",
    async (orderId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await orderService.getUncompletedOrders(token, orderId);
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

//Get Completed Orders
export const getCompletedOrders = createAsyncThunk(
    "publicorder/getcompleted",
    async (orderId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await orderService.getCompletedOrders(token, orderId);
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

//Set Order to Completed
export const setOrderCompleted = createAsyncThunk(
    "publicorder/getuncompleted/setcomplete",
    async (orderId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await orderService.setOrderCompleted(token, orderId);
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

//Set Order to be Paid
export const setOrderPaid = createAsyncThunk(
    "publicorder/setpaid",
    async (orderId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await orderService.setOrderPaid(token, orderId);
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

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.orders = action.payload;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getPaidOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPaidOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.orders = action.payload;
            })
            .addCase(getPaidOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getUncompletedOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUncompletedOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.orders = action.payload;
            })
            .addCase(getUncompletedOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getCompletedOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCompletedOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.orders = action.payload;
            })
            .addCase(getCompletedOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(setOrderCompleted.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(setOrderCompleted.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(setOrderCompleted.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(setOrderPaid.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(setOrderPaid.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(setOrderPaid.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});
export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
