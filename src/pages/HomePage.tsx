import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/Layout";
import { Sidebar } from "../components/Sidebar";

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="bg-linear-to-br from-slate-100 via-slate-200 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-sans text-gray-800 dark:text-gray-200 transition min-h-screen">
      <Layout sidebar={<Sidebar activeSection={activeSection} />}>
        {/* TOP */}
        <section id="top" className="max-w-4xl scroll-mt-32">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-12">
            <h2 className="text-4xl font-bold mb-6 text-blue-800 dark:text-blue-400">
              {t("home.welcome")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t("home.description")}
            </p>
          </div>
        </section>

        {/* BLOCK 0 */}
        <section id="block0" className="max-w-4xl scroll-mt-32">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-12 hover:shadow-2xl transition">
            <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-6">
              {t("home.setupTitle")}
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {t("home.setupDesc")}
            </p>

            <a
              href="/pymentor/intro"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition"
            >
              {t("home.goTo")}
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <section className="max-w-4xl">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-12">
            <h2 className="text-2xl font-bold mb-6 text-blue-800 dark:text-blue-400">
              {t("home.author")}
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              {t("home.authorDesc")}
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-black transition"
              >
                {t("home.fork")}
              </a>
              <a
                href="#"
                className="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition"
              >
                {t("home.support")}
              </a>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};
