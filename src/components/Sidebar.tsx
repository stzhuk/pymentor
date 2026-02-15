import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

interface SidebarProps {
  activeSection?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const pathname = location?.pathname || "/";
  const asideRef = useRef<HTMLElement | null>(null);

  /* ---------------- THEME LOGIC ---------------- */

  const getInitialTheme = () => {
    if (typeof window === "undefined") return false;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDark, setIsDark] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  /* ---------------- LANGUAGE ---------------- */

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  const scrollToHash = (hash: string) => {
    if (!hash) return;
    const id = hash.startsWith("#") ? hash.slice(1) : hash;
    const el =
      document.getElementById(id) || document.querySelector(`[name="${id}"]`);
    if (el) {
      (el as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      (el as HTMLElement).focus?.();
    }
  };

  useEffect(() => {
    const aside = asideRef.current;
    if (!aside) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;

      if (href.includes("#")) {
        // handle same-page hash links smoothly
        try {
          const url = new URL(href, window.location.href);
          const hash = url.hash ? url.hash.replace("#", "") : "";
          const targetPath = url.pathname || "/";

          if (targetPath === window.location.pathname) {
            e.preventDefault();
            scrollToHash(hash);
          }
          // If targetPath differs, let the browser/router handle navigation.
        } catch (err) {
          // fallback for plain hashes like '#block0'
          if (href.startsWith("#")) {
            e.preventDefault();
            scrollToHash(href.replace("#", ""));
          }
        }
      }
    };

    aside.addEventListener("click", onClick);
    return () => aside.removeEventListener("click", onClick);
  }, []);

  return (
    <aside
      ref={asideRef}
      className="hidden md:flex flex-col w-80 fixed h-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-r border-gray-200 dark:border-slate-700 shadow-xl p-8"
    >
      <h1 className="text-2xl font-bold mb-8 text-blue-800 dark:text-blue-400">
        {t("sidebar.title")}
      </h1>

      {/* NAV */}
      {pathname == "/" ? (
        <nav className="space-y-2 mb-10 text-sm font-medium">
          <a
            href="#top"
            className={`block px-4 py-2 rounded-xl transition ${
              activeSection === "top"
                ? "bg-blue-100 dark:bg-slate-700"
                : "hover:bg-blue-100 dark:hover:bg-slate-700"
            }`}
          >
            {t("sidebar.home")}
          </a>

          <a
            href="#block0"
            className={`block px-4 py-2 rounded-xl transition ${
              activeSection === "block0"
                ? "bg-blue-100 dark:bg-slate-700"
                : "hover:bg-blue-100 dark:hover:bg-slate-700"
            }`}
          >
            {t("sidebar.setupEnv")}
          </a>
        </nav>
      ) : (
        <nav className="space-y-2 mb-10 text-sm font-medium">
          <a
            href="/pymentor/"
            className="block px-4 py-2 rounded-xl transition bg-blue-100 dark:bg-slate-700"
          >
            {t("sidebar.backToRoadmap")}
          </a>
        </nav>
      )}

      {/* LANGUAGE */}
      <div className="mb-6">
        <label className="block text-xs mb-2 opacity-70">
          {t("sidebar.language")}
        </label>
        <select
          value={i18n.language}
          onChange={handleLanguageChange}
          className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="ru">Русский</option>
          <option value="ua">Українська</option>
        </select>
      </div>

      {/* THEME TOGGLE */}
      <div>
        <label className="block text-xs mb-2 opacity-70">
          {t("sidebar.theme")}
        </label>

        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-gray-200 dark:bg-slate-700 transition-colors duration-300"
        >
          <span>{t("sidebar.lightDark")}</span>

          <div className="w-12 h-6 flex items-center bg-gray-400 dark:bg-blue-600 rounded-full p-1 transition-colors duration-300">
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                isDark ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </button>
      </div>
    </aside>
  );
};
