import { useParams, Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { Form, Field } from "react-final-form";
import { Button, Divider, Text, Input, Spacer, Card } from "@geist-ui/core";
import { toPng } from "html-to-image";
import { useRef } from "react";
import { useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa";

const GenerateMenuQR = () => {
    const { menuId } = useParams();
    const ref = useRef(null);

    const url = window.location.host + "/";

    const required = (value) =>
        value ? undefined : "Table Location required!";

    const mustBeAlphanumeric = (value) =>
        /^[a-zA-Z0-9]*$/.test(value)
            ? undefined
            : "Must contain letters and numbers only!";
    const minValue = (min) => (value) =>
        isNaN(value) || value >= min
            ? undefined
            : `Should be greater than ${min}`;

    const composeValidators =
        (...validators) =>
        (value) =>
            validators.reduce(
                (error, validator) => error || validator(value),
                undefined
            );

    const onButtonClickDownload = useCallback(
        (tableNumber) => {
            if (ref.current === null) {
                return;
            }

            toPng(ref.current, { cacheBust: true })
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.download = `Menu:${menuId}Table:${tableNumber} QR.png`;
                    link.href = dataUrl;
                    link.click();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        [ref, menuId]
    );

    return (
        <>
            <div className="nav-link">
                <Link to="/menus" style={{ fontSize: 18 }}>
                    <FaArrowLeft size={18} style={{ paddingTop: "6px" }} /> Go
                    Back
                </Link>
            </div>
            <Spacer h={1} />
            <Card>
                <Form
                    onSubmit={{}}
                    initialValues={{ tableNumber: "" }}
                    render={({
                        handleSubmit,
                        form,
                        submitting,
                        pristine,
                        values,
                    }) => (
                        <>
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <Field
                                        name="tableNumber"
                                        validate={composeValidators(
                                            required,
                                            mustBeAlphanumeric,
                                            minValue(1)
                                        )}
                                    >
                                        {({ input, meta }) => (
                                            <div>
                                                <label>Enter table:</label>
                                                <Spacer h={0.5} />
                                                <Input
                                                    {...input}
                                                    clearable
                                                    placeholder="e.g. 47"
                                                />
                                                <Spacer h={1} />
                                                {meta.error && meta.touched && (
                                                    <div
                                                        style={{
                                                            padding:
                                                                "10px 20px",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            {meta.error}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Field>
                                </form>
                            </div>
                            <Spacer h={1} />
                            <div>
                                <Text h2>Current URL Created:</Text>
                                <Text style={{wordWrap: "break-word"}}>{`${url}publicmenu/${menuId}/${values.tableNumber}`}</Text>
                            </div>
                            <Divider />
                            <div ref={ref}>
                                <QRCodeSVG
                                    value={`${url}publicmenu/${menuId}/${values}`}
                                    size={256}
                                    bgColor={"#FFF"}
                                    fgColor={"#000"}
                                    includeMargin={true}
                                />
                                <Text font="32px">
                                    Table: {values.tableNumber}
                                </Text>
                            </div>
                            <Divider />
                            <Button
                                auto
                                type="success-light"
                                onClick={() =>
                                    onButtonClickDownload(values.tableNumber)
                                }
                            >
                                Download QR PDF
                            </Button>
                        </>
                    )}
                ></Form>
            </Card>
        </>
    );
};

export default GenerateMenuQR;
