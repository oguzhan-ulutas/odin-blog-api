import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./AllUsers.css";

const AllUsers = ({ token, users, setUsers }) => {
  useEffect(() => {
    const url = "http://localhost:3000/blog-api/v1/admin/users";

    // Sending post req. to api
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        setUsers(res.users);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  console.log(users);
  return (
    <div className="users-container">
      {users.map((user) => {
        return (
          <div key={user._id} className="user-container">
            <img
              src={`data:image/png;base64,${user.avatar.data}`}
              alt="User avatar"
            />
            <p>{`${user.firstname} ${user.lastname}`}</p>
            <p>{`Admin: ${user.isAdmin}`}</p>
            <Link>All comments of user</Link>
            <button>Delete User</button>
          </div>
        );
      })}
    </div>
  );
};

export default AllUsers;
