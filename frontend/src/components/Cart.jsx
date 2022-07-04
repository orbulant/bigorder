import { useCart } from "react-use-cart";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../features/publicorder/publicOrderSlice";
import { Collapse, Spacer, Badge, Button } from "@geist-ui/core";

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
                    <table className="publicMenu">
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="cartItems">
                                    <td
                                        className="cartTableItemBtn"
                                        headers="th1"
                                    >
                                        {item.quantity}x
                                    </td>
                                    <td className="cartTableItem" headers="th2">
                                        {item.name}
                                    </td>
                                    <td className="cartTableItemBtn">
                                        <button
                                            className="btn-remove-small"
                                            onClick={() =>
                                                updateItemQuantity(
                                                    item.id,
                                                    item.quantity - 1
                                                )
                                            }
                                        >
                                            -
                                        </button>
                                    </td>
                                    <td className="cartTableItemBtn">
                                        <button
                                            className="btn-add-small"
                                            onClick={() =>
                                                updateItemQuantity(
                                                    item.id,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td className="cartTableItemBtn">
                                        <button
                                            className="btn-remove-small"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            x
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Collapse>
            </Collapse.Group>
        </section>
    );
};

export default Cart;
