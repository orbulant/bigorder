import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import salesService from "./salesService";

const initialState = {
    totalOrdersMade: 0,
    totalMoneyMade: 0,
    orderedItemsCount: {},
    isError: false,
    isLoading: false,
    isLoaded: false,
    message: "",
};

//Get Total Orders Made
export const getTotalOrdersMade = createAsyncThunk(
    "salesreports/gettotalordersmade",
    async (menuId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await salesService.getTotalOrdersMade(token, menuId);
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

//Get Total Money Made
export const getTotalMoneyMade = createAsyncThunk(
    "salesreports/gettotalmoneymade",
    async (menuId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await salesService.getTotalMoneyMade(token, menuId);
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

//Get Total Money Made
export const getOrderedItemsCount = createAsyncThunk(
    "salesreports/getordereditemscount",
    async (menuId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await salesService.getOrderedItemsCount(token, menuId);
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

export const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTotalOrdersMade.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTotalOrdersMade.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.totalOrdersMade = action.payload;
            })
            .addCase(getTotalOrdersMade.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTotalMoneyMade.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTotalMoneyMade.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.totalMoneyMade = action.payload;
            })
            .addCase(getTotalMoneyMade.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getOrderedItemsCount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderedItemsCount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.orderedItemsCount = action.payload;
            })
            .addCase(getOrderedItemsCount.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = salesSlice.actions;
export default salesSlice.reducer;