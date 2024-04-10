import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";


/** Navigation bar component for Jobly.
 *
 * Props: none
 *
 * State: none
 *
 * App -> NavBar
 */

function NavBar() {
  return (
    <nav className="NavBar navbar navbar-light sticky-top navbar-expand-md">
      <div className="container-fluid">
        <NavLink
          className="navbar-brand ms-2"
          to="/" end>Jobly</NavLink>
        <ul className="ms-auto navbar-nav">
          <li className="nav-item me-4">
            <NavLink className="nav-link" to="/companies" end>Companies</NavLink>
          </li>
          <li className="nav-item me-4">
            <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
          </li>
        </ul>

      </div>
    </nav>
  );
}

export default NavBar;