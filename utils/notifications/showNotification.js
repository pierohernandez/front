const showNotification = (title, message, isError = true) => {
  const modal = document.getElementById("notificationModal");
  const iconContainer = document.getElementById("notifIconContainer");
  const icon = document.getElementById("notifIcon");

  document.getElementById("notifTitle").innerText = title;
  document.getElementById("notifMessage").innerText = message;
  iconContainer.className = isError
    ? "inline-flex p-4 rounded-full mb-3 bg-rose-100 text-rose-600 border border-rose-200"
    : "inline-flex p-4 rounded-full mb-3 bg-emerald-100 text-emerald-700";
  icon.setAttribute("data-lucide", isError ? "alert-circle" : "check-circle-2");
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  lucide.createIcons();
};

export default showNotification;
