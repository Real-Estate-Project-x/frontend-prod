import { browser } from "$app/environment";

function createThemeStore() {
  let theme = $state<"light" | "dark">("dark");

  function init() {
    if (!browser) return;
    theme =
      (localStorage.getItem("blupodd-theme") as "light" | "dark") ?? "dark";
    applyToDOM(theme);
  }

  function toggle() {
    theme = theme === "dark" ? "light" : "dark";
    if (browser) {
      localStorage.setItem("blupodd-theme", theme);
      applyToDOM(theme);
    }
  }

  function applyToDOM(t: "light" | "dark") {
    const el = document.getElementById("root");
    if (!el) return;

    el.setAttribute("data-theme", t);
    el.classList.toggle("dark", t === "dark");
  }

  return {
    get theme() {
      return theme;
    },
    init,
    toggle,
  };
}

export const themeStore = createThemeStore();
