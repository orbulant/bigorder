import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { reset } from "../features/order/orderSlice";
import { toast } from "react-toastify";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaSmile, FaArrowLeft } from "react-icons/fa";
import { getPaidOrders } from "../features/order/orderSlice";

import Spinner from "../components/Spinner";
import Order from "../components/Order";
import { Spacer } from "@geist-ui/core";

const PaidOrders = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { menuId } = useParams();
    const { user } = useSelector((state) => state.auth);
    const { isError, isLoading, message, orders, isSuccess } = useSelector(
        (state) => state.order
    );
    const onClickKeyword = "Generate Receipt";

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
        }

        dispatch(getPaidOrders(menuId));

        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, isSuccess, menuId, message]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <section className="marginalizedContent">
            <div className="nav-link">
                <Link to="/menus" font="18px">
                    <FaArrowLeft size={18} style={{ paddingTop: "6px" }} /> Go
                    Back
                </Link>
            </div>
            <Spacer h={2} />
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order._id}>
                        <Order
                            key={order._id}
                            order={order}
                            onClickKeyword={onClickKeyword}
                        />
                        <Spacer h={2} />
                    </div>
                ))
            ) : (
                <p style={{ fontSize: 24, color: "#FFF" }}>
                    No paid orders{" "}
                    <FaSmile size="32" style={{ verticalAlign: "sub" }} />
                </p>
            )}
        </section>
    );
};

export default PaidOrders;
