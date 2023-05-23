import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Style from "./Nav.module.css";

const Nav = () => {
  return (
    <div className={Style.container}>
      <div className={Style.items}>
        <Link to="/">
          <h1 className={Style.title}>PI Countries</h1>
        </Link>
        <Search />
      </div>
    </div>
  );
};

export default Nav;
