import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import { SignedOut, SignedIn, UserButton } from "@clerk/clerk-react";
// import { SignInButton, UserButton } from "@clerk/clerk-react";

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
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <SignedOut>
            <NavLink to="/signup">Sign Up</NavLink>
          </SignedOut>
          <SignedIn>
            <NavLink to="/play">Play</NavLink>
          </SignedIn>
        </li>
        <li>
          <SignedOut>
            <NavLink to="/login">Log In</NavLink>
          </SignedOut>
          <div className="userprofile">
            <SignedIn>
              <UserButton>User</UserButton>
            </SignedIn>
          </div>
        </li>
      </ul>
    </nav>
  );
};
