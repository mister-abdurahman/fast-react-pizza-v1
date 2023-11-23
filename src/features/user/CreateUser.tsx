import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "./userSlice";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const [newUserName, setNewUserName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit() {
    if (!newUserName) return;

    dispatch(updateUser(newUserName));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-sm sm:text-base tracking-widest font-semibold">
        👋 Welcome !, Please start by telling us your name?
      </p>
      <input
        type="text"
        placeholder="Your preferred name...?"
        className="w-1/3 focus:w-2/5 mt-4 rounded-full px-4 py-1 transform transition-all duration-500 placeholder:text-stone-400 focus:ring focus:outline-none focus:ring-yellow-600 focus:ring-opacity-50 focus:ring-offset-2"
        onChange={(e) => setNewUserName(e.target.value)}
      />
      {newUserName && (
        <span className="block mt-6">
          <Button type="primary">Jump in... 🚀</Button>
        </span>
      )}
    </form>
  );
}
