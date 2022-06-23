import axios from "axios";

const API_URL = "/api/publicmenu/";

// Get user menu
const getPublicMenu = async (id) => {
 
    const response = await axios.get(API_URL + id);
    return response.data;
};

const publicMenuService = { getPublicMenu };

export default publicMenuService;