import { getPublicMenu, reset } from "../features/publicmenu/publicMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import Cart from "../components/Cart";
import Order from "../components/Order";
import { setCurrentOrderInfo } from "../features/order/publicOrderSlice";

const PublicMenu = () => {
    const dispatch = useDispatch();
    const { menuId, tableNumber } = useParams();

    const { restaurantName, menuItems, isLoading, isError, message } =
        useSelector((state) => state.publicmenu);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getPublicMenu(menuId));
        dispatch(
            setCurrentOrderInfo({
                originMenuId: menuId,
                tableNumber: tableNumber,
            })
        );

        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, menuId, message, tableNumber]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <h3>Place your order from {restaurantName}</h3>

            <h4>Current table: {tableNumber}</h4>

            <section>
                <CartProvider>
                    <Cart />
                    {menuItems.length > 0 ? (
                        <Order menuItems={menuItems} />
                    ) : (
                        <h3>No Items Found.</h3>
                    )}
                </CartProvider>
            </section>
        </>
    );
};

export default PublicMenu;
