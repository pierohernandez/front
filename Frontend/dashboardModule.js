import getDashboard from "./services/dashboard/getDashboard.js";
import getProducts from "./services/products/getProducts.js";
import renderDashboard from "./utils/dashboard/renderDashboard.js";
import showNotification from "./utils/notifications/showNotification.js";
import selectActiveTab from "./utils/shared/selectActiveTab.js";
import { APPLICATION_EVENTS } from "./utils/shared/events.js";

const loadDashboard = async () => {
  try {
    const [dashboard, products] = await Promise.all([getDashboard(), getProducts()]);
    renderDashboard(dashboard, products);
    lucide.createIcons();
  } catch (error) {
    showNotification("Error", error.message, true);
  }
};

document.getElementById("nav-dashboard").addEventListener("click", async () => {
  selectActiveTab("dashboard");
  await loadDashboard();
});
document.addEventListener(APPLICATION_EVENTS.DASHBOARD_REFRESH, loadDashboard);

export { loadDashboard };
