import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Menus from "./pages/Menus";
import CreateMenu from "./pages/CreateMenu";
import MenuItem from "./pages/MenuItem";
import PublicMenu from "./pages/PublicMenu";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import PublicOrder from "./pages/PublicOrder";

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="*" element={<NotFound />} />
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/menus" element={<Menus />} />
                        <Route path="/menus/:menuId" element={<Menu />} />
                        <Route
                            path="/menus/:menuId/:menuItemId"
                            element={<MenuItem />}
                        />
                        <Route path="/createmenu" element={<CreateMenu />} />
                        <Route
                            path="/publicmenu/:menuId/:tableNumber"
                            element={<PublicMenu />}
                        />
                        <Route
                            path="/publicmenu/:menuId/"
                            element={<PublicMenu />}
                        />
                        <Route
                            path="/publicorders/:orderId/"
                            element={<PublicOrder />}
                        />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
