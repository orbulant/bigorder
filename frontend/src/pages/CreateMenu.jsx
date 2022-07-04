import MenuForm from "../components/MenuForm";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreateMenu = () => {
    return (
        <>
            <div style={{ padding: "15px 10px" }}>
                <Link to="/menus" style={{fontSize: 18}}>
                    <FaArrowLeft size={18} style={{paddingTop: "6px"}}/> Go Back
                </Link>
            </div>
            <MenuForm />
        </>
    );
};

export default CreateMenu;
