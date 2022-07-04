import { useEffect } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMenu, reset } from "../features/menu/menuSlice";

import Menu from "../components/Menu";
import Spinner from "../components/Spinner";
import { Spacer } from "@geist-ui/core";

const Menus = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { menu, isLoading, isError, isCreated, isDeleted, message } =
        useSelector((state) => state.menu);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isCreated) {
            toast.success(message);
        }

        if (isDeleted) {
            toast.info(message);
        }

        dispatch(getMenu());

        return () => {
            dispatch(reset());
        };
    }, [isError, isCreated, isDeleted, dispatch, message]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <div className="nav-link">
                <Link to="/createmenu" style={{ fontSize: 18 }}>
                    <FaPlusSquare size={18} style={{ paddingTop: "6px" }} />{" "}
                    Create New Menu
                </Link>
            </div>
            <Spacer h={1} />
            <section className="content">
                {menu.length > 0 ? (
                    <section>
                        {menu.map((menu, index) => (
                            <div key={index}>
                                <Menu key={index} menu={menu} />
                                <Spacer h={1} />
                            </div>
                        ))}
                    </section>
                ) : (
                    <h3>You currently have no menus.</h3>
                )}
            </section>
        </>
    );
};

export default Menus;
