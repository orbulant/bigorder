import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import menuService from "./menuService";

const initialState = {
    menu: [],
    isError: false,
    isCreated: false,
    isSuccess: false,
    isLoading: false,
    isLoaded: false,
    isDeleted: false,
    message: "",
};

// Create new menu
export const createMenu = createAsyncThunk(
    "menu/create",
    async (menuData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await menuService.createMenu(menuData, token);
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

// Get User Menu
export const getMenu = createAsyncThunk("menu/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await menuService.getMenu(token);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete User Menu
export const deleteMenu = createAsyncThunk(
    "menu/delete",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await menuService.deleteMenu(id, token);
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

// Update User Menu
export const updateMenuThunk = createAsyncThunk(
    "menu/update",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;

            const menuToUpdate = thunkAPI
                .getState()
                .menu.menu.find((menu) => menu._id === id);

            return await menuService.updateMenu(id, menuToUpdate, token);
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

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        reset: (state) => initialState,
        updateMenu: (state, action) => {
            const foundIndex = state.menu.findIndex(
                (menu) => menu._id === action.payload.id
            );
            const foundItemIndex = state.menu[foundIndex].menuItems.findIndex(
                (item) => item._id === action.payload.body._id
            );
            state.menu[foundIndex].menuItems[foundItemIndex] =
                action.payload.body;
        },
        addMenuItem: (state, action) => {
            const foundIndex = state.menu.findIndex(
                (menu) => menu._id === action.payload.id
            );
            state.menu[foundIndex].menuItems.push(action.payload.item);
        },
        deleteMenuItem: (state, action) => {
            const foundIndex = state.menu.findIndex(
                (menu) => menu._id === action.payload.id
            );
            const foundItemIndex = state.menu[foundIndex].menuItems.findIndex(
                (item) => item._id === action.payload.menuItemId
            );
            state.menu[foundIndex].menuItems.splice(foundItemIndex, 1);
            state.isDeleted = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createMenu.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isCreated = true;
                state.message = `${action.payload.restaurantName} is created succesfully!`;
                state.menu.push({
                    restaurantName: action.payload.restaurantName,
                    menuItems: action.payload.menuItems,
                });
            })
            .addCase(createMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMenu.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoaded = true;
                state.isCreated = false;
                state.isDeleted = false;
                state.message = "";
                state.menu = action.payload;
            })
            .addCase(getMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateMenuThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateMenuThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(updateMenuThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteMenu.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteMenu.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isDeleted = true;
                state.message = `${action.payload.restaurantName} is deleted!`;
                state.menu = state.menu.filter(
                    (menu) => menu._id !== action.payload.id
                );
            })
            .addCase(deleteMenu.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = "Menu cannot be deleted for some reason!";
            });
    },
});

export const { reset, updateMenu, deleteMenuItem, addMenuItem } = menuSlice.actions;
export default menuSlice.reducer;
