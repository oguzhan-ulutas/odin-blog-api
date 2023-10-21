import { Navigate } from "react-router-dom";

const ErrorSignup = ({ data }) => {
  if (data.message === "Success") {
    // If sign up succesful navigate to login page
    return <Navigate to="/blog-api/v1/login" />;
  } else if (data.err) {
    // If there is database errors, show the errors.
    return (
      <div className="errors">
        - This email is already exist. Go to login page to login.
      </div>
    );
  } else if (data.errors) {
    // If there is form errors, show errors
    return (
      <div className="errors">
        {data.errors.map((item, index) => {
          console.log(item.msg, index);
          return <p key={index}>- {item.msg}</p>;
        })}
      </div>
    );
  } else {
    return;
  }
};

export default ErrorSignup;
