import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import publicMenuService from "./publicMenuService";

const initialState = {
    _id: "",
    restaurantName: "",
    menuItems: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Get User Menu
export const getPublicMenu = createAsyncThunk(
    "publicmenu/getPublicMenu",
    async (id, thunkAPI) => {
        try {
            return await publicMenuService.getPublicMenu(id);
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

export const publicMenuSlice = createSlice({
    name: "publicmenu",
    initialState: initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPublicMenu.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPublicMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.restaurantName = action.payload.restaurantName;
                state._id = action.payload._id;
                state.menuItems = action.payload.menuItems;
            })
            .addCase(getPublicMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = publicMenuSlice.actions;
export default publicMenuSlice.reducer;
