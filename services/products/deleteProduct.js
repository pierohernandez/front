import API_URL from "../../constants/api.js";
const deleteProduct = async (productId) => { const response = await fetch(`${API_URL}/productos/${productId}`, { method: "DELETE" }); if (!response.ok) { const error = await response.json(); throw new Error(error.message ?? "No se pudo eliminar el producto"); } };
export default deleteProduct;
