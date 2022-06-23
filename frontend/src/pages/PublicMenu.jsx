import { getPublicMenu, reset } from "../features/publicmenu/publicMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";

const PublicMenu = () => {
    const dispatch = useDispatch();

    const { menuId } = useParams();

    const {
        restaurantName,
        menuItems,
        isLoading,
        isError,
        message,
    } = useSelector((state) => state.publicmenu);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getPublicMenu(menuId));

        return () => {
            dispatch(reset());
        };
    }, [dispatch, isError, menuId, message]);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <div>Drake</div>
            <h3>{restaurantName}</h3>
            <section className="content">
                {menuItems.length > 0 ? (
                    <section>
                        {menuItems.map((item, index) => (
                            <div key={index}>
                                <h4>{item.name}</h4>
                                <h5>{item.desc}</h5>
                            </div>
                        ))}
                    </section>
                ) : (
                    <h3>No Items Found.</h3>
                )}
            </section>
        </>
    );
};

export default PublicMenu;
