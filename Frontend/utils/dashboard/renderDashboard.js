const formatCurrency = (amount) => new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(Number(amount));

const renderDashboard = (dashboard, products) => {
  document.getElementById("statTotalProducts").innerText = dashboard.total_productos;
  document.getElementById("statTotalValue").innerText = formatCurrency(dashboard.valor_inventario);
  document.getElementById("statCriticalStock").innerText = dashboard.total_stock_critico;
  document.getElementById("statTotalSuppliers").innerText = dashboard.total_proveedores;

  const tableBody = document.getElementById("dashboardTableBody");
  tableBody.innerHTML = "";
  products.slice(0, 5).forEach((product) => {
    const isCriticalStock = product.stock_actual <= product.stock_minimo;
    tableBody.innerHTML += `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="px-6 py-3 font-mono text-xs text-slate-500">${product.codigo}</td>
        <td class="px-6 py-3 font-semibold text-slate-800">${product.nombre}</td>
        <td class="px-6 py-3 text-slate-500">${product.categoria}</td>
        <td class="px-6 py-3 font-bold ${isCriticalStock ? "text-amber-600" : "text-slate-700"}">${product.stock_actual} pza</td>
        <td class="px-6 py-3 text-slate-600">${formatCurrency(product.precio_venta)}</td>
        <td class="px-6 py-3"><span class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${isCriticalStock ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}">${isCriticalStock ? "Stock Crítico" : "Normal"}</span></td>
      </tr>`;
  });
};

export default renderDashboard;
