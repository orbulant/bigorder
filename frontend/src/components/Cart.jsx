import { useCart } from "react-use-cart";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../features/publicorder/publicOrderSlice";
import { Collapse, Spacer, Badge, Button, Table } from "@geist-ui/core";

const Cart = ({ customTable }) => {
    const {
        isEmpty,
        cartTotal,
        items,
        updateItemQuantity,
        removeItem,
        emptyCart,
        totalItems,
    } = useCart();

    const dispatch = useDispatch();

    const { originMenuId, tableNumber, completed } = useSelector(
        (state) => state.publicOrder.publicOrder
    );

    const onClick = (e) => {
        e.preventDefault();
        let orderedItems = [];
        items.map((item) => orderedItems.push(item.id));

        const newOrder = {
            originMenuId: originMenuId,
            tableNumber: tableNumber ? tableNumber : customTable,
            cart: items,
            completed: completed,
        };

        dispatch(createOrder(newOrder));
        emptyCart();
    };

    if (isEmpty) return <p className="cart">Your cart is empty</p>;

    return (
        <section className="cart">
            <div
                style={{
                    padding: "10px 20px",
                }}
            >
                <button className="btn-small" onClick={onClick}>
                    Place order!
                </button>
            </div>
            <div style={{ padding: "15px 20px" }}>
                <div>
                    <h2>
                        Your have a total of {totalItems} items in your cart.
                    </h2>
                    <Badge font="18px">
                        Total (RM): {cartTotal.toFixed(2)}
                    </Badge>
                </div>
                <Spacer h={1} />
                {!isEmpty && (
                    <Button type="error" onClick={emptyCart}>
                        Empty cart
                    </Button>
                )}
            </div>
            <Collapse.Group>
                <Collapse title="Cart" initialVisible>
                    <Table data={items} style={{justifyContent: "flex-start"}}>
                        <Table.Column prop="quantity" label="Quantity" />
                        <Table.Column prop="name" label="Name" />
                        <Table.Column
                            prop="decrement"
                            label="Remove"
                            render={(value, rowData) => (
                                <button
                                    className="btn-remove-small"
                                    onClick={() =>
                                        updateItemQuantity(
                                            rowData.id,
                                            rowData.quantity - 1
                                        )
                                    }
                                >
                                    -
                                </button>
                            )}
                        />
                        <Table.Column
                            prop="increment"
                            label="Add"
                            render={(value, rowData) => (
                                <button
                                    className="btn-add-small"
                                    onClick={() =>
                                        updateItemQuantity(
                                            rowData.id,
                                            rowData.quantity + 1
                                        )
                                    }
                                >
                                    +
                                </button>
                            )}
                        />
                        <Table.Column
                            prop="remove"
                            label="Delete"
                            render={(value, rowData) => (
                                <button
                                    className="btn-remove-small"
                                    onClick={() => removeItem(rowData.id)}
                                >
                                    x
                                </button>
                            )}
                        />
                    </Table>
                </Collapse>
            </Collapse.Group>
        </section>
    );
};

export default Cart;
