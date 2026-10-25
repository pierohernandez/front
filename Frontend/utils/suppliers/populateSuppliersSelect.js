import getSuppliers from "../../services/suppliers/getSuppliers.js";

async function populateSuppliersSelect() {
  const suppliers = await getSuppliers();

  const suppSelect = document.getElementById("prodSupplier");
  suppSelect.innerHTML = suppliers
    .map((s) => `<option value="${s.id_proveedor}">${s.razon_social}</option>`)
    .join("");
}

export default populateSuppliersSelect;
