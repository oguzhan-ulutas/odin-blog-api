import { Navigate } from "react-router-dom";

const ErrorLogin = ({ data }) => {
  // If login successful navigate to main page
  if (data.token) {
    return <Navigate to={"/blog-api/v1"} />;
  }

  // if errors tell errors to user
  if (data.message) {
    return <div className="errors">- {data.message}</div>;
  }
  return;
};

export default ErrorLogin;
