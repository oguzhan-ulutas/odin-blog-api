import { useState, Link } from "react";

import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";
import ErrorSignup from "./ErrorSignup";

const SignupPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});

  const handleSignup = async (e) => {
    e.preventDefault();

    // Sending post req. to api
    await fetch("http://localhost:3000/blog-api/v1/signup", {
      method: "POST",
      body: JSON.stringify({ firstname, lastname, email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        setData(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  return (
    <main>
      <Header />
      <div className="content-container">
        <ErrorSignup data={data} />
        <form action="" onSubmit={handleSignup}>
          <h1>Signup</h1>
          <div>
            <label htmlFor="firstname">*First Name: </label>
            <input
              type="text"
              placeholder="Sarah..."
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastname">*Last Name: </label>
            <input
              type="text"
              placeholder="Brown..."
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">*E-mail: </label>
            <input
              type="email"
              placeholder="abc@abc.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">*Password: </label>
            <input
              type="password"
              placeholder="1234"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Signup</button>
        </form>
      </div>

      <Footer />
    </main>
  );
};

export default SignupPage;
