import API_URL from "../../constants/api.js";

const getInventoryReport = async () => {
  const response = await fetch(`${API_URL}/reportes/inventario`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "No se pudo obtener el reporte de inventario");
  }
  return response.json();
};

export default getInventoryReport;
