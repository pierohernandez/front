import API_URL from "../../constants/api.js";
const getProducts = async () => { const response = await fetch(`${API_URL}/productos`); if (!response.ok) { const error = await response.json(); throw new Error(error.message ?? "No se pudieron obtener los productos"); } return response.json(); };
export default getProducts;