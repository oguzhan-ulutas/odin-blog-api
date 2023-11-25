import { useState, Link } from "react";

import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";
import ErrorSignup from "./ErrorSignup";

const SignupPage = ({ user, setUser, setToken, baseUrl }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState({ avatar: { data: "" } });
  const [data, setData] = useState({});

  const handleSignup = async (e) => {
    e.preventDefault();

    const url = `${baseUrl}signup`;

    // Sending post req. to api
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ firstname, lastname, email, password, avatar }),
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
      <Header user={user} setUser={setUser} setToken={setToken} />
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
          <div>
            <label htmlFor="avatar">Avatar: </label>
            <input
              type="file"
              placeholder="Add image..."
              name="avatar"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = () => {
                  const base64String = reader.result.split(",")[1];
                  setAvatar({ data: base64String });
                };
              }}
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
