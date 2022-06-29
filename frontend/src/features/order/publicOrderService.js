import axios from "axios";

const API_URL = "/api/orders/";
const API_URL_UNCOMPLETED_ORDERS = "/api/orders/uncompleted";

// Create Order
const createOrder = async (orderData) => {
    const response = await axios.post(API_URL, orderData);
    return response.data;
};

const getOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL_UNCOMPLETED_ORDERS, config);

    return response.data;
};

const publicOrderService = { getOrders, createOrder };

export default publicOrderService;
