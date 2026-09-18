const header = document.querySelector("[data-header]");
const menu = document.querySelector("[data-menu]");
const menuButton = document.querySelector("[data-menu-button]");
const privacyButton = document.querySelector("[data-privacy]");
const privacyModal = document.querySelector("[data-privacy-modal]");
const closeModal = document.querySelector("[data-close-modal]");
const imageModal = document.querySelector("[data-image-modal]");
const imageModalImg = imageModal?.querySelector("img");
const closeImage = document.querySelector("[data-close-image]");
const unitTabs = document.querySelector("[data-unit-tabs]");
const whatsappMenu = document.querySelector("[data-whatsapp-menu]");
const whatsappToggle = document.querySelector("[data-whatsapp-toggle]");

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

menuButton?.addEventListener("click", () => {
  const isOpen = menu?.classList.toggle("is-open");
  header?.classList.toggle("is-open", Boolean(isOpen));
  menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
  whatsappMenu?.classList.remove("is-open");
  whatsappToggle?.setAttribute("aria-expanded", "false");
});

menu?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menu.classList.remove("is-open");
    header?.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    whatsappMenu?.classList.remove("is-open");
    whatsappToggle?.setAttribute("aria-expanded", "false");
  }
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();

whatsappToggle?.addEventListener("click", () => {
  const isOpen = whatsappMenu?.classList.toggle("is-open");
  whatsappToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

document.addEventListener("click", (event) => {
  if (!whatsappMenu || !whatsappToggle) return;
  if (event.target instanceof Node && whatsappMenu.contains(event.target)) return;

  whatsappMenu.classList.remove("is-open");
  whatsappToggle.setAttribute("aria-expanded", "false");
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  whatsappMenu?.classList.remove("is-open");
  whatsappToggle?.setAttribute("aria-expanded", "false");
});

unitTabs?.addEventListener("click", (event) => {
  const tab = event.target instanceof Element ? event.target.closest("[data-unit-tab]") : null;
  if (!(tab instanceof HTMLButtonElement)) return;

  const unit = tab.dataset.unitTab;
  const tabs = unitTabs.querySelectorAll("[data-unit-tab]");
  const panels = unitTabs.querySelectorAll("[data-unit-panel]");

  tabs.forEach((item) => {
    const isActive = item === tab;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-selected", String(isActive));
  });

  panels.forEach((panel) => {
    const isActive = panel.dataset.unitPanel === unit;
    panel.classList.toggle("is-active", isActive);
    panel.toggleAttribute("hidden", !isActive);
  });
});

unitTabs?.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

  const tabs = [...unitTabs.querySelectorAll("[data-unit-tab]")];
  const activeIndex = tabs.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
  const direction = event.key === "ArrowRight" ? 1 : -1;
  const nextIndex = (activeIndex + direction + tabs.length) % tabs.length;

  event.preventDefault();
  tabs[nextIndex]?.focus();
  tabs[nextIndex]?.click();
});

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
