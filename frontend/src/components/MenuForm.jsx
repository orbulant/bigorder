import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createMenu } from "../features/menu/menuSlice";
import { FaPlus } from "react-icons/fa";

const MenuForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [restaurantName, setRestaurantName] = useState("");
    const [menuItems, setMenuItems] = useState([
        { name: "", desc: "", price: 0.0 },
    ]);

    let handleChange = (i, e) => {
        let newMenuItems = [...menuItems];
        newMenuItems[i][e.target.name] = e.target.value;
        setMenuItems(newMenuItems);
    };

    let addFormFields = () => {
        setMenuItems([
            ...menuItems,
            { menuItem: "", description: "", price: 0.0 },
        ]);
    };

    let removeFormFields = (i) => {
        let newFormValues = [...menuItems];
        newFormValues.splice(i, 1);
        setMenuItems(newFormValues);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        navigate("/menus");
        dispatch(createMenu({ restaurantName, menuItems }));
    };

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group title">
                    <label htmlFor="text">Restaurant Name</label>
                    <input
                        type="text"
                        name="text"
                        id="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                    />
                </div>
                {menuItems.map((element, index) => (
                    <div className="form-group content" key={index}>
                        <label>Item Name</label>
                        <input
                            type="text"
                            name="name"
                            value={element.name || ""}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <label>Description</label>
                        <input
                            type="text"
                            name="desc"
                            value={element.desc || ""}
                            onChange={(e) => handleChange(index, e)}
                        />
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={element.price || 0.0}
                            onChange={(e) => handleChange(index, e)}
                            step=".01"
                            min="0"
                        />
                        {index ? (
                            <button
                                type="btn"
                                className="btn-remove"
                                onClick={() => removeFormFields(index)}
                            >
                                Remove
                            </button>
                        ) : null}
                    </div>
                ))}
                <div className="form-group">
                    <button
                        className="btn-add btn-center"
                        type="button"
                        onClick={() => addFormFields()}
                    >
                        <FaPlus /> Add Item
                    </button>
                    <button className="btn btn-block" type="submit">
                        Add Menu
                    </button>
                </div>
            </form>
        </section>
    );
};

export default MenuForm;
