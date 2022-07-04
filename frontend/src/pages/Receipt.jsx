import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useCallback } from "react";
import { reset, setOrderPaid } from "../features/order/orderSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getOrder } from "../features/order/orderSlice";
import { Button, Table, Text, Card } from "@geist-ui/core";
import { toPng } from "html-to-image";
import { FaArrowLeft } from "react-icons/fa";

import Spinner from "../components/Spinner";

const Receipt = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { orderId } = useParams();
    const ref = useRef(null);
    const { isError, isLoading, message, orders, isSuccess } = useSelector(
        (state) => state.order
    );
    const onButtonClickDownload = useCallback(
        (orders) => {
            if (ref.current === null) {
                return;
            }

            toPng(ref.current, { cacheBust: true })
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.download = `Table ${orders.tableNumber} Order ${orders._id} .png`;
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [ref]
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            toast.success(message);
        }

        dispatch(getOrder(orderId));

        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, isSuccess, orderId, message]);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <div>
            <div className="nav-link">
                <Link
                    to={`/completedorders/${orders.originMenuId}`}
                    style={{ fontSize: 18 }}
                >
                    <FaArrowLeft size={18} style={{ paddingTop: "6px" }} /> Go
                    Back
                </Link>
            </div>
            <h1>Receipt</h1>
            <Button
                type="warning"
                onClick={() => {
                    dispatch(
                        setOrderPaid({
                            orderId: orderId,
                            menuId: orders.originMenuId,
                        })
                    );
                    navigate(`/completedorders/${orders.originMenuId}`);
                }}
                disabled={orders.paid}
            >
                Set Paid
            </Button>
            <Button
                type="success"
                onClick={() => onButtonClickDownload(orders)}
            >
                Print
            </Button>
            <div ref={ref}>
                <Text font="24px" style={{ padding: "20px 20px" }}>
                    Table: {orders.tableNumber}
                </Text>
                <Text>Order ID: {orders._id}</Text>

                <Card>
                    <Table data={orders.cart}>
                        <Table.Column prop="name" label="Item Name" />
                        <Table.Column prop="quantity" label="Quantity" />
                        <Table.Column
                            prop="itemTotal"
                            label="Item Total (RM)"
                        />
                        <Table.Column
                            prop="itemPrice"
                            label="Item Price (RM)"
                            render={(value, rowData, index) =>
                                `${rowData.itemTotal / rowData.quantity}`
                            }
                        />
                    </Table>
                </Card>
                <p style={{ padding: "20px 20px" }}>
                    Total (RM):{" "}
                    {orders.cart &&
                        orders.cart.reduce((accumulator, object) => {
                            return accumulator + object.itemTotal;
                        }, 0).toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default Receipt;
