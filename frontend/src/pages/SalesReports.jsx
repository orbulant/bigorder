import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { reset } from "../features/publicorder/publicOrderSlice";
import { useParams, Link } from "react-router-dom";
import {
    getTotalOrdersMade,
    getTotalMoneyMade,
    getOrderedItemsCount,
} from "../features/sales/salesSlice";
import { Text, Card, Grid, Dot, Spacer } from "@geist-ui/core";
import { FaArrowLeft } from "react-icons/fa";

const SalesReports = () => {
    const { menuId } = useParams();
    const dispatch = useDispatch();

    const {
        isLoading,
        isError,
        message,
        totalOrdersMade,
        totalMoneyMade,
        orderedItemsCount,
    } = useSelector((state) => state.sales);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getTotalOrdersMade(menuId));
        dispatch(getTotalMoneyMade(menuId));
        dispatch(getOrderedItemsCount(menuId));

        return () => {
            reset();
        };
    }, [dispatch, isError, menuId, message]);

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <div className="nav-link">
                <Link to="/menus" style={{ fontSize: 18 }}>
                    <FaArrowLeft size={18} style={{ paddingTop: "6px" }} /> Go
                    Back
                </Link>
            </div>
            <Spacer h={1} />
            <Grid.Container gap={1.5}>
                <Grid xs={12}>
                    <Card shadow type="secondary" width={"100%"}>
                        <Text
                            h2
                            my={0}
                            style={{
                                textTransform: "uppercase",
                                color: "#FFF",
                            }}
                        >
                            Total Number of Orders to Date
                        </Text>
                        <Text style={{ color: "#FFF" }}>{totalOrdersMade}</Text>
                    </Card>
                </Grid>
                <Grid xs={12}>
                    <Card shadow type="alert" width={"100%"}>
                        <Text
                            h2
                            my={0}
                            style={{
                                textTransform: "uppercase",
                                color: "#FFF",
                            }}
                        >
                            Total Sales Generated
                        </Text>
                        <Text style={{ color: "#FFF" }}>
                            RM {totalMoneyMade.toFixed(2)}
                        </Text>
                    </Card>
                </Grid>
                <Grid xs={12}>
                    <Card shadow type="warning" width={"100%"}>
                        <Text
                            h4
                            my={0}
                            style={{
                                textTransform: "uppercase",
                                color: "#FFF",
                            }}
                        >
                            List of most ordered items (Most to Least)
                        </Text>
                        {Object.keys(orderedItemsCount).map((key, val) => (
                            <div key={val}>
                                <Dot
                                    style={{
                                        marginRight: "20px",
                                        color: "#FFF",
                                    }}
                                >
                                    {key}
                                </Dot>
                                <Text style={{ color: "#FFF" }}>
                                    {orderedItemsCount[key]}
                                </Text>
                            </div>
                        ))}
                    </Card>
                </Grid>
            </Grid.Container>
        </>
    );
};

export default SalesReports;
