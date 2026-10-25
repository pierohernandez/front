import getCategories from "../../services/categories/getCategories.js";

async function populateCategoriesSelect() {
  const categories = await getCategories();

  const suppSelect = document.getElementById("prodCategory");
  suppSelect.innerHTML = categories
    .map((s) => `<option value="${s.id_categoria}">${s.nombre}</option>`)
    .join("");
}

export default populateCategoriesSelect;
