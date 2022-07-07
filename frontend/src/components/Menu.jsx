import { useDispatch } from "react-redux";
import { deleteMenu } from "../features/menu/menuSlice";
import { Link } from "react-router-dom";
import { Fieldset, Button, Popover, Text } from "@geist-ui/core";
import { FcSalesPerformance } from "react-icons/fc";

const Menu = ({ menu }) => {
    const dispatch = useDispatch();

    return (
        <Fieldset>
            <Fieldset.Title>{menu.restaurantName}</Fieldset.Title>
            <Fieldset.Subtitle>
                {new Date(menu.createdAt).toLocaleString("en-MY")}
            </Fieldset.Subtitle>
            <Popover
                content={
                    <>
                    <Popover.Item title>
                        <span>Click "X" delete (CAREFUL)</span>
                    </Popover.Item>
                        <Popover.Item style={{justifyContent: "center"}}>
                            <Button
                                auto
                                scale={1 / 12}
                                type="error"
                                onClick={() => {
                                    dispatch(deleteMenu(menu._id));
                                }}
                            >
                                X
                            </Button>
                        </Popover.Item>
                    </>
                }
            >
                <Text font="12px">Wish to delete?</Text>
            </Popover>

            <Fieldset.Footer>
                <Link to={`${menu._id}`}>View</Link>
                <Link to={`/generatemenuqr/${menu._id}`}>Generate QR</Link>
            </Fieldset.Footer>
            <Fieldset.Footer>
                <Link to={`/uncompletedorders/${menu._id}`}>
                    Pending Orders
                </Link>
                <Link to={`/completedorders/${menu._id}`}>
                    Completed Orders
                </Link>
            </Fieldset.Footer>
            <Fieldset.Footer>
                <Link to={`/paidorders/${menu._id}`}>Paid Orders</Link>
                <Link to={`/salesreports/${menu._id}`}>
                    <FcSalesPerformance /> Sales Reports
                </Link>
            </Fieldset.Footer>
        </Fieldset>
    );
};

export default Menu;
