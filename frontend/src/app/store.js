import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import menuReducer from "../features/menu/menuSlice";
import orderReducer from "../features/order/orderSlice";
import salesReducer from "../features/sales/salesSlice"
import publicMenuReducer from "../features/publicmenu/publicMenuSlice";
import publicOrderReducer from "../features/publicorder/publicOrderSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        order: orderReducer,
        sales: salesReducer,
        publicMenu: publicMenuReducer,
        publicOrder: publicOrderReducer,
    },
});
