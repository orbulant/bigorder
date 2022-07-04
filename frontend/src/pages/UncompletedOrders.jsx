import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { reset, getUncompletedOrders } from "../features/order/orderSlice";
import { toast } from "react-toastify";
import { useParams, Link } from "react-router-dom";
import { FaSadTear, FaArrowLeft } from "react-icons/fa";
import { setOrderCompleted } from "../features/order/orderSlice";
import { Spacer } from "@geist-ui/core";

import Spinner from "../components/Spinner";
import Order from "../components/Order";

const UncompletedOrders = () => {
    const dispatch = useDispatch();
    const { menuId } = useParams();
    const { isError, isLoading, message, orders, isSuccess } = useSelector(
        (state) => state.order
    );
    const onClickKeyword = "Mark Completed";

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
        }

        dispatch(getUncompletedOrders(menuId));

        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, isSuccess, menuId, message]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <section className="content">
            <div className="nav-link">
                <Link to="/menus" style={{ fontSize: 18 }}>
                    <FaArrowLeft size={18} style={{ paddingTop: "6px" }} /> Go
                    Back
                </Link>
            </div>
            <Spacer h={2} />
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order._id}>
                        <Order
                            order={order}
                            key={order._id}
                            onClick={() => {
                                dispatch(
                                    setOrderCompleted({
                                        orderId: order._id,
                                        menuId: order.originMenuId,
                                    })
                                );
                            }}
                            onClickKeyword={onClickKeyword}
                        />
                        <Spacer h={2} />
                    </div>
                ))
            ) : (
                <p style={{ fontSize: 30, color: "#FFF" }}>
                    No pending orders from this menu{" "}
                    <FaSadTear size="32" style={{ verticalAlign: "sub" }} />
                </p>
            )}
        </section>
    );
};

export default UncompletedOrders;
