import axios from "axios";

const API_URL = "/api/menus/";

// Create new menu
const createMenu = async (menuData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, menuData, config);

    return response.data;
};

// Get user menu
const getMenu = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

// Update user menu
const updateMenu = async (id, newMenu, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + id, newMenu, config);

    return response.data;
};

// Delete user menu
const deleteMenu = async (menuId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + menuId, config);

    return response.data;
};

const menuService = { createMenu, getMenu, deleteMenu, updateMenu };

export default menuService;
