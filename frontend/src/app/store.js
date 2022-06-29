import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import menuReducer from "../features/menu/menuSlice";
import publicMenuReducer from "../features/publicmenu/publicMenuSlice";
import publicOrderReducer from "../features/order/publicOrderSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        publicmenu: publicMenuReducer,
        publicOrder: publicOrderReducer,
    },
});
