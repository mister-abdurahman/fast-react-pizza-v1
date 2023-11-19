import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";
import CartItem from "./CartItem";
import { getUsername } from "../user/userSlice";
import Button from "../../UI/Button";

export interface CartType {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const username = useSelector(getUsername);
  return (
    <div className="mt-5">
      <Link to="/menu" className="text-sm text-blue-700 font-semibold">
        &larr; Back to menu
      </Link>
      {cart.length > 0 ? (
        <>
          <h3 className="mt-8 mb-5">
            Your Cart, <span className="font-bold">{username}</span>
          </h3>
          <div className="divide-y-4 divide-stone-300 space-y-1">
            {cart.map((item: CartType) => (
              <CartItem key={item.pizzaId} item={item} />
            ))}
          </div>
          <div className="space-x-4 mt-8">
            <Button type="primary" to="/order/new">
              Order Pizzas
            </Button>
            <Button onClick={() => dispatch(clearCart())} type="secondary">
              Clear Cart
            </Button>
          </div>
        </>
      ) : (
        <p className="text-xl mt-9">
          {" "}
          Go to{" "}
          <Link to={"/menu"} className="text-blue-600 font-semibold underline">
            Menu
          </Link>{" "}
          to add Pizzas you'd like to order to your cart now. 😋🍕{" "}
        </p>
      )}
    </div>
  );
}
