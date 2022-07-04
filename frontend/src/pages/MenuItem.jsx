import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import {
    getMenu,
    reset,
    updateMenuThunk,
    updateMenu,
} from "../features/menu/menuSlice";
import { Form, Field } from "react-final-form";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteMenuItem } from "../features/menu/menuSlice";
import { Card, Spacer, Text } from "@geist-ui/core";

const MenuItem = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { menuId, menuItemId } = useParams();

    const { user } = useSelector((state) => state.auth);
    const { isLoading, isSuccess, isError, isDeleted, message } = useSelector(
        (state) => state.menu
    );
    const selectedMenuItem = useSelector((state) =>
        state.menu.menu
            .find((menu) => menu._id === menuId)
            ?.menuItems.find((item) => item._id === menuItemId)
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

        if (isSuccess && !isDeleted) {
            toast.success("Changes saved!");
        }

        if (isDeleted) {
            toast.info("Item deleted!");
            navigate("/menus/" + menuId);
        }

        dispatch(getMenu());

        return () => {
            dispatch(reset());
        };
    }, [isError, message, dispatch, isSuccess, isDeleted, navigate, menuId]);

    if (isLoading) {
        return <Spinner />;
    }

    const onSubmit = async (values) => {
        dispatch(updateMenu({ id: menuId, body: values }));
        dispatch(updateMenuThunk(menuId));
    };

    const onClick = () => {
        dispatch(
            deleteMenuItem({ id: menuId, menuItemId: selectedMenuItem._id })
        );
        dispatch(updateMenuThunk(menuId));
    };

    return (
        <>
            <Link to={"/menus/" + menuId}>
                <FaArrowLeft /> Go Back
            </Link>
            <Spacer h={2} />
            <Card hoverable>
                <Form
                    onSubmit={onSubmit}
                    initialValues={{
                        name: selectedMenuItem?.name,
                        desc: selectedMenuItem?.desc,
                        price: selectedMenuItem?.price,
                        _id: selectedMenuItem?._id,
                    }}
                    render={({
                        handleSubmit,
                        form,
                        submitting,
                        pristine,
                        values,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div
                                className="form-group content"
                                key={selectedMenuItem?._id}
                            >
                                <Card.Content>
                                    <Text h2>{values.name}</Text>
                                    <Text h4>Price (RM): {values.price}</Text>
                                </Card.Content>
                                <div>
                                    <label>Item Name</label>
                                    <Field
                                        type="text"
                                        component="input"
                                        name="name"
                                        placeholder="Item Name"
                                    />
                                </div>
                                <div>
                                    <label>Description</label>
                                    <Field
                                        type="text"
                                        component="textarea"
                                        name="desc"
                                        placeholder="Enter item description here..."
                                    />
                                </div>
                                <div>
                                    <label>Price</label>
                                    <Field
                                        type="number"
                                        component="input"
                                        name="price"
                                        placeholder="Price (RM)"
                                        step=".01"
                                        min="0"
                                    />
                                </div>
                                <Card.Footer
                                    style={{ justifyContent: "center" }}
                                >
                                    <button
                                        className="btn-remove-small"
                                        type="button"
                                        onClick={onClick}
                                    >
                                        Delete This Item
                                    </button>
                                    <button
                                        className="btn-small"
                                        type="button"
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                    >
                                        Reset
                                    </button>
                                    <button
                                        className="btn-add-small"
                                        type="submit"
                                        disabled={submitting || pristine}
                                    >
                                        Submit
                                    </button>
                                </Card.Footer>
                            </div>
                        </form>
                    )}
                />
            </Card>
        </>
    );
};

export default MenuItem;
