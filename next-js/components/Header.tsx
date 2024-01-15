import React, { ReactNode } from "react";
import classes from "./Header.module.css";

interface IMenuItem {
  type: string;
  title: string;
}

interface IHeaderProps {
  menuItems: IMenuItem[];
  title: string;
}

const renderMenu = (menuItems: IMenuItem[]): ReactNode =>
  menuItems.map((item) => (
    <div className={classes.menuItem}>
      <p>{item.title}</p>
    </div>
  ));

const Header: React.FC<IHeaderProps> = ({ menuItems, title }) => {
  return (
    <div className={classes.Header}>
      <div className={classes.extraHeader}></div>
      <div className={classes.wrapper}>
        <h1 className={classes.logo}>{title}</h1>
        <div className={classes.menu}>{renderMenu(menuItems)}</div>
      </div>
    </div>
  );
};

export default Header;
