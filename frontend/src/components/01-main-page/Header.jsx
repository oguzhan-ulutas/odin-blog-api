import React from "react";
import { Link } from "react-router-dom";

const Header = ({ user, setUser }) => {
  console.log(user);
  const handleLogout = (e) => {
    localStorage.removeItem("data");
    setUser({
      firstname: "",
      lastname: "",
      id: "",
      isAdmin: false,
    });
  };

  return (
    <header>
      <Link to="/blog-api/v1" className="logo">
        Odin Blog Api
      </Link>
      <nav>
        {user.firstname && (
          <>
            <p>Welcome {user.firstname}</p>
            <Link to="/blog-api/v1" onClick={handleLogout}>
              Logout
            </Link>
          </>
        )}
        {!user.firstname && (
          <>
            {" "}
            <Link to="/blog-api/v1/login">Login</Link>
            <Link to="/blog-api/v1/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
