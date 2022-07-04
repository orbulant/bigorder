import { Link } from "react-router-dom";
import { Text } from "@geist-ui/core";

const Footer = () => {
    return (
        <footer className="footer">
            <Text h4>bigorder.my | All rights reserved by Tan Ka-Shing</Text>
            <Link to="/about">About</Link>
        </footer>
    );
};

export default Footer;
