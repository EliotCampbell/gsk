import React, { ReactNode } from "react";
import classes from "./Header.module.css";

interface IMenuItem {
  type: string;
  title: string;
}

interface IHeaderProps {
  menuItems: IMenuItem[];
}

const renderMenu = (menuItems: IMenuItem[]): ReactNode =>
  menuItems.map((item) => (
    <div className={classes.menuItem}>
      <p>{item.title}</p>
    </div>
  ));

const Header: React.FC<IHeaderProps> = ({ menuItems }) => {
  return (
    <div className={classes.Header}>
      <div className={classes.wrapper}>
        <h1 className={classes.logo}>GSK</h1>
        <div className={classes.menu}>{renderMenu(menuItems)}</div>
      </div>
    </div>
  );
};

export default Header;
