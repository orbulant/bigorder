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
import UncompletedOrders from "./pages/UncompletedOrders";
import GenerateMenuQR from "./pages/GenerateMenuQR";
import CompletedOrders from "./pages/CompletedOrders";
import Receipt from "./pages/Receipt";
import PaidOrders from "./pages/PaidOrders";
import SalesReports from "./pages/SalesReports";
import Wave from "react-wavify";
import styled from "@emotion/styled";
import Footer from "./components/Footer";
import About from "./pages/About";

function App() {
    const WaveContainer = styled.div`
        position: fixed;
        left: 0;
        right: 0;
        top: -5px;
        height: ${(props) => props.level + "vh"};
        display: flex;
        z-index: -1;
        transform: rotate(180deg);
    `;

    return (
        <>
            <Router>
                <div className="container">
                    <Header />
                    <WaveContainer level={96}>
                        <Wave
                            fill="#0094C6"
                            paused={false}
                            opacity="0.30"
                            options={{
                                height: 20,
                                amplitude: 10,
                                speed: 0.2,
                                points: 3,
                            }}
                        />
                    </WaveContainer>
                    <WaveContainer level={90}>
                        <Wave
                            fill="#001242"
                            opacity="0.80"
                            paused={false}
                            options={{
                                height: 75,
                                amplitude: 20,
                                speed: 0.3,
                                points: 2,
                            }}
                        />
                    </WaveContainer>
                    <WaveContainer level={90}>
                        <Wave
                            fill="#040F16"
                            paused={false}
                            opacity="0.5"
                            options={{
                                height: 45,
                                amplitude: 30,
                                speed: 0.1,
                                points: 4,
                            }}
                        />
                    </WaveContainer>
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
                            path="/uncompletedorders/:menuId"
                            element={<UncompletedOrders />}
                        />
                        <Route
                            path="/completedorders/:menuId"
                            element={<CompletedOrders />}
                        />
                        <Route path="/receipt/:orderId" element={<Receipt />} />
                        <Route
                            path="/generatemenuqr/:menuId"
                            element={<GenerateMenuQR />}
                        />
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
                        <Route
                            path="/paidorders/:menuId"
                            element={<PaidOrders />}
                        />
                        <Route
                            path="/salesreports/:menuId"
                            element={<SalesReports />}
                        />
                        <Route 
                            path="/about"
                            element={<About />}
                        />
                    </Routes>
                    <Footer />
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
