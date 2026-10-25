import API_URL from "../../constants/api.js";

const getMovements = async () => {
  const response = await fetch(`${API_URL}/movimientos`);
  if (!response.ok) {
    throw new Error("No se pudieron obtener los movimientos");
  }
  return response.json();
};
export default getMovements;
