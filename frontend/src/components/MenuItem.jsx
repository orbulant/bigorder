import { Link } from "react-router-dom";

const MenuItem = ({ item }) => {

    const deleteMenuItem = () => {
        //TODO Delete Menu Item
    }
    return (
        <div className="menu">
            <h2>{item.name}</h2>
            <h5>{item.desc ? item.desc : "This item has no description"}</h5>
            <h4>RM {item.price}</h4>
            <button
                onClick={deleteMenuItem}
                className="close"
            >
                X
            </button>
            <Link to={`${item._id}`}>Edit</Link>
        </div>
    );
};

export default MenuItem;
