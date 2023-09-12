import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ favorites, handleClick }) => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid" style={{ height: "2em" }}>
        <div className="ml-auto">
          <a className="navbar-brand" href="#">
            <Link to="/">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Magicthegathering-logo.svg/2560px-Magicthegathering-logo.svg.png"
                alt="Logo"
                width="250"
                height="100"
                className="d-inline-block align-text-top"
              ></img>
            </Link>
          </a>
        </div>
        <div>

        </div>
      </div>
    </nav>
  );
};