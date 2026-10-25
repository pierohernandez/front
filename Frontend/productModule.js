import createProduct from "./services/products/createProduct.js";
import deleteProduct from "./services/products/deleteProduct.js";
import getProductById from "./services/products/getProductById.js";
import getProducts from "./services/products/getProducts.js";
import updateProduct from "./services/products/updateProduct.js";
import populateCategoriesSelect from "./utils/categories/populateCategoriesSelect.js";
import showNotification from "./utils/notifications/showNotification.js";
import renderInventoryTable from "./utils/products/renderInventoryTable.js";
import populateSuppliersSelect from "./utils/suppliers/populateSuppliersSelect.js";
import { closeModal, openModal } from "./utils/shared/modal.js";
import selectActiveTab from "./utils/shared/selectActiveTab.js";
import { APPLICATION_EVENTS, emitApplicationEvent } from "./utils/shared/events.js";

let products = [];
const productForm = document.getElementById("productForm");

const loadProducts = async () => {
  products = await getProducts();
  renderInventoryTable(products, openEditProductModal, removeProduct);
};

const loadProductSelectors = async () => {
  await Promise.all([populateCategoriesSelect(), populateSuppliersSelect()]);
};

const openCreateProductModal = async () => {
  productForm.reset();
  document.getElementById("prodIndex").value = "";
  document.getElementById("prodStock").disabled = false;
  document.getElementById("modalProductTitle").innerText = "Agregar Producto";
  await loadProductSelectors();
  openModal("productModal");
};

async function openEditProductModal(product) {
  const completeProduct = await getProductById(product.id_producto);
  await loadProductSelectors();
  document.getElementById("prodIndex").value = completeProduct.id_producto;
  document.getElementById("prodCode").value = completeProduct.codigo;
  document.getElementById("prodName").value = completeProduct.nombre;
  document.getElementById("prodStock").value = completeProduct.stock_actual;
  document.getElementById("prodStock").disabled = true;
  document.getElementById("prodMinStock").value = completeProduct.stock_minimo;
  document.getElementById("prodPrice").value = completeProduct.precio_venta;
  const categorySelect = document.getElementById("prodCategory");
  const supplierSelect = document.getElementById("prodSupplier");
  const categoryOption = Array.from(categorySelect.options).find((option) => option.text === completeProduct.categoria);
  const supplierOption = Array.from(supplierSelect.options).find((option) => option.text === completeProduct.proveedor);

  if (categoryOption) {
    categorySelect.value = categoryOption.value;
  }

  if (supplierOption) {
    supplierSelect.value = supplierOption.value;
  }
  document.getElementById("modalProductTitle").innerText = "Editar Producto";
  openModal("productModal");
}

async function removeProduct(product) {
  if (!confirm(`¿Eliminar el producto ${product.nombre}?`)) {
    return;
  }
  try {
    await deleteProduct(product.id_producto);
    await loadProducts();
    emitApplicationEvent(APPLICATION_EVENTS.DASHBOARD_REFRESH);
    showNotification("Producto eliminado", "El producto fue eliminado correctamente.", false);
  } catch (error) {
    showNotification("Error", error.message, true);
  }
}

const buildProductPayload = (isEditing) => {
  const payload = {
    codigo: document.getElementById("prodCode").value.trim(),
    nombre: document.getElementById("prodName").value.trim(),
    id_categoria: document.getElementById("prodCategory").value,
    stock_minimo: Number.parseInt(document.getElementById("prodMinStock").value, 10),
    precio_venta: Number.parseFloat(document.getElementById("prodPrice").value),
    id_proveedor: document.getElementById("prodSupplier").value
  };
  if (!isEditing) {
    payload.stock_actual = Number.parseInt(document.getElementById("prodStock").value, 10);
  }
  return payload;
};

productForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const productId = document.getElementById("prodIndex").value;
    if (productId) {
      await updateProduct(productId, buildProductPayload(true));
    } else {
      await createProduct(buildProductPayload(false));
    }
    closeModal("productModal");
    await loadProducts();
    emitApplicationEvent(APPLICATION_EVENTS.DASHBOARD_REFRESH);
    emitApplicationEvent(APPLICATION_EVENTS.PRODUCTS_CHANGED);
    showNotification("Producto guardado", "El producto fue guardado correctamente.", false);
  } catch (error) {
    showNotification("Error", error.message, true);
  }
});

document.getElementById("nav-inventory").addEventListener("click", async () => {
  selectActiveTab("inventory");
  await loadProducts();
});
document.getElementById("show-all-products").addEventListener("click", async () => {
  selectActiveTab("inventory");
  await loadProducts();
});
document.getElementById("searchInput").addEventListener("input", () => renderInventoryTable(products, openEditProductModal, removeProduct));
document.getElementById("categoryFilter").addEventListener("change", () => renderInventoryTable(products, openEditProductModal, removeProduct));
document.querySelectorAll("[data-open-product-modal]").forEach((button) => button.addEventListener("click", openCreateProductModal));
document.querySelectorAll("[data-close-product-modal]").forEach((button) => button.addEventListener("click", () => closeModal("productModal")));
