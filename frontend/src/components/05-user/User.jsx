import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import bcrypt from "bcryptjs";
import base64 from "base64-js";
import fs from "fs";

import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";

const User = ({ user, setUser, token }) => {
  const [fieldName, setFieldName] = useState("");
  const [fieldString, setFieldString] = useState("");
  const [inputType, setInputType] = useState("");

  const [input, setInput] = useState("");

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

  const handleChange = (e) => {
    e.preventDefault();

    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let obj = { [fieldName]: input };

    // Sending post req. to api
    const url = `http://localhost:3000/blog-api/v1/user/${user.id}/update`;

    // Crypt the password
    if (fieldName === "password") {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(input, salt);
      obj = { password: hashedPassword };
    }

    // Handle Image upload
    if (fieldName === "image") {
      const file = e.target[0].files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        // reader.result contains the base64-encoded string
        const base64String = reader.result.split(",")[1];
        obj = {
          avatar: {
            data: base64String,
          },
        };

        fetch(url, {
          method: "POST",
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          mode: "cors",
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (res) {
            setUser(res);
          })
          .catch(function (err) {
            console.log(err);
          });
      };
    } else {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        mode: "cors",
      })
        .then(function (res) {
          return res.json();
        })
        .then(function (res) {
          setUser(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  };

  return (
    <main>
      <Header user={user} setUser={setUser}></Header>
      <div className="content-container">
        {fieldName && (
          <>
            <form action="" onSubmit={handleSubmit}>
              <h4>{`Enter New ${fieldString}`}</h4>
              <div>
                <label htmlFor={fieldName}>{`*${fieldString} :`} </label>
                <input
                  type={inputType}
                  placeholder={`*Enter ${fieldString}...`}
                  name={fieldName}
                  onChange={handleChange}
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
