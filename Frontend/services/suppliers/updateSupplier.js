import API_URL from "../../constants/api.js";

const updateSupplier = async (supplierId, supplier) => {
  const response = await fetch(`${API_URL}/proveedores/${supplierId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplier)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "No se pudo actualizar el proveedor");
  }
  return response.json();
};
export default updateSupplier;
