import authenticateUser from "./services/authentication/authenticateUser.js";
import showNotification from "./utils/notifications/showNotification.js";
import { loadDashboard } from "./dashboardModule.js";

const loginForm = document.getElementById("loginForm");

const showAuthenticatedApplication = async (authenticatedUser) => {
  document.getElementById("loginSection").classList.add("hidden");
  document.getElementById("appSection").classList.remove("hidden");
  document.getElementById("appSection").classList.add("flex");
  document.getElementById("userName").innerText = authenticatedUser.nombre_completo;
  document.getElementById("userAvatar").innerText = authenticatedUser.nombre_completo.slice(0, 1).toUpperCase();
  await loadDashboard();
};

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const userName = document.getElementById("loginRole").value;
    const password = document.getElementById("loginPassword").value;
    const authenticatedUser = await authenticateUser({ nombre_usuario: userName, clave: password });
    sessionStorage.setItem("bsm_current_user", JSON.stringify(authenticatedUser));
    await showAuthenticatedApplication(authenticatedUser);
  } catch (error) {
    showNotification("Error de autenticación", error.message, true);
  }
});

const restoreAuthenticatedSession = async () => {
  const serializedUser = sessionStorage.getItem("bsm_current_user");
  if (serializedUser) {
    await showAuthenticatedApplication(JSON.parse(serializedUser));
  }
};

restoreAuthenticatedSession();
