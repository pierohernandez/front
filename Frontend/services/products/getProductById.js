import API_URL from "../../constants/api.js";
const getProductById = async (productId) => { const response = await fetch(`${API_URL}/productos/${productId}`); if (!response.ok) { const error = await response.json(); throw new Error(error.message ?? "No se pudo obtener el producto"); } return response.json(); };
export default getProductById;
