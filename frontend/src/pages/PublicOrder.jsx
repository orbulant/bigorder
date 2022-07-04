import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { reset } from "../features/publicorder/publicOrderSlice";
import { useParams } from "react-router-dom";
import { getCurrentOrder } from "../features/publicorder/publicOrderSlice";
import { Spacer, Divider, Badge, Table, Card } from "@geist-ui/core";

const PublicOrder = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();

    const { isLoading, isError, message, publicOrder } = useSelector(
        (state) => state.publicOrder
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getCurrentOrder(orderId));

        return () => {
            reset();
        };
    }, [dispatch, isError, message, orderId]);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <Card>
            <h1>Your order is placed!</h1>
            <h4>Order ID: {publicOrder ? publicOrder._id : "-"}</h4>
            <Spacer h={1} />
            <h3>Your Table: {publicOrder ? publicOrder.tableNumber : "-"}</h3>
            {/* {publicOrder.cart ? (
                publicOrder.cart.map((item, index) => {
                    return (
                        <Card key={index}>
                            <p>No. {index + 1}</p>
                            <p>Item Name: {item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                        </Card>
                    );
                })
            ) : (
                <div>Nothing here!</div>
            )} */}
            <Table data={publicOrder.cart}>
                <Table.Column prop="name" label="Item Name" />
                <Table.Column prop="desc" label="Description" />
                <Table.Column prop="itemTotal" label="Item Total (RM)" />
                <Table.Column prop="quantity" label="Quantity" />
            </Table>
            <Spacer h={0.4} />
            <Divider />
            <Spacer h={0.4} />
            <Badge font="24px">
                Your total (RM):{"  "}
                {publicOrder.cart ? (
                    publicOrder.cart.reduce((accumulator, object) => {
                        return accumulator + object.itemTotal;
                    }, 0).toFixed(2)
                ) : (
                    <div>-</div>
                )}
            </Badge>
        </Card>
    );
};

export default PublicOrder;
