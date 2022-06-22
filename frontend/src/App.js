import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Menus from "./pages/Menus";
import CreateMenu from "./pages/CreateMenu";
import Header from "./components/Header";
import MenuItem from "./pages/MenuItem";

function App() {
    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/menus" element={<Menus />} />
                        <Route path="/menus/:menuId" element={<Menu />} />
                        <Route path="/menus/:menuId/:menuItemId" element={<MenuItem />} />
                        <Route path="/createmenu" element={<CreateMenu />} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
