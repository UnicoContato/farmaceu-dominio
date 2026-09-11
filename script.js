const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuButton = document.querySelector("[data-menu-button]");
const privacyButton = document.querySelector("[data-privacy]");
const privacyModal = document.querySelector("[data-privacy-modal]");
const closeModal = document.querySelector("[data-close-modal]");
const imageModal = document.querySelector("[data-image-modal]");
const imageModalImg = imageModal?.querySelector("img");
const closeImage = document.querySelector("[data-close-image]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = menu?.classList.toggle("is-open");
  header?.classList.toggle("is-open", Boolean(isOpen));
  menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

menu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menu.classList.remove("is-open");
    header?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();

privacyButton?.addEventListener("click", () => {
  privacyModal?.showModal();
  document.body.classList.add("modal-open");
});

closeModal?.addEventListener("click", () => {
  privacyModal?.close();
  document.body.classList.remove("modal-open");
});

privacyModal?.addEventListener("click", (event) => {
  if (event.target === privacyModal) {
    privacyModal.close();
    document.body.classList.remove("modal-open");
  }
});

document.querySelector("[data-gallery]")?.addEventListener("click", (event) => {
  const button = event.target instanceof Element ? event.target.closest("button[data-src]") : null;
  if (!button || !imageModalImg) return;

  const thumbnail = button.querySelector("img");
  imageModalImg.src = button.dataset.src || "";
  imageModalImg.alt = thumbnail?.getAttribute("alt") || "Foto da Drogarias Ultra Popular";
  imageModal?.showModal();
  document.body.classList.add("modal-open");
});

closeImage?.addEventListener("click", () => {
  imageModal?.close();
  document.body.classList.remove("modal-open");
});

imageModal?.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    imageModal.close();
    document.body.classList.remove("modal-open");
  }
});
