document.documentElement.classList.add("js");

const themeButton = document.querySelector(".theme-toggle");
function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === "dark";
  themeButton.textContent = dark ? "☀ Light" : "☾ Dark";
  themeButton.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} theme`);
  themeButton.setAttribute("aria-pressed", String(dark));
}
if (themeButton) {
  updateThemeButton();
  themeButton.addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("gis-theme", theme); } catch { /* Optional preference. */ }
    updateThemeButton();
    document.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  });
}

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
if (menuButton && navigation) {
  function closeMenu() {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
  menuButton.addEventListener("click", () => {
    const open = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  navigation.addEventListener("click", event => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navigation.classList.contains("open")) {
      closeMenu(); menuButton.focus();
    }
  });
}

document.querySelectorAll(".copy-button").forEach(button => {
  button.addEventListener("click", async () => {
    const code = button.closest(".code-block").querySelector("code");
    try {
      await navigator.clipboard.writeText(code.textContent);
      button.textContent = "Copied!";
    } catch {
      // Select the snippet when clipboard permissions or HTTPS are unavailable.
      const range = document.createRange();
      range.selectNodeContents(code);
      const selection = window.getSelection();
      selection.removeAllRanges(); selection.addRange(range);
      button.textContent = "Press Ctrl/Cmd+C";
    }
    setTimeout(() => { button.textContent = "Copy code"; }, 3000);
  });
});

// Mark the section currently in view in the desktop table of contents.
const tocLinks = [...document.querySelectorAll(".toc a")];
if ("IntersectionObserver" in window && tocLinks.length) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      tocLinks.forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
  }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
  document.querySelectorAll(".article section[id]").forEach(section => observer.observe(section));
}
