// Apply the saved theme before the page paints. Storage may be disabled.
try {
  const savedTheme = localStorage.getItem("gis-theme");
  document.documentElement.dataset.theme = savedTheme === "dark" || savedTheme === "light"
    ? savedTheme : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
} catch {
  document.documentElement.dataset.theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
