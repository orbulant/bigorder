import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MenuItem from "../components/MenuItem";
import Spinner from "../components/Spinner";
import { getMenu, reset } from "../features/menu/menuSlice";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Spacer, Card, Text } from "@geist-ui/core";

const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { menuId } = useParams();

    const { user } = useSelector((state) => state.auth);
    const { menu, isLoading, isError, message } = useSelector(
        (state) => state.menu
    );

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getMenu());

        return () => {
            dispatch(reset());
        };
    }, [isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    const thisMenu = menu.find((menu) => menu._id === menuId);

    return (
        <>
            <div className="nav-link">
                <Link to="/menus" style={{ fontSize: 18 }}>
                    <FaArrowLeft size={18} style={{ paddingTop: "6px" }} /> Go
                    Back
                </Link>
            </div>
            <Spacer h={2} />
            {thisMenu ? (
                <Card>
                    <Text>Currently viewing this menu:</Text>
                    <Text h2>{thisMenu.restaurantName}</Text>
                    <Spacer h={2} />

                    {thisMenu.menuItems.map((item, index) => (
                        <MenuItem key={index} item={item} />
                    ))}
                </Card>
            ) : (
                <p>This menu is not found.</p>
            )}
        </>
    );
};

export default Menu;
