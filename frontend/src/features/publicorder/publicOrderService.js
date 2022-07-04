import axios from "axios";

const API_URL = "/api/publicorders/";

// Create Order
const createOrder = async (orderData) => {
    const response = await axios.post(API_URL, orderData);
    return response.data;
};

// Get Current Order
const getCurrentOrder = async (orderId) => {
    const response = await axios.get(API_URL + orderId);
    return response.data;
};

const publicOrderService = { createOrder, getCurrentOrder };

export default publicOrderService;
