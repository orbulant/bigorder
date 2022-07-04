import axios from "axios";

const API_URL = "/api/orders/";
const API_URL_UNCOMPLETED = "/api/orders/uncompleted/";
const API_URL_COMPLETED = "/api/orders/completed/";
const API_URL_COMPLETED_UNPAID = "/api/orders/completed/unpaid/";
const API_URL_COMPLETED_PAID = "/api/orders/completed/paid/";

// Create Order
const createOrder = async (orderData) => {
    const response = await axios.post(API_URL, orderData);
    return response.data;
};

// Get Order
const getOrder = async (token, orderId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        API_URL_COMPLETED_UNPAID + orderId,
        config
    );

    return response.data;
};

// Get Paid Orders
const getPaidOrders = async (token, menuId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        API_URL_COMPLETED_PAID + menuId,
        config
    );

    return response.data;
};
// Get Uncompleted Orders
const getUncompletedOrders = async (token, orderId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL_UNCOMPLETED + orderId, config);

    return response.data;
};

//Get Completed Orders
const getCompletedOrders = async (token, orderId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL_COMPLETED + orderId, config);

    return response.data;
};

// Set Order Complete
const setOrderCompleted = async (token, orderData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL_UNCOMPLETED, orderData, config);

    return response.data;
};

const setOrderPaid = async (token, orderData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(
        API_URL_COMPLETED_UNPAID,
        orderData,
        config
    );

    return response.data;
};

const orderService = {
    createOrder,
    getOrder,
    getPaidOrders,
    getUncompletedOrders,
    getCompletedOrders,
    setOrderCompleted,
    setOrderPaid,
};

export default orderService;
