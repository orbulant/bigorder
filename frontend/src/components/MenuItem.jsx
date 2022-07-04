import { useNavigate } from "react-router-dom";
import { Tooltip, Text, Button, Collapse } from "@geist-ui/core";
const MenuItem = ({ item }) => {
    const navigate = useNavigate();

    return (
        <Collapse title={item.name} subtitle={`Price (RM): ${item.price}`}>
            <Text>
                {item.desc ? item.desc : "This item has no description"}
            </Text>
            <Button
                auto
                type="secondary"
                onClick={() => navigate(`${item._id}`)}
            >
                Edit
            </Button>
        </Collapse>
    );
};

export default MenuItem;
