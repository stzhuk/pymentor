import React from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "../components/Layout";
import { Sidebar } from "../components/Sidebar";

export const IntroPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-linear-to-br from-slate-100 via-slate-200 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-sans text-gray-800 dark:text-gray-200 transition min-h-screen">
      <Layout sidebar={<Sidebar activeSection="intro" />}>
        {/* HEADER */}
        <section>
          <h2 className="text-4xl font-bold mb-6 text-blue-800 dark:text-blue-400">
            {t("intro.title")}
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {t("intro.description")}
          </p>
        </section>

        {/* MATERIALS */}
        <section className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              {t("intro.pythonTitle")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("intro.pythonDesc")}
            </p>
            <a
              href="https://www.python.org/downloads/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              {t("intro.download")}
            </a>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              {t("intro.vscodeTitle")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("intro.vscodeDesc")}
            </p>
            <a
              href="https://code.visualstudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              {t("intro.download")}
            </a>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">
              {t("intro.gitTitle")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("intro.gitDesc")}
            </p>
            <a
              href="https://git-scm.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              {t("intro.goTo")}
            </a>
          </div>
        </section>
      </Layout>
    </div>
  );
};
