import { useSelector } from "react-redux";
import { getUsername } from "../features/user/userSlice";
import Button from "./Button";
import CreateUser from "../features/user/CreateUser";

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
        <CreateUser />
      )}
    </div>
  );
}
