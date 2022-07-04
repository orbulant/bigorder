import { FaSignInAlt, FaSignOutAlt, FaUser, FaBook } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { Link, useLocation, matchPath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const { pathname } = useLocation();

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
    };

    return (
        <header className="header">
            <div>
                <Link to="/">BigOrder</Link>
            </div>
            <ul>
                {user ? (
                    matchPath("/publicmenu/*", pathname) ||
                    matchPath("/publicorder/*", pathname) ? (
                        <h4 style={{ color: "#FFF" }}>
                            Enjoy <BiHappy />
                        </h4>
                    ) : (
                        <>
                            <li>
                                <Link to="/menus">
                                    <FaBook /> Menus
                                </Link>
                            </li>
                            <li>
                                <button className="btn" onClick={onLogout}>
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        </>
                    )
                ) : (
                    <>
                        <li>
                            <Link to="/login">
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </header>
    );
};

export default Header;
