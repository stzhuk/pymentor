import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, sidebar }) => {
  return (
    <div className="flex min-h-screen">
      {sidebar}
      <main className="flex-1 md:ml-80 px-8 md:px-20 py-20 space-y-32 max-w-5xl">
        {children}
      </main>
    </div>
  );
};
