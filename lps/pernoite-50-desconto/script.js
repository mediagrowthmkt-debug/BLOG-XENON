const WHATSAPP_NUMBER = "554884688350";

function buildWhatsAppUrl(source) {
  const text = [
    "Olá, vim pela promoção: Compre um Pernoite e Ganhe 50% de Desconto no Próximo.",
    "Quero consultar disponibilidade e reservar."
  ].join(" ");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  if (typeof gtag === "function") {
    gtag("event", "click_whatsapp", {
      event_category: "lead",
      event_label: source || "lp_pernoite_50"
    });
  }

  return url;
}

function handleWhatsAppClick(event) {
  event.preventDefault();
  const source = event.currentTarget.dataset.source || "lp_pernoite_50";
  const url = buildWhatsAppUrl(source);

  if (typeof gtag_report_conversion === "function") {
    gtag_report_conversion(url);
    return;
  }

  window.location.href = url;
}

function initWhatsAppButtons() {
  document.querySelectorAll(".js-whatsapp").forEach((button) => {
    button.addEventListener("click", handleWhatsAppClick);
  });
}

function initFloatingButton() {
  const floatingButton = document.querySelector(".floating-whatsapp");
  if (!floatingButton) return;

  function updateFloatingVisibility() {
    const shouldHide = window.matchMedia("(max-width: 680px)").matches && window.scrollY < 520;
    floatingButton.classList.toggle("is-hidden", shouldHide);
  }

  updateFloatingVisibility();
  window.addEventListener("scroll", updateFloatingVisibility, { passive: true });
  window.addEventListener("resize", updateFloatingVisibility);
}

document.addEventListener("DOMContentLoaded", () => {
  initWhatsAppButtons();
  initFloatingButton();
});
