import {
    getPublicMenu,
    reset as menuReset,
} from "../features/publicmenu/publicMenuSlice";
import { reset as orderReset } from "../features/publicorder/publicOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useParams, useNavigate } from "react-router-dom";
import { CartProvider } from "react-use-cart";
import Cart from "../components/Cart";
import PublicOrder from "../components/PublicOrder";
import { setCurrentOrderInfo } from "../features/publicorder/publicOrderSlice";
import { Card } from "@geist-ui/core";

const PublicMenu = () => {
    const [customTable, setCustomTable] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { menuId, tableNumber } = useParams();

    const publicMenu = useSelector((state) => state.publicMenu);

    const publicOrder = useSelector((state) => state.publicOrder);

    useEffect(() => {
        if (publicOrder.isError) {
            toast.error(publicOrder.message);
        }

        if (publicMenu.isError) {
            toast.error(publicMenu.message);
        }

        if (publicOrder.isCreated) {
            toast.success(publicOrder.message);
            navigate("/publicorders/" + publicOrder.publicOrder._id);
        }

        dispatch(getPublicMenu(menuId));

        dispatch(
            setCurrentOrderInfo({
                originMenuId: menuId,
                tableNumber: tableNumber,
            })
        );

        return () => {
            dispatch(menuReset());
            dispatch(orderReset());
        };
    }, [
        dispatch,
        menuId,
        navigate,
        publicMenu.isError,
        publicMenu.message,
        publicOrder.isCreated,
        publicOrder.isError,
        publicOrder.message,
        publicOrder.publicOrder._id,
        tableNumber,
    ]);

    if (publicMenu.isLoading) {
        return <Spinner />;
    }

    return (
        <Card>
            <h3>Place your order from {publicMenu.restaurantName}</h3>

            <h4>Current table: {tableNumber ? tableNumber : customTable}</h4>
            {tableNumber ? (
                <div>
                    <p>{tableNumber}</p>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Table Number..."
                        onChange={(e) => {
                            setCustomTable(e.target.value);
                        }}
                    ></input>
                </div>
            )}
            <div style={{ padding: "10px 10px" }}></div>
            <section>
                <CartProvider>
                    <Cart customTable={customTable} />
                    {publicMenu.menuItems.length > 0 ? (
                        <PublicOrder menuItems={publicMenu.menuItems} />
                    ) : (
                        <h3>No Items Found.</h3>
                    )}
                </CartProvider>
            </section>
        </Card>
    );
};

export default PublicMenu;
