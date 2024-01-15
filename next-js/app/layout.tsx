import type { Metadata } from "next";
import "./globals.css";
import React, { ReactNode } from "react";
import Header from "@/components/Header";
import StoreProvider from "@/lib/StoreProvider";

export const metadata: Metadata = {
  title: "ГСК",
  description: "ГСК official site",
};

interface IRootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FunctionComponent<IRootLayoutProps> = ({
  children,
}) => {
  const menuItems: { type: string; title: string }[] = [
    { type: "services", title: "Услуги мастеров" },
    { type: "ads", title: "Объявления собственников" },
    { type: "news", title: "Новости" },
    { type: "payment", title: "Оплата" },
    { type: "contacts", title: "Контакты" },
  ];

  return (
    <StoreProvider count={5}>
      <html lang="en">
        <body>
          <Header menuItems={menuItems} title={"ГСК"} />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
};

export default RootLayout;
