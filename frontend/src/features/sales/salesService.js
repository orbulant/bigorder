import axios from "axios";

const API_URL = "/api/salesreports/";

// Get Total Order Made
const getTotalOrdersMade = async (token, menuId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        API_URL + `totalordersmade/` + menuId,
        config
    );

    return response.data;
};


// Get Total Money Made
const getTotalMoneyMade = async (token, menuId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        API_URL + `totalmoneymade/` + menuId,
        config
    );

    return response.data;
};


// Get Ordered Items Count
const getOrderedItemsCount = async (token, menuId) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        API_URL + `ordereditemscount/` + menuId,
        config
    );

    return response.data;
};

const orderService = {
    getTotalOrdersMade,
    getTotalMoneyMade,
    getOrderedItemsCount,
};

export default orderService;

