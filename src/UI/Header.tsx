import { Link } from "react-router-dom";
import Username from "../features/user/Username";
import SearchOrder from "../features/order/SearchOrder";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-5 bg-yellow-400 text-sm sm:text-base">
      <Link to={"/"} className="uppercase font-semibold cursor-pointer">
        Fast React Pizza - v1
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
