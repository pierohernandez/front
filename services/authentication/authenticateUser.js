import API_URL from "../../constants/api.js";

const authenticateUser = async (credentials) => {
  const response = await fetch(`${API_URL}/autenticacion/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "No se pudo iniciar sesión");
  }
  return response.json();
};
export default authenticateUser;
