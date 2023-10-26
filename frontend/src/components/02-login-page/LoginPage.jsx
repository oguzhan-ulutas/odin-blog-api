import { useState } from "react";

import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";
import ErrorLogin from "./ErrorLogin";

const LoginPage = ({ user, setUser, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = "http://localhost:3000/blog-api/v1/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        mode: "cors",
      });
      const jsonData = await response.json();
      if (response.status === 200) {
        console.log("Success on fetch", jsonData);
        console.log(jsonData);
        setData(jsonData);
        setToken(jsonData.token);
      } else {
        console.log("Error on fetch", jsonData.error);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  // Storing token to local storage
  if (data.token) {
    localStorage.setItem("data", JSON.stringify(data));
  }

  return (
    <main>
      <Header user={user} setUser={setUser} />
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
