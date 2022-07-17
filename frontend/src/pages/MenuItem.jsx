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
import { Card, Spacer, Text, Input, Divider, Button } from "@geist-ui/core";
import { CgRename } from "react-icons/cg";

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

    const required = (value) => (value ? undefined : "*Field Above Required*");

    const mustBeNumber = (value) =>
        isNaN(value) ? "Must be a number" : undefined;

    const noStartingAndTrailingWhitespace = (value) =>
        /^[^\s]+(\s+[^\s]+)*$/.test(value)
            ? undefined
            : "No beginning or trailing spaces allowed.";

    const mustBeAlphanumericSpaceAndTabs = (value) =>
        /^[a-zA-Z0-9_\s-]+$/.test(value)
            ? undefined
            : "Only [alphanumerics, commas, dots, underscores and spaces] allowed.";

    const minValue = (min) => (value) =>
        isNaN(value) || value >= min ? undefined : `Should be at least ${min}.`;

    const composeValidators =
        (...validators) =>
        (value) =>
            validators.reduce(
                (error, validator) => error || validator(value),
                undefined
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
                                className="form-group"
                                key={selectedMenuItem?._id}
                            >
                                <Card.Content>
                                    <Text h2>{values.name}</Text>
                                    <Text h4>Price (RM): {values.price}</Text>
                                </Card.Content>
                                <Field
                                    name="name"
                                    validate={composeValidators(
                                        required,
                                        mustBeAlphanumericSpaceAndTabs,
                                        noStartingAndTrailingWhitespace
                                    )}
                                >
                                    {({ input, meta }) => (
                                        <div>
                                            <Input
                                                {...input}
                                                clearable
                                                icon={<CgRename />}
                                                width={"100%"}
                                                placeholder="Item Name"
                                            />
                                            <span
                                                style={{
                                                    color: "red",
                                                    padding: "20px 20px",
                                                }}
                                            >
                                                {meta.error &&
                                                    meta.touched &&
                                                    meta.error}
                                            </span>
                                        </div>
                                    )}
                                </Field>
                                <Spacer h={0.5} />
                                <Field
                                    name="desc"
                                    validate={noStartingAndTrailingWhitespace}
                                >
                                    {({ input, meta }) => (
                                        <div>
                                            <Input
                                                {...input}
                                                clearable
                                                label="Description"
                                                width={"100%"}
                                                placeholder="(optional)"
                                            />
                                            <span
                                                style={{
                                                    color: "red",
                                                    padding: "20px 20px",
                                                }}
                                            >
                                                {meta.error &&
                                                    meta.touched &&
                                                    meta.error}
                                            </span>
                                        </div>
                                    )}
                                </Field>
                                <Spacer h={0.5} />
                                <Field
                                    name="price"
                                    validate={composeValidators(
                                        required,
                                        mustBeNumber,
                                        minValue(0)
                                    )}
                                >
                                    {({ input, meta }) => (
                                        <div>
                                            <Input
                                                {...input}
                                                clearable
                                                label="Price (RM)"
                                                htmlType="number"
                                                min={0}
                                                step={0.01}
                                                width={"100%"}
                                                placeholder="0.00"
                                            />
                                            <span
                                                style={{
                                                    color: "red",
                                                    padding: "20px 20px",
                                                }}
                                            >
                                                {meta.error &&
                                                    meta.touched &&
                                                    meta.error}
                                            </span>
                                        </div>
                                    )}
                                </Field>
                                <Spacer h={1} />
                                <Divider />
                                <div>
                                    <Button auto type="error" onClick={onClick}>
                                        Delete this Item
                                    </Button>
                                    <Button
                                        auto
                                        type="success"
                                        htmlType="submit"
                                        disabled={submitting || pristine}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        auto
                                        type="secondary"
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </form>
                    )}
                />
            </Card>
        </>
    );
};

export default MenuItem;
