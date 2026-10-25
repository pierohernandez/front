import getInventoryReport from "./services/reports/getInventoryReport.js";
import getCriticalStockReport from "./services/reports/getCriticalStockReport.js";
import selectActiveTab from "./utils/shared/selectActiveTab.js";
import { closeModal } from "./utils/shared/modal.js";
import showNotification from "./utils/notifications/showNotification.js";

const logout = () => {
  sessionStorage.removeItem("bsm_current_user");
  document.getElementById("appSection").classList.add("hidden");
  document.getElementById("appSection").classList.remove("flex");
  document.getElementById("loginSection").classList.remove("hidden");
  document.getElementById("loginPassword").value = "";
};

const exportReport = async (reportType) => {
  try {
    const products = reportType === "critical" ? await getCriticalStockReport() : await getInventoryReport();
    const { jsPDF } = window.jspdf;
    const documentPdf = new jsPDF();
    documentPdf.setFontSize(18);
    documentPdf.setTextColor(5, 150, 105);
    documentPdf.text("Bodega San Miguel", 14, 20);
    documentPdf.setFontSize(13);
    documentPdf.setTextColor(15);
    documentPdf.text(reportType === "critical" ? "REPORTE DE STOCK CRÍTICO" : "REPORTE GENERAL DE INVENTARIO", 14, 34);
    documentPdf.autoTable({
      startY: 40,
      head: [["Código", "Producto", "Categoría", "Stock", "Mínimo", "Precio", "Proveedor"]],
      body: products.map((product) => [product.codigo, product.nombre, product.categoria, String(product.stock_actual), String(product.stock_minimo), `S/ ${Number(product.precio_venta).toFixed(2)}`, product.proveedor]),
      theme: "striped",
      headStyles: { fillColor: [5, 150, 105] }
    });
    documentPdf.save(`Reporte_Bodega_San_Miguel_${reportType}_${Date.now()}.pdf`);
  } catch (error) {
    showNotification("Error", error.message, true);
  }
};

document.getElementById("logoutButton").addEventListener("click", logout);
document.getElementById("nav-reports").addEventListener("click", () => selectActiveTab("reports"));
document.getElementById("closeNotificationButton").addEventListener("click", () => closeModal("notificationModal"));
document.getElementById("exportInventoryReportButton").addEventListener("click", () => exportReport("all"));
document.getElementById("exportCriticalStockReportButton").addEventListener("click", () => exportReport("critical"));
lucide.createIcons();
