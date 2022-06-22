import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MenuItem from "../components/MenuItem";
import Spinner from "../components/Spinner";
import { getMenu, reset } from "../features/menu/menuSlice";

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
            {thisMenu ? (
                <section>
                    <h2>Currently viewing this menu:</h2>
                    <div
                        style={{
                            backgroundColor: "darkgrey",
                            color: "white",
                            padding: 20,
                        }}
                    >
                        <h2>{thisMenu.restaurantName}</h2>
                    </div>

                    <div>
                        {thisMenu.menuItems.map((item, index) => (
                            <MenuItem key={index} item={item} />
                        ))}
                    </div>
                </section>
            ) : (
                <p>This menu is not found.</p>
            )}
        </>
    );
};

export default Menu;
