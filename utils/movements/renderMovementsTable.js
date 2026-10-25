const formatMovementDate = (movementDate) => new Intl.DateTimeFormat("es-PE", {
  dateStyle: "short",
  timeStyle: "short"
}).format(new Date(movementDate));

const renderMovementsTable = (movements) => {
  const tableBody = document.getElementById("movementsTableBody");
  tableBody.innerHTML = "";

  movements.forEach((movement) => {
    const isEntry = movement.tipo === "ENTRADA";
    tableBody.innerHTML += `
      <tr class="hover:bg-slate-50 transition-colors">
        <td class="px-6 py-3 text-xs text-slate-500">${formatMovementDate(movement.fecha)}</td>
        <td class="px-6 py-3"><span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${isEntry ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}">${isEntry ? "+ ENTRADA" : "- SALIDA"}</span></td>
        <td class="px-6 py-3 font-semibold text-slate-800">${movement.nombre_producto}</td>
        <td class="px-6 py-3 font-bold">${movement.cantidad}</td>
        <td class="px-6 py-3 text-xs text-slate-500">${movement.notas ?? "-"}</td>
        <td class="px-6 py-3 text-xs text-slate-400">${movement.operador}</td>
      </tr>`;
  });
};
export default renderMovementsTable;
