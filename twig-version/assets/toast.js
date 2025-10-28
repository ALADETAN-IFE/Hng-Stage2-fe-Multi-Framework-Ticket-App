(function () {
  // Lightweight Toastify-like producer that matches the CSS classes in assets/toast.css
  function createContainer() {
    let c = document.querySelector(".Toastify__toast-container");
    if (!c) {
      c = document.createElement("div");
      c.className =
        "Toastify__toast-container Toastify__toast-container--top-right";
      document.body.appendChild(c);
    }
    return c;
  }

  function makeIcon(type) {
    const svgNs = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNs, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    // use CSS variables for color so themes apply
    svg.setAttribute(
      "fill",
      "var(--toastify-icon-color-" + (type === "error" ? "error" : type) + ")"
    );
    const path = document.createElementNS(svgNs, "path");
    if (type === "success") {
      path.setAttribute("d", "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z");
    } else if (type === "error") {
      path.setAttribute(
        "d",
        "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"
      );
    } else if (type === "info") {
      path.setAttribute(
        "d",
        "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"
      );
    } else {
      path.setAttribute("d", "M12 2a10 10 0 110 20 10 10 0 010-20z");
    }
    svg.appendChild(path);
    return svg;
  }

  function buildCloseSvg() {
    const svgNs = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNs, "svg");
    svg.setAttribute("viewBox", "0 0 14 16");
    const path = document.createElementNS(svgNs, "path");
    path.setAttribute("fill-rule", "evenodd");
    path.setAttribute(
      "d",
      "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
    );
    svg.appendChild(path);
    return svg;
  }

  function toast(message, opts) {
    opts = opts || {};
    const type = opts.type || "info";
    const timeout = typeof opts.timeout === "number" ? opts.timeout : 4000;
    const container = createContainer();

    const el = document.createElement("div");
    el.className =
      "Toastify__toast Toastify__toast-theme--light Toastify__toast--" +
      type +
      " Toastify__toast--close-on-click";
    el.setAttribute("role", "alert");
    el.setAttribute("tabindex", "0");

    const iconWrap = document.createElement("div");
    iconWrap.className =
      "Toastify__toast-icon Toastify--animate-icon Toastify__zoom-enter";
    iconWrap.appendChild(makeIcon(type));
    el.appendChild(iconWrap);

    const body = document.createElement("div");
    body.className = "Toastify__toast-body";
    body.textContent = message;
    el.appendChild(body);

    const close = document.createElement("button");
    close.className = "Toastify__close-button Toastify__close-button--light";
    close.setAttribute("type", "button");
    close.setAttribute("aria-label", "close");
    close.appendChild(buildCloseSvg());
    el.appendChild(close);

    // progress bar
    let progressWrp = document.createElement("div");
    progressWrp.className = "Toastify__progress-bar--wrp";
    progressWrp.setAttribute("data-hidden", "false");
    const progressBg = document.createElement("div");
    progressBg.className =
      "Toastify__progress-bar--bg Toastify__progress-bar-theme--light Toastify__progress-bar--" +
      type;
    const progress = document.createElement("div");
    progress.setAttribute("role", "progressbar");
    progress.setAttribute("aria-hidden", "false");
    progress.setAttribute("aria-label", "notification timer");
    progress.className =
      "Toastify__progress-bar Toastify__progress-bar--animated Toastify__progress-bar-theme--light Toastify__progress-bar--" +
      type;
    progress.style.animationDuration = timeout + "ms";
    progress.style.animationPlayState = "running";
    progressWrp.appendChild(progressBg);
    progressWrp.appendChild(progress);
    el.appendChild(progressWrp);

    container.appendChild(el);

    // timer with pause/resume on hover
    let start = Date.now();
    let remaining = timeout;
    let hideTimeout = timeout > 0 ? setTimeout(hide, remaining) : null;

    function hide() {
      if (hideTimeout) clearTimeout(hideTimeout);
      el.classList.add("Toastify__toast--exit");
      // remove after animation
      setTimeout(() => el.remove(), 400);
    }

    function pause() {
      if (!hideTimeout) return;
      const elapsed = Date.now() - start;
      remaining = Math.max(0, remaining - elapsed);
      clearTimeout(hideTimeout);
      hideTimeout = null;
      progress.style.animationPlayState = "paused";
    }

    function resume() {
      if (hideTimeout !== null) return;
      start = Date.now();
      if (remaining > 0) {
        progress.style.animationPlayState = "running";
        hideTimeout = setTimeout(hide, remaining);
      }
    }

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);

    close.addEventListener("click", function (e) {
      e.stopPropagation();
      hide();
    });

    el.addEventListener("click", function () {
      // clicking the toast hides it
      hide();
    });

    return { hide };
  }

  // Expose API
  window.toast = {
    show: (msg, opts) => toast(msg, opts),
    success: (msg, opts) =>
      toast(msg, Object.assign({}, opts, { type: "success" })),
    error: (msg, opts) =>
      toast(msg, Object.assign({}, opts, { type: "error" })),
    info: (msg, opts) => toast(msg, Object.assign({}, opts, { type: "info" })),
    warn: (msg, opts) =>
      toast(msg, Object.assign({}, opts, { type: "warning" })),
  };
})();
