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
                src="https://pngimg.com/d/star_wars_logo_PNG34.png"
                alt="Logo"
                width="100"
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