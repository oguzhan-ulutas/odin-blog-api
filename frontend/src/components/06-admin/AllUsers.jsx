import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./AllUsers.css";

const AllUsers = ({ token, users, setUsers, baseUrl }) => {
  useEffect(() => {
    const url = `${baseUrl}admin/users`;

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

  const handleDelete = (e) => {
    e.preventDefault();

    const userid = e.target.className;

    const url = `${baseUrl}user/${userid}/delete`;
    console.log(url);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userid }),
      mode: "cors",
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        setUsers(res);
      })
      .catch(function (err) {
        console.log("User delete ERROR: ", err);
      });
  };

  return (
    <div className="users-container">
      {users.map((user) => {
        if (user.isAdmin) {
          return;
        }
        return (
          <div key={user._id} className="user-container">
            <img
              src={`data:image/png;base64,${user.avatar.data}`}
              alt="User avatar"
            />
            <p>{`${user.firstname} ${user.lastname}`}</p>
            <p>{`isAdmin: ${user.isAdmin}`}</p>

            <button className={user._id} onClick={handleDelete}>
              Delete User
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default AllUsers;
