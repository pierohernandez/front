import API_URL from "../../constants/api.js";

const createSupplier = async (supplier) => {
  const response = await fetch(`${API_URL}/proveedores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(supplier)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "No se pudo crear el proveedor");
  }
  return response.json();
};
export default createSupplier;
