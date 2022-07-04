import { Card, Spacer, Text, Dot, Button, Badge, Tag } from "@geist-ui/core";
import moment from "moment";

const Order = ({ order, onClick, onClickKeyword }) => {
    return (
        <Card shadow>
            <h4>Order ID: {order._id}</h4>
            <div>
                {onClick ? (
                    <Button auto type={onClickKeyword === "Mark Completed" ? "warning-light" : "success-light" } onClick={onClick}>
                        {onClickKeyword}
                    </Button>
                ) : (
                    <Dot type="secondary">Paid </Dot>
                )}
            </div>
            <div>
                <Dot
                    style={{ marginRight: "20px" }}
                    type={
                        onClickKeyword === "Mark Completed"
                            ? "warning"
                            : "success"
                    }
                >
                    {onClickKeyword === "Mark Completed"
                        ? "Ready"
                        : "Fulfilled"}
                </Dot>
                <Dot type="secondary">
                    {moment(order.updatedAt).format("hh:mm:ssA (DD MMM YYYY)")}
                </Dot>
                <Tag style={{ margin: "5px 20px" }} invert>
                    Table: {order.tableNumber}
                </Tag>
            </div>

            {order.cart.map((x) => (
                <div key={x._id}>
                    <Card key={x._id}>
                        <Text>Item: {x.name}</Text>
                        <Badge>Quantity: {x.quantity}</Badge>
                    </Card>
                    <Spacer h={0.5} />
                </div>
            ))}
            <Text>
                Total (RM):{" "}
                {order.cart.reduce((accumulator, object) => {
                    return accumulator + object.itemTotal;
                }, 0).toFixed(2)}
            </Text>
        </Card>
    );
};

export default Order;
