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
    <nav className="NavBar navbar navbar-light bg-light">
      <NavLink to="/">Jobly</NavLink>
      <NavLink to="/companies" end>Companies</NavLink>
      <NavLink to="/jobs">Jobs</NavLink>
    </nav>
  );
}

export default NavBar;