import React, { ReactNode } from "react";
import classes from "./LayoutBody.module.css";

const LayoutBody: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={classes.LayoutBody}>{children}</div>;
};

export default LayoutBody;
