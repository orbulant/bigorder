import { useNavigate } from "react-router-dom";
import { Tooltip, Text, Button } from "@geist-ui/core";
import { FaInfoCircle } from "react-icons/fa";

const MenuItem = ({ item }) => {
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text h1>Item Name: {item.name}</Text>
            <Text h2>Price (RM): {item.price}</Text>
            <Tooltip
                text={item.desc ? item.desc : "This item has no description"}
            >
                <FaInfoCircle />
            </Tooltip>

            <Button
                auto
                type="secondary"
                onClick={() => navigate(`${item._id}`)}
            >
                Edit
            </Button>
        </div>
    );
};

export default MenuItem;
