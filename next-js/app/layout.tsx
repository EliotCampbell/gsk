import type { Metadata } from "next";
import "./globals.css";
import React, { ReactNode } from "react";
import Header from "@/app/Components/Header";

export const metadata: Metadata = {
  title: "GSK",
  description: "GSK official site",
};

interface IRootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FunctionComponent<IRootLayoutProps> = ({
  children,
}) => {
  const menuItems: { type: string; title: string }[] = [
    { type: "ads", title: "ads" },
    { type: "services", title: "services" },
  ];

  return (
    <html lang="en">
      <body>
        <Header menuItems={menuItems} />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
