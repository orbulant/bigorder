import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import menuReducer from "../features/menu/menuSlice";
import publicMenuReducer from "../features/publicmenu/publicMenuSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        publicmenu : publicMenuReducer
    },
});
