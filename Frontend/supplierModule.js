import createSupplier from "./services/suppliers/createSupplier.js";
import deleteSupplier from "./services/suppliers/deleteSupplier.js";
import getSuppliers from "./services/suppliers/getSuppliers.js";
import updateSupplier from "./services/suppliers/updateSupplier.js";
import renderSuppliersGrid from "./utils/suppliers/renderSuppliersGrid.js";
import showNotification from "./utils/notifications/showNotification.js";
import { closeModal, openModal } from "./utils/shared/modal.js";
import selectActiveTab from "./utils/shared/selectActiveTab.js";
import { APPLICATION_EVENTS, emitApplicationEvent } from "./utils/shared/events.js";

let suppliers = [];
const supplierForm = document.getElementById("supplierForm");

const loadSuppliers = async () => {
  suppliers = await getSuppliers();
  renderSuppliersGrid(suppliers, openEditSupplierModal, removeSupplier);
};

const openCreateSupplierModal = () => {
  supplierForm.reset();
  document.getElementById("suppId").value = "";
  document.getElementById("supplierModalTitle").innerText = "Registrar Proveedor";
  openModal("supplierModal");
};

function openEditSupplierModal(supplier) {
  document.getElementById("suppId").value = supplier.id_proveedor;
  document.getElementById("suppName").value = supplier.razon_social;
  document.getElementById("suppRuc").value = supplier.ruc;
  document.getElementById("suppPhone").value = supplier.telefono ?? "";
  document.getElementById("suppEmail").value = supplier.email ?? "";
  document.getElementById("suppAddress").value = supplier.direccion ?? "";
  document.getElementById("supplierModalTitle").innerText = "Editar Proveedor";
  openModal("supplierModal");
}

async function removeSupplier(supplier) {
  if (!confirm(`¿Eliminar al proveedor ${supplier.razon_social}?`)) {
    return;
  }
  try {
    await deleteSupplier(supplier.id_proveedor);
    await loadSuppliers();
    emitApplicationEvent(APPLICATION_EVENTS.DASHBOARD_REFRESH);
    emitApplicationEvent(APPLICATION_EVENTS.SUPPLIERS_CHANGED);
    showNotification("Proveedor eliminado", "El proveedor fue eliminado correctamente.", false);
  } catch (error) {
    showNotification("Error", error.message, true);
  }
}

const buildSupplierPayload = () => ({
  razon_social: document.getElementById("suppName").value.trim(),
  ruc: document.getElementById("suppRuc").value.trim(),
  telefono: document.getElementById("suppPhone").value.trim() || null,
  email: document.getElementById("suppEmail").value.trim() || null,
  direccion: document.getElementById("suppAddress").value.trim() || null
});

supplierForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const supplierId = document.getElementById("suppId").value;
    if (supplierId) {
      await updateSupplier(supplierId, buildSupplierPayload());
    } else {
      await createSupplier(buildSupplierPayload());
    }
    closeModal("supplierModal");
    await loadSuppliers();
    emitApplicationEvent(APPLICATION_EVENTS.DASHBOARD_REFRESH);
    emitApplicationEvent(APPLICATION_EVENTS.SUPPLIERS_CHANGED);
    showNotification("Proveedor guardado", "El proveedor fue guardado correctamente.", false);
  } catch (error) {
    showNotification("Error", error.message, true);
  }
});

document.getElementById("nav-suppliers").addEventListener("click", async () => {
  selectActiveTab("suppliers");
  await loadSuppliers();
});
document.getElementById("supplierSearchInput").addEventListener("input", () => renderSuppliersGrid(suppliers, openEditSupplierModal, removeSupplier));
document.getElementById("openSupplierModalButton").addEventListener("click", openCreateSupplierModal);
document.querySelectorAll("[data-close-supplier-modal]").forEach((button) => button.addEventListener("click", () => closeModal("supplierModal")));
