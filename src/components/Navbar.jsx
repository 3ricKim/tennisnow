import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <Link to="/" id="home">
        Home
      </Link>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/rackets">Rackets</NavLink>
        </li>
        <li>
          <NavLink to="/shoes">Shoes</NavLink>
        </li>
        <li>
          <NavLink to="/accessories">Accessories</NavLink>
        </li>
      </ul>
    </nav>
  );
};
