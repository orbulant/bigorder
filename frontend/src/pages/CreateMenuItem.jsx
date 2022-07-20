import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { Text, Button, Input, Card, Spacer, Divider } from "@geist-ui/core";
import { CgRename } from "react-icons/cg";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    addMenuItem,
    getMenu,
    reset,
    updateMenuThunk,
} from "../features/menu/menuSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

import Spinner from "../components/Spinner";

const CreateMenuItem = () => {
    const { menuId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const required = (value) => (value ? undefined : "*Field Above Required*");

    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, message } = useSelector((state) => state.menu);

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

    const onSubmit = (values) => {
        dispatch(addMenuItem({ id: menuId, item: values }));
        dispatch(updateMenuThunk(menuId));
        navigate(`/menus/${menuId}`);
    };

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

    return (
        <div>
            <Link to={`/menus/${menuId}`} style={{ fontSize: 18 }}>
                <FaArrowLeft size={18} style={{ paddingTop: "6px" }} /> Go Back
            </Link>
            <Spacer h={1} />
            <Card>
                <Text>Create Menu Item</Text>
                <Form
                    onSubmit={onSubmit}
                    initialValues={{ name: "", price: "" }}
                    render={({
                        handleSubmit,
                        pristine,
                        form,
                        submitting,
                        values,
                    }) => {
                        return (
                            <form onSubmit={handleSubmit}>
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
                                                step=".01"
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
                                        type="error"
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </form>
                        );
                    }}
                />
            </Card>
        </div>
    );
};

export default CreateMenuItem;
