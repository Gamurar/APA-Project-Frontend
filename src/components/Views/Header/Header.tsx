import './Header.css';
import React from 'react';
import { AddStringBtn } from 'components'

function Header() {
  return (
    <header className="main-header">
      <nav className="navigation">
        <div className="main-header__logo">
          <span className="logo__company-name">TI-202FR - APA project</span>
        </div>
        <div className="main-header__add-text-btn">
          <AddStringBtn />
        </div>
      </nav>
    </header>
  );
}

export { Header };
