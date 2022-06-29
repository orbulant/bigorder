import { useCart } from "react-use-cart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../features/order/publicOrderSlice";

const Cart = () => {
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
    const navigate = useNavigate();
    const { restaurantName } = useSelector((state) => state.publicmenu);

    const onSubmit = (e) => {
        e.preventDefault();
        //TODO HERE!!!!!!!!!!!
        dispatch(createOrder());
    };

    if (isEmpty) return <p className="cart">Your cart is empty</p>;

    return (
        <section className="cart">
        <div>{JSON.stringify(items, null, 4)}</div>
            <div style={{ padding: "15px 20px" }}>
                <div>
                    <h2>
                        Your have a total of {totalItems} items in your cart:
                    </h2>
                    <h3>Total (RM): {cartTotal.toFixed(2)}</h3>
                </div>

                {!isEmpty && (
                    <button className="btn-small" onClick={emptyCart}>
                        Empty cart
                    </button>
                )}
            </div>
            <table className="publicMenu">
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} className="cartItems">
                            <td className="cartTableItemBtn" headers="th1">
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
            <div>
                <button
                    style={{ padding: "10px 20px" }}
                    className="btn-small"
                    onSubmit={onSubmit}
                >
                    Place order!
                </button>
            </div>
        </section>
    );
};

export default Cart;
