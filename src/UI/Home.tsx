import React from "react";
import { useSelector } from "react-redux";
import { getUsername } from "../features/user/userSlice";
import Button from "./Button";

export default function Home() {
  const username = useSelector(getUsername);
  return (
    <div className="text-center">
      <h1 className="text-xl sm:text-3xl my-8 font-bold tracking-widest leading-snug capitalize px-8 sm:px-12">
        The best Pizza
        <br />
        <span className=" text-yellow-400">
          Straight out of the oven, straight to you 😋!.
        </span>
      </h1>
      {username ? (
        <Button type="primary" to="/menu">
          <span className="capitalize"> Continue Ordering </span>,{" "}
          <span className="capitalize">{username}</span>
        </Button>
      ) : (
        <div>
          <p className="text-sm sm:text-base tracking-widest font-semibold">
            👋 Welcome !, Please start by telling us your name?
          </p>
          <input
            type="text"
            placeholder="Your preferred name...?"
            className="w-1/3 focus:w-2/5 mt-4 rounded-full px-4 py-1 transform transition-all duration-500 placeholder:text-stone-400 focus:ring focus:outline-none focus:ring-yellow-600 focus:ring-opacity-50 focus:ring-offset-2"
          />
        </div>
      )}
    </div>
  );
}
