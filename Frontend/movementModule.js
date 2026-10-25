import createMovement from "./services/movements/createMovement.js";
import getMovements from "./services/movements/getMovements.js";
import renderMovementsTable from "./utils/movements/renderMovementsTable.js";
import populateProductsSelect from "./utils/productos/populateProductsSelect.js";
import showNotification from "./utils/notifications/showNotification.js";
import { closeModal, openModal } from "./utils/shared/modal.js";
import selectActiveTab from "./utils/shared/selectActiveTab.js";
import { APPLICATION_EVENTS, emitApplicationEvent } from "./utils/shared/events.js";

const movementForm = document.getElementById("movementForm");

const loadMovements = async () => {
  renderMovementsTable(await getMovements());
};

const openMovementModal = async () => {
  movementForm.reset();
  await populateProductsSelect();
  openModal("movementModal");
};

const getAuthenticatedUser = () => {
  const serializedUser = sessionStorage.getItem("bsm_current_user");
  return serializedUser ? JSON.parse(serializedUser) : null;
};

const validateAvailableStock = () => {
  const selectedOption = document.getElementById("movProduct").selectedOptions[0];
  const movementType = document.getElementById("movType").value;
  const quantity = Number.parseInt(document.getElementById("movQty").value, 10);
  const availableStock = Number.parseInt(selectedOption.dataset.stock, 10);
  if (movementType === "SALIDA" && quantity > availableStock) {
    throw new Error(`La cantidad a retirar (${quantity}) supera el stock disponible (${availableStock}).`);
  }
};

movementForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const authenticatedUser = getAuthenticatedUser();
    if (!authenticatedUser?.id_usuario) {
      throw new Error("La sesión no contiene un usuario autenticado.");
    }
    validateAvailableStock();
    await createMovement({
      tipo: document.getElementById("movType").value,
      id_producto: document.getElementById("movProduct").value,
      cantidad: Number.parseInt(document.getElementById("movQty").value, 10),
      notas: document.getElementById("movNotes").value.trim() || null,
      id_usuario: authenticatedUser.id_usuario
    });
    closeModal("movementModal");
    await loadMovements();
    emitApplicationEvent(APPLICATION_EVENTS.DASHBOARD_REFRESH);
    emitApplicationEvent(APPLICATION_EVENTS.PRODUCTS_CHANGED);
    showNotification("Movimiento registrado", "El stock fue actualizado correctamente.", false);
  } catch (error) {
    showNotification("Error", error.message, true);
  }
});

document.getElementById("nav-movements").addEventListener("click", async () => {
  selectActiveTab("movements");
  await loadMovements();
});
document.getElementById("openMovementModalButton").addEventListener("click", openMovementModal);
document.querySelectorAll("[data-close-movement-modal]").forEach((button) => button.addEventListener("click", () => closeModal("movementModal")));
