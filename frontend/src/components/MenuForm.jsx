import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createMenu } from "../features/menu/menuSlice";
import { FaPlus } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { CgRename } from "react-icons/cg";
import { Input, Button, Divider, Spacer, Card } from "@geist-ui/core";
import { Form, Field } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";

const MenuForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        navigate("/menus");
        console.log(values);
        dispatch(createMenu(values));
    };

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

    return (
        <section className="form">
            <Form
                onSubmit={onSubmit}
                mutators={{
                    ...arrayMutators,
                }}
                initialValues={{ restaurantName: "", menuItems: [] }}
                render={({
                    handleSubmit,
                    form: {
                        mutators: { push, pop },
                    }, // injected from final-form-arrays above
                    pristine,
                    form,
                    submitting,
                    values,
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Card hoverable>
                                <div className="form-group title">
                                    <label htmlFor="text">
                                        Restaurant Name
                                    </label>
                                    <Field
                                        name={`restaurantName`}
                                        validate={composeValidators(
                                            required,
                                            noStartingAndTrailingWhitespace,
                                            mustBeAlphanumericSpaceAndTabs
                                        )}
                                    >
                                        {({ input, meta }) => (
                                            <div>
                                                <Input
                                                    {...input}
                                                    clearable
                                                    icon={<CgRename />}
                                                    width={"100%"}
                                                    placeholder="Restaurant Name"
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
                                </div>
                                <FieldArray name="menuItems">
                                    {({ fields }) =>
                                        fields.map((name, index) => (
                                            <Card
                                                key={name}
                                                style={{
                                                    padding: "5px 5px",
                                                    margin: "10px 10px",
                                                }}
                                            >
                                                <label>
                                                    Item: #{index + 1}
                                                </label>
                                                <Spacer h={0.5} />
                                                <Field
                                                    name={`${name}.name`}
                                                    validate={composeValidators(
                                                        required,
                                                        noStartingAndTrailingWhitespace,
                                                        mustBeAlphanumericSpaceAndTabs
                                                    )}
                                                >
                                                    {({ input, meta }) => (
                                                        <div>
                                                            <Input
                                                                {...input}
                                                                label="Name"
                                                                clearable
                                                                width={"100%"}
                                                                placeholder="e.g., Chicken Rice"
                                                            />
                                                            <span
                                                                style={{
                                                                    color: "red",
                                                                    padding:
                                                                        "20px 20px",
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
                                                    name={`${name}.desc`}
                                                    validate={composeValidators(
                                                        noStartingAndTrailingWhitespace
                                                    )}
                                                >
                                                    {({ input, meta }) => (
                                                        <div>
                                                            <Input
                                                                {...input}
                                                                label="Description"
                                                                clearable
                                                                width={"100%"}
                                                                placeholder="(optional)"
                                                            />
                                                            <span
                                                                style={{
                                                                    color: "red",
                                                                    padding:
                                                                        "20px 20px",
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
                                                    name={`${name}.price`}
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
                                                                label="Price (RM)"
                                                                htmlType="number"
                                                                clearable
                                                                width={"100%"}
                                                                placeholder="0.00"
                                                            />
                                                            <span
                                                                style={{
                                                                    color: "red",
                                                                    padding:
                                                                        "20px 20px",
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
                                                <span
                                                    onClick={() =>
                                                        fields.remove(index)
                                                    }
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <TiDelete size={24} />
                                                </span>
                                            </Card>
                                        ))
                                    }
                                </FieldArray>
                                <div style={{ padding: "20px 20px" }}>
                                    <Button
                                        auto
                                        icon={<FaPlus />}
                                        type="success-light"
                                        onClick={() =>
                                            push("menuItems", undefined)
                                        }
                                    >
                                        Add Menu Item
                                    </Button>
                                    {/* <Button
                                    auto
                                    type="error-light"
                                    onClick={() => pop("menuItems")}
                                >
                                    Remove Menu Item
                                </Button> */}
                                </div>
                                <Divider />
                                <div style={{ padding: "20px 20px" }}>
                                    <Button
                                        type="success"
                                        htmlType="submit"
                                        disabled={submitting || pristine}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        type="abort"
                                        onClick={form.reset}
                                        disabled={submitting || pristine}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </Card>
                        </form>
                    );
                }}
            />
        </section>
    );
};

export default MenuForm;
