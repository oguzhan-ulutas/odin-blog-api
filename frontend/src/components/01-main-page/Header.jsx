import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/blog-api/v1" className="logo">
        Odin Blog Api
      </Link>
      <nav>
        <Link to="/blog-api/v1/login">Login</Link>
        <Link to="/blog-api/v1/signup">Signup</Link>
      </nav>
    </header>
  );
};

export default Header;
