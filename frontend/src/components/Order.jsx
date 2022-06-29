import { useCart } from "react-use-cart";
import ReactTooltip from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";

const Order = ({ menuItems }) => {
    const { addItem, inCart } = useCart();

    return (
        <section>
            <table className="publicMenu">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Price (RM)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map((item) => {
                        const alreadyAdded = inCart(item._id);
                        return (
                            <tr key={item._id}>
                                <td>
                                    <p>{item.name}</p>
                                </td>
                                <td>
                                    <p data-tip={item.desc}>
                                        <FaInfoCircle />
                                    </p>

                                    <ReactTooltip
                                        place="top"
                                        type="info"
                                        effect="solid"
                                    />
                                </td>
                                <td>
                                    <h5>RM: {item.price}</h5>
                                </td>
                                <td>
                                    <button
                                        className="btn-add-small"
                                        onClick={() =>
                                            addItem({
                                                id: item._id,
                                                name: item.name,
                                                desc: item.desc,
                                                price: item.price,
                                            })
                                        }
                                    >
                                        {alreadyAdded
                                            ? "Add Again"
                                            : "Add to Cart"}
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </section>
    );
};

export default Order;
