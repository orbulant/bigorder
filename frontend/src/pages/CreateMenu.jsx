import MenuForm from "../components/MenuForm";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Spacer } from "@geist-ui/core";

const CreateMenu = () => {
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
