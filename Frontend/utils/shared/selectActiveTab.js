const TAB_TITLES = {
  dashboard: "Panel Principal de Control",
  inventory: "Catálogo de Productos e Inventario",
  movements: "Registro de Entradas y Salidas",
  suppliers: "Directorio de Proveedores",
  reports: "Generación de Reportes PDF"
};

const selectActiveTab = (tabName) => {
  document.querySelectorAll(".tab-content").forEach((tabContent) => {
    tabContent.classList.add("hidden");
  });

  document.querySelectorAll(".nav-btn").forEach((navigationButton) => {
    navigationButton.classList.remove("bg-emerald-600", "text-white");
    navigationButton.classList.add("text-slate-400", "hover:text-slate-200", "hover:bg-slate-800");
  });

  document.getElementById(`tab-${tabName}`).classList.remove("hidden");
  const activeNavigationButton = document.getElementById(`nav-${tabName}`);
  activeNavigationButton.classList.add("bg-emerald-600", "text-white");
  activeNavigationButton.classList.remove("text-slate-400", "hover:text-slate-200", "hover:bg-slate-800");
  document.getElementById("pageTitle").innerText = TAB_TITLES[tabName];
};

export default selectActiveTab;
