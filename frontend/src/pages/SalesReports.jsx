import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { reset } from "../features/publicorder/publicOrderSlice";
import { useParams } from "react-router-dom";
import {
    getTotalOrdersMade,
    getTotalMoneyMade,
    getOrderedItemsCount,
} from "../features/sales/salesSlice";
import { Text, Card, Grid, Dot } from "@geist-ui/core";

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
        <Grid.Container gap={1.5}>
            <Grid xs={12}>
                <Card shadow type="secondary" width={"100%"}>
                    <Text h2 my={0} style={{ textTransform: "uppercase" }}>
                        Total Number of Orders to Date
                    </Text>
                    <Text>{totalOrdersMade}</Text>
                </Card>
            </Grid>
            <Grid xs={12}>
                <Card shadow type="alert" width={"100%"}>
                    <Text h2 my={0} style={{ textTransform: "uppercase" }}>
                        Total Sales Generated
                    </Text>
                    <Text>{totalMoneyMade.toFixed(2)}</Text>
                </Card>
            </Grid>
            <Grid xs={12}>
                <Card shadow type="warning" width={"100%"}>
                    <Text h4 my={0} style={{ textTransform: "uppercase" }}>
                        List of most ordered items (Most to Least)
                    </Text>
                    {Object.keys(orderedItemsCount).map((key, val) => (
                        <div key={val}>
                            <Dot style={{ marginRight: "20px" }}>{key}</Dot>
                            <Text>{orderedItemsCount[key]}</Text>
                        </div>
                    ))}
                </Card>
            </Grid>
        </Grid.Container>
    );
};

export default SalesReports;
