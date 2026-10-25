import API_URL from "../../constants/api.js";

const getDashboard = async () => {
  const response = await fetch(`${API_URL}/dashboard`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "No se pudo obtener el dashboard");
  }

  return response.json();
};

export default getDashboard;
