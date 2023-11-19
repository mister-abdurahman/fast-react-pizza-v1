import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTotalPizzaPrice,
  getTotalPizzaQuantity,
} from "../features/cart/cartSlice";
import { formatCurrency } from "../utils/helpers";

export default function Footer() {
  const totalPizzaQuantity = useSelector(getTotalPizzaQuantity);
  const totalPizzaPrice = useSelector(getTotalPizzaPrice);

  return (
    <footer className="bg-stone-800 px-8 py-5 flex justify-between">
      <p className="capitalize text-white space-x-3 tracking-wider">
        <span className="uppercase">{totalPizzaQuantity} pizzas</span>{" "}
        <span>{formatCurrency(totalPizzaPrice)}</span>{" "}
      </p>
      <Link to={"/cart"} className="uppercase text-white">
        open cart &rarr;
      </Link>
    </footer>
  );
}
