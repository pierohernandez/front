import API_URL from "../../constants/api.js";
const updateProduct = async (productId, product) => { const response = await fetch(`${API_URL}/productos/${productId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(product) }); if (!response.ok) { const error = await response.json(); throw new Error(error.message ?? "No se pudo actualizar el producto"); } return response.json(); };
export default updateProduct;
