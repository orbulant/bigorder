import MenuForm from "../components/MenuForm";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreateMenu = () => {
    return (
        <>
            <Link to="/menus">
                <FaArrowLeft /> Go Back
            </Link>
            <MenuForm />
        </>
    );
};

export default CreateMenu;
