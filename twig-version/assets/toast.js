(function () {
  function createContainer() {
    let c = document.querySelector(".toast-container");
    if (!c) {
      c = document.createElement("div");
      c.className = "toast-container";
      document.body.appendChild(c);
    }
    return c;
  }

  function makeIcon(type) {
    const svgNs = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNs, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.classList.add("icon");
    const path = document.createElementNS(svgNs, "path");
    path.setAttribute("fill", "currentColor");
    if (type === "success") path.setAttribute("d", "M9 12l2 2 4-4");
    else if (type === "error")
      path.setAttribute(
        "d",
        "M12 2a10 10 0 110 20 10 10 0 010-20zm1 14h-2v-2h2v2zm0-4h-2V6h2v6z"
      );
    else if (type === "info")
      path.setAttribute(
        "d",
        "M12 2a10 10 0 110 20 10 10 0 010-20zm1 10h-2v6h2v-6zm0-4h-2v2h2V8z"
      );
    else path.setAttribute("d", "M12 2a10 10 0 110 20 10 10 0 010-20z");
    svg.appendChild(path);
    return svg;
  }

  function toast(message, opts) {
    opts = opts || {};
    const type = opts.type || "info";
    const timeout = typeof opts.timeout === "number" ? opts.timeout : 4000;
    const container = createContainer();
    const el = document.createElement("div");
    el.className = "toast toast-" + type;

    const icon = makeIcon(type);
    el.appendChild(icon);

    const text = document.createElement("div");
    text.innerText = message;
    el.appendChild(text);

    container.appendChild(el);

    let hideTimeout = setTimeout(hide, timeout);

    function hide() {
      clearTimeout(hideTimeout);
      el.classList.add("toast-hide");
      setTimeout(() => el.remove(), 300);
    }

    el.addEventListener("click", hide);

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
    warn: (msg, opts) => toast(msg, Object.assign({}, opts, { type: "warn" })),
  };
})();
