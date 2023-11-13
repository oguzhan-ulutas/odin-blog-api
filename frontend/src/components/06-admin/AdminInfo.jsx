import { Link } from "react-router-dom";
import "./AdminInfo.css";

import Footer from "../01-main-page/Footer";
import Header from "../01-main-page/Header";

import github from "./image/github.png";
import linkedin from "./image/linkedin.png";

const AdminInfo = ({ user, setUser, setToken }) => {
  return (
    <main>
      <Header user={user} setUser={setUser} setToken={setToken} />
      <div className="admin-info">
        <h4>
          Thank you for visiting my page. You can find me on GitHub or Linkedin
          in the links below.
        </h4>
        <div className="links">
          <Link to="https://github.com/oguzhan-ulutas">
            <img src={github} alt="GitHub logo" />
            <h5>GitHub</h5>
          </Link>
        </div>
        <div className="links">
          <Link to="https://www.linkedin.com/in/oguzhan-ulutas-56692381/">
            <img src={linkedin} alt="Linkedin logo" />
            <h5>Linkedin</h5>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AdminInfo;
