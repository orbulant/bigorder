import { useCart } from "react-use-cart";
import { FaInfoCircle } from "react-icons/fa";
import { Tooltip, Table, Button, Spacer } from "@geist-ui/core";

const Order = ({ menuItems }) => {
    const { addItem, inCart } = useCart();

    return (
        <section>
            <Spacer h={2} />
            <Table data={menuItems}>
                <Table.Column prop="name" label="Iten Name" />
                <Table.Column
                    prop="desc"
                    label="Description"
                    render={(value, rowData, index) => (
                        <Tooltip text={rowData.desc}>
                            <FaInfoCircle />
                        </Tooltip>
                    )}
                />
                <Table.Column prop="price" label="Price (RM)" />
                <Table.Column
                    prop="addToCart"
                    label="Add To Cart"
                    render={(value, rowData, index) => {
                        const alreadyAdded = inCart(rowData._id);
                        return (
                            <Button
                                auto
                                scale={1/2}
                                type="secondary-light"
                                onClick={() => {
                                    addItem({
                                        id: rowData._id,
                                        name: rowData.name,
                                        desc: rowData.desc,
                                        price: rowData.price,
                                    });
                                }}
                            >
                                {alreadyAdded ? "Add again" : "Add to Cart"}
                            </Button>
                        );
                    }}
                />
            </Table>
        </section>
    );
};

export default Order;
