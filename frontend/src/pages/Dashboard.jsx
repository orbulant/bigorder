import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Spacer } from "@geist-ui/core";
import { IceCream } from "react-kawaii";

const Dashboard = () => {
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return (
        <>
            <h1>Welcome, {user && user.name}</h1>
            <Spacer h={2} />
            <IceCream size={300} mood="blissful" color="#FDA7DC" />
        </>
    );
};

export default Dashboard;
