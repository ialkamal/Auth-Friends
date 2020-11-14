import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

function Friends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/friends")
      .then((res) => setFriends(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Friends</h1>
      {friends.map((friend) => (
        <pre key={friend.id}>{JSON.stringify(friend, null, 2)}</pre>
      ))}
    </div>
  );
}

export default Friends;
