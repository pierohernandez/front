import API_URL from "../../constants/api.js";
const createProduct = async (product) => { const response = await fetch(`${API_URL}/productos`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(product) }); if (!response.ok) { const error = await response.json(); throw new Error(error.message ?? "No se pudo crear el producto"); } return response.json(); };
export default createProduct;
