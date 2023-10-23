import { useState } from "react";

import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";
import ErrorLogin from "./ErrorLogin";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/blog-api/v1/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        console.log(res);
        setData(res);
        console.log(data);
      })
      .catch(function (err) {
        console.log(err);
      });
    // Storing token to local storage
    if (data) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  };

  return (
    <main>
      <Header />
      <div className="content-container">
        <ErrorLogin data={data} />
        <form action="" onSubmit={handleLogin}>
          <h1>Login</h1>
          <div>
            <label htmlFor="email">*E-mail: </label>
            <input
              type="email"
              placeholder="abc@abc.com"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
          <button>Login</button>
        </form>
      </div>
      <Footer />
    </main>
  );
};

export default LoginPage;
