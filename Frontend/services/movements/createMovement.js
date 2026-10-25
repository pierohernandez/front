import API_URL from "../../constants/api.js";

const createMovement = async (movement) => {
  const response = await fetch(`${API_URL}/movimientos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movement)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "No se pudo registrar el movimiento");
  }
  return response.json();
};
export default createMovement;
