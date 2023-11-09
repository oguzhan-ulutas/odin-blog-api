import { Link } from "react-router-dom";

import Header from "../01-main-page/Header";
import Footer from "../01-main-page/Footer";

const User = ({ user, setUser }) => {
  console.log(user);
  return (
    <main>
      <Header user={user} setUser={setUser}></Header>
      <div className="content-container">
        {user.firstname && (
          <>
            <h4>Welcome {user.firstname}</h4>
            <div className="update-profile">
              <div>Change first name</div>
              <div>Change last name</div>
              <div>Change e-mail</div>
              <div>Change password</div>
              <div>Change Avatar</div>
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
        )}
      </div>
      <Footer></Footer>
    </main>
  );
};

export default User;
