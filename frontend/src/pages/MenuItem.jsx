import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getMenu, reset, updateMenuThunk, updateMenu } from "../features/menu/menuSlice";
import { Form, Field } from "react-final-form";

const MenuItem = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { menuId, menuItemId } = useParams();

    const { user } = useSelector((state) => state.auth);
    const { menu, isLoading, isError, message } = useSelector(
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

        dispatch(getMenu());

        return () => {
            dispatch(reset());
        };
    }, [isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    const onSubmit = async (values) => {
        dispatch(updateMenu({ id: menuId, body: values }));
        dispatch(updateMenuThunk(menuId));
    };

    return (
        <>
            <h2>{JSON.stringify(menu)}</h2>
            <h2>{JSON.stringify(selectedMenuItem)}</h2>
            <section>
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
                                <button
                                    type="submit"
                                    disabled={submitting || pristine}
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={form.reset}
                                    disabled={submitting || pristine}
                                >
                                    Reset
                                </button>
                            </div>
                            <pre>{JSON.stringify(values, 0, 4)}</pre>
                        </form>
                    )}
                />
            </section>
        </>
    );
};

export default MenuItem;
