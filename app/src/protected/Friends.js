import React, { useState, useEffect } from "react";
import useForm from "../hooks/useForm";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialState = {
  name: "",
  age: "",
  email: "",
  isEditing: false,
};

function Friends() {
  const [friends, setFriends] = useState([]);
  const [handleChange, handleSubmit, newFriend, setFriend] = useForm(
    initialState
  );
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/friends")
      .then((res) => {
        setFriends(
          res.data.map((item) => {
            return { ...item, isEditing: false };
          })
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axiosWithAuth()
      .delete(`/api/friends/${id}`)
      .then((res) => {
        setFriends(
          res.data.map((item) => {
            return { ...item, isEditing: false };
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (friend) => {
    setFriend(friend);
    setFriends(
      friends.map((editFriend) => {
        if (friend.id === editFriend.id)
          return { ...editFriend, isEditing: true };
        return editFriend;
      })
    );
    setEditMode(true);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const [editFriend] = friends.filter((friend) => {
      return friend.isEditing;
    });
    axiosWithAuth()
      .put(`/api/friends/${editFriend.id}`, newFriend)
      .then((res) => {
        setFriends(
          res.data.map((item) => {
            return { ...item, isEditing: false };
          })
        );
      })
      .catch((err) => console.log(err));

    setFriend(initialState);
    setEditMode(false);
  };

  return (
    <div>
      <h1>Friends</h1>
      {friends.map((friend) => (
        <div key={friend.id}>
          <pre>{JSON.stringify(friend, null, 2)}</pre>
          <button onClick={() => handleDelete(friend.id)}>delete</button>
          <button disabled={editMode} onClick={() => handleEdit(friend)}>
            edit
          </button>
        </div>
      ))}
      <form>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={newFriend.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="age"
          placeholder="age"
          value={newFriend.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          value={newFriend.email}
          onChange={handleChange}
        />
        {editMode ? (
          <button onClick={saveEdit}>Save Friend</button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit().then((res) => setFriends(res.data));
            }}
          >
            Add Friend
          </button>
        )}
      </form>
    </div>
  );
}

export default Friends;
