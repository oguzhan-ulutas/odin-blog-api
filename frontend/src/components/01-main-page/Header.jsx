import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.jpeg";

const Header = ({ user, setUser, setToken }) => {
  const handleLogout = (e) => {
    localStorage.removeItem("data");
    setUser({
      firstname: "",
      lastname: "",
      id: "",
      isAdmin: false,
    });
    setToken("");
  };

  return (
    <header>
      <div className="header-title">
        <Link to="/admin/info">
          <img src={avatar} alt="Male avatar image" className="avatar" />
        </Link>
        <Link to="/blog-api/v1" className="logo">
          Odin Blog Api
        </Link>
      </div>
      <nav>
        {user.firstname && (
          <>
            <p>Welcome {user.firstname}</p>
            {user.isAdmin && <Link to="/admin/v1">Control Panel</Link>}
            <Link to={`/blog-api/v1/user/${user.id}`}>Profile</Link>
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
