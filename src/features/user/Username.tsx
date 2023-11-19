import { useSelector } from "react-redux";
import { getUsername } from "./userSlice";

export default function Username() {
  const username = useSelector(getUsername);

  return (
    <h4 className="hidden sm:block uppercase font-semibold text-sm">
      {username}
    </h4>
  );
}
