const renderSuppliersGrid = (suppliers, onEdit, onDelete) => {
  const grid = document.getElementById("suppliersGrid");
  const search = document.getElementById("supplierSearchInput").value.trim().toLowerCase();
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.razon_social.toLowerCase().includes(search) || supplier.ruc.includes(search)
  );

  grid.innerHTML = "";
  if (filteredSuppliers.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-center text-xs text-slate-500 py-8">No se encontraron proveedores.</p>`;
    return;
  }

  filteredSuppliers.forEach((supplier) => {
    const card = document.createElement("div");
    card.className = "bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between";
    card.innerHTML = `
      <div>
        <h4 class="font-bold text-slate-800 text-sm">${supplier.razon_social}</h4>
        <p class="text-xs text-slate-400 mt-1">RUC: ${supplier.ruc}</p>
        <div class="text-xs text-slate-600 space-y-1.5 pt-3 mt-3 border-t border-slate-100">
          <p>Teléfono: ${supplier.telefono ?? "-"}</p>
          <p>Email: ${supplier.email ?? "-"}</p>
          <p>Dirección: ${supplier.direccion ?? "-"}</p>
        </div>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button type="button" data-action="edit" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Editar"><i data-lucide="edit-3" class="w-4 h-4"></i></button>
        <button type="button" data-action="delete" class="p-2 text-rose-600 hover:bg-rose-50 rounded-lg" title="Eliminar"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
      </div>`;
    card.querySelector('[data-action="edit"]').addEventListener("click", () => onEdit(supplier));
    card.querySelector('[data-action="delete"]').addEventListener("click", () => onDelete(supplier));
    grid.appendChild(card);
  });
  lucide.createIcons();
};
export default renderSuppliersGrid;
