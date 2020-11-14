import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

function useForm(initialState) {
  const [newFriend, setNewFriend] = useState(initialState);

  const handleChange = (e) => {
    setNewFriend({ ...newFriend, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    return axiosWithAuth()
      .post("/api/friends", newFriend)
      .then((res) => {
        setNewFriend(initialState);
        return res;
      })
      .catch((err) => console.log(err));
  };

  return [handleChange, handleSubmit, newFriend, setNewFriend];
}

export default useForm;
