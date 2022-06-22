import { useDispatch } from "react-redux";
import { deleteMenu } from "../features/menu/menuSlice";
import { Link } from "react-router-dom";

const MenuItem = ({ menu }) => {
    const dispatch = useDispatch();

    return (
        <div className="menu">
            <div>{new Date(menu.createdAt).toLocaleString("en-MY")}</div>
            <h2>{menu.restaurantName}</h2>
            <button
                onClick={() => {
                    dispatch(deleteMenu(menu._id));
                }}
                className="close"
            >
                X
            </button>
            <Link to={`${menu._id}`}>View</Link>
        </div>
    );
};

export default MenuItem;
