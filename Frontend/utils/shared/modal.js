const openModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.classList.remove("hidden");
  modal.classList.add("flex");
};

const closeModal = (modalId) => {
  const modal = document.getElementById(modalId);
  modal.classList.add("hidden");
  modal.classList.remove("flex");
};

export { closeModal, openModal };
