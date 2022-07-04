import { useNavigate } from "react-router-dom";
import { Description, Spacer, Button, Collapse } from "@geist-ui/core";
const MenuItem = ({ item }) => {
    const navigate = useNavigate();

    return (
        <Collapse title={item.name} subtitle={`Price (RM): ${item.price}`}>
            <Description
                title="Description"
                content={item.desc ? item.desc : "This item has no description"}
                style={{textAlign: "left"}}
            />
            <Spacer h={1} />
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
