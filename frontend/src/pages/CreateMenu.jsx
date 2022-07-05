import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Spacer } from "@geist-ui/core";
import { useSelector } from "react-redux";

import MenuForm from "../components/MenuForm";

const CreateMenu = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
    return (
        <>
            <Link to="/menus" style={{ fontSize: 18 }}>
                <FaArrowLeft size={18} style={{ paddingTop: "6px" }} /> Go Back
            </Link>
            <Spacer h={1} />
            <MenuForm />
        </>
    );
};

export default CreateMenu;
