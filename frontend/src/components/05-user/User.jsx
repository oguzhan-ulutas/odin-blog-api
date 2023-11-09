import { Link } from "react-router-dom";
import { useState } from "react";

import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";

const User = ({ user, setUser }) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldString, setFieldString] = useState("");
  const [inputType, setInputType] = useState("");
  console.log(user);

  const handleClick = (e) => {
    const field = e.target.classList[1];
    setFieldName(field);

    if (field === "firstname") {
      setFieldString("First Name");
      setInputType("text");
    } else if (field === "lastname") {
      setFieldString("Last Name");
      setInputType("text");
    } else if (field === "email") {
      setFieldString("E-mail");
      setInputType("email");
    } else if (field === "password") {
      setFieldString("Password");
      setInputType("password");
    } else {
      setFieldString("Image");
      setInputType("file");
    }
  };
  return (
    <main>
      <Header user={user} setUser={setUser}></Header>
      <div className="content-container">
        {fieldName && (
          <>
            <form action="">
              <h4>{`Enter New ${fieldString}`}</h4>
              <div>
                <label htmlFor={fieldName}>{`*${fieldString} :`} </label>
                <input
                  type={inputType}
                  placeholder={`*Enter ${fieldString}...`}
                  name={fieldName}
                  onChange={() => {}}
                />
              </div>
              <button>{`Change ${fieldString}`}</button>
            </form>
          </>
        )}
        {user.firstname && (
          <>
            <h3>Welcome {user.firstname}</h3>
            <div className="update-profile">
              <div className="update-item firstname" onClick={handleClick}>
                <div className="first firstname">Change first name</div>
                <div>></div>
              </div>

              <hr />
              <div className="update-item lastname" onClick={handleClick}>
                <div className="first lastname">Change last name</div>
                <div>></div>
              </div>

              <hr />
              <div className="update-item email" onClick={handleClick}>
                <div className="first email">Change e-mail</div>
                <div>></div>
              </div>

              <hr />
              <div className="update-item password" onClick={handleClick}>
                <div className="first password">Change password</div>
                <div>></div>
              </div>

              <hr />
              <div className="update-item image" onClick={handleClick}>
                <div className="first image">Change Avatar</div>
                <div>></div>
              </div>
            </div>
          </>
        )}
        {!user.firstname && (
          <>
            <p>Hi There!!!</p>
            <p>If you already a member login.</p>
            <Link to="/blog-api/v1/login">Login</Link>
            <p>
              Or you can become a member, follow the link below, common join
              us!!!
            </p>
            <Link to="/blog-api/v1/signup">Signup</Link>
            <p>
              Go Back to home page. You can still read great posts and comments
            </p>
            <Link to="/blog-api/v1/">Home Page</Link>
          </>
        )}{" "}
      </div>
      <Footer></Footer>
    </main>
  );
};

export default User;
