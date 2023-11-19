import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import { clearCart, getCart, getTotalPizzaPrice } from "../cart/cartSlice";
import { formatCurrency } from "../../utils/helpers";
import {
  fetchAddress,
  getAddressError,
  getLoadingAddressStatus,
  getUserAddress,
  getUsername,
} from "../user/userSlice";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import store from "../../store";

const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

export default function CreateOrder() {
  const [hasPriority, setHasPriority] = useState(false);
  const totalPizzaPrice = useSelector(getTotalPizzaPrice);
  const username = useSelector(getUsername);
  const cart = useSelector(getCart);
  const address = useSelector(getUserAddress);
  const addressError = useSelector(getAddressError);
  const loadingAddressStatus = useSelector(getLoadingAddressStatus);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const formErrors: any = useActionData();

  const totalCalculatedPizzaPrice = hasPriority
    ? totalPizzaPrice * 0.2 + totalPizzaPrice
    : totalPizzaPrice;

  const isSubmitting = navigation.state === "submitting";
  const isLoadingAddress = loadingAddressStatus === "loading";

  async function handleGetAddress(e: React.FormEvent) {
    e.preventDefault();

    dispatch(fetchAddress());
  }

  if (cart.length < 1)
    return (
      <p className="text-xl mt-12">
        Your cart is still empty, try adding some pizzas from our{" "}
        <Link to={"/menu"} className="text-blue-500 font-semibold underline">
          Menu
        </Link>
      </p>
    );

  return (
    <div className="mt-8">
      <h1 className="text-xl font-semibold tracking-wide">
        Ready to get served 😋? Place your order now 🍕!
      </h1>

      <Form method="POST" action="/order/new" className="mt-6 space-y-6">
        <div className="flex gap-6 items-center">
          <label htmlFor="customer" className="basis-28">
            First Name
          </label>
          <input
            type="text"
            name="customer"
            id="customer"
            defaultValue={username}
            className="grow rounded-full py-1 px-4 transition-all duration-500 focus:ring focus:outline-none focus:ring-offset-1 focus:ring-yellow-400"
            required
          />
        </div>

        <div className="flex gap-6 items-center relative">
          <label htmlFor="phone" className="basis-28">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="grow rounded-full py-1 px-4 transition-all duration-500 focus:ring focus:outline-none focus:ring-offset-1 focus:ring-yellow-400"
            required
          />
          {formErrors?.phone && (
            <p className=" absolute -bottom-5 left-36 text-xs text-red-500 tracking-wide">
              {formErrors?.phone}
            </p>
          )}
        </div>

        <div className="flex gap-6 items-center relative">
          <label htmlFor="address" className="basis-28">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            defaultValue={address}
            className="grow rounded-full py-1 px-4 transition-all duration-500 focus:ring focus:outline-none focus:ring-offset-1 focus:ring-yellow-400"
            required
          />
          {!address && (
            <span className="absolute right-0">
              <Button
                type="small"
                disabled={isLoadingAddress}
                onClick={(e?: React.FormEvent) => handleGetAddress(e!)}
              >
                {isLoadingAddress ? "Getting Location..." : "Get Location"}
              </Button>
            </span>
          )}
          {addressError && (
            <p className=" absolute -bottom-5 left-36 text-xs text-red-500 tracking-wide">
              {addressError}
            </p>
          )}
        </div>

        <div className="flex gap-4 items-center">
          <input
            type="checkbox"
            name="priority"
            className=" w-6 aspect-square accent-yellow-400 transition-all duration-500 focus:ring focus:outline-none focus:ring-offset-1 focus:ring-yellow-400"
            checked={hasPriority}
            onChange={(e) => setHasPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="tracking-wider">
            Want to give your order priority?
          </label>

          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        </div>

        {isSubmitting ? (
          <Button type="primary" disabled={isSubmitting}>
            Placing Order...
          </Button>
        ) : (
          <Button type="primary">
            Order now for {formatCurrency(totalCalculatedPizzaPrice)}
          </Button>
        )}
      </Form>
    </div>
  );
}

export async function action({ request }: any) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const errors: { phone?: string } = {};

  if (!isValidPhone(data.phone))
    errors.phone = "Please enter a correct phone number";

  if (Object.keys(errors).length > 0) return errors;

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data?.priority === "on",
  };

  const newOrder = await createOrder(order);
  // test pizzaid = 4D8738

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}
