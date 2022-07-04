import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            All rights reserved by Tan Ka-Shing{" "}
            <Link to="/about">● About</Link>
        </footer>
    );
};

export default Footer;
