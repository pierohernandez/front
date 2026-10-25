import API_URL from "../../constants/api.js";

const getCriticalStockReport = async () => {
  const response = await fetch(`${API_URL}/reportes/stock-critico`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "No se pudo obtener el reporte de stock crítico");
  }
  return response.json();
};

export default getCriticalStockReport;
