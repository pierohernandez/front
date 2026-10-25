const formatCurrency = (amount) => new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(Number(amount));

const renderInventoryTable = (products, onEdit, onDelete) => {
  const searchText = document.getElementById("searchInput").value.trim().toLowerCase();
  const selectedCategory = document.getElementById("categoryFilter").value;
  const tableBody = document.getElementById("inventoryTableBody");
  const filteredProducts = products.filter((product) => {
    const matchesText = product.nombre.toLowerCase().includes(searchText) || product.codigo.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategory === "ALL" || product.categoria === selectedCategory;
    return matchesText && matchesCategory;
  });

  tableBody.innerHTML = "";
  filteredProducts.forEach((product) => {
    const isCriticalStock = product.stock_actual <= product.stock_minimo;
    const row = document.createElement("tr");
    row.className = "hover:bg-slate-50 transition-colors";
    row.innerHTML = `
      <td class="px-6 py-3 font-mono text-xs font-semibold text-slate-500">${product.codigo}</td>
      <td class="px-6 py-3 font-semibold text-slate-800">${product.nombre}</td>
      <td class="px-6 py-3 text-slate-500"><span class="rounded bg-slate-100 px-2 py-1 text-xs">${product.categoria}</span></td>
      <td class="px-6 py-3 font-bold ${isCriticalStock ? "text-amber-600" : "text-slate-700"}">${product.stock_actual}</td>
      <td class="px-6 py-3 text-xs text-slate-400">${product.stock_minimo}</td>
      <td class="px-6 py-3 font-semibold text-slate-700">${formatCurrency(product.precio_venta)}</td>
      <td class="px-6 py-3 text-xs text-slate-500">${product.proveedor}</td>
      <td class="px-6 py-3 text-center"><div class="flex items-center justify-center gap-2">
        <button type="button" data-action="edit" class="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50" title="Editar"><i data-lucide="edit-3" class="h-4 w-4"></i></button>
        <button type="button" data-action="delete" class="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50" title="Eliminar"><i data-lucide="trash-2" class="h-4 w-4"></i></button>
      </div></td>`;
    row.querySelector('[data-action="edit"]').addEventListener("click", () => onEdit(product));
    row.querySelector('[data-action="delete"]').addEventListener("click", () => onDelete(product));
    tableBody.appendChild(row);
  });
  lucide.createIcons();
};

export default renderInventoryTable;
