import API_URL from "../../constants/api.js";

const deleteSupplier = async (supplierId) => {
  const response = await fetch(`${API_URL}/proveedores/${supplierId}`, { method: "DELETE" });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "No se pudo eliminar el proveedor");
  }
};
export default deleteSupplier;
