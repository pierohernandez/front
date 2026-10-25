import getProducts from "../../services/products/getProducts.js";

async function populateProductsSelect() {
  const products = await getProducts();

  const prodSelect = document.getElementById("movProduct");
  prodSelect.innerHTML = products
    .map(
      (p) =>
        `<option value="${p.id_producto}">${p.nombre} (Stock: ${p.stock_actual})</option>`
    )
    .join("");
}

export default populateProductsSelect;
