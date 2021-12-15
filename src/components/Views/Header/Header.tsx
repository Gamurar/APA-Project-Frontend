import "./Header.css";
import React from "react";
import { AddStringBtn } from "components";
import logo from "assets/png/neural-128.png";

function Header() {
  return (
    <header className="main-header">
      <nav className="navigation">
        <div className="main-header__logo">
          <img src={logo} className="logo" alt="logo" />
          <span className="logo__company-name">TI-202FR - APA project</span>
          <span className="logo__algorithm-name">Aho–Corasick algorithm</span>
          <span className="logo__group-names">group: ( Iana Gamurar, Pavlenco Galina, Corcimari Mihail, Gac Ilia )</span>
        </div>
        <div className="main-header__add-text-btn">
          <AddStringBtn />
        </div>
      </nav>
    </header>
  );
}

export { Header };
