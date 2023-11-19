import { useEffect } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { itemType } from "../menu/menu";
import Button from "../../UI/Button";
import UpdateOrder from "./UpdateOrder";

export interface EachOrderType {
  name: string;
  pizzaId: number;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
}

export default function Order() {
  const order: any = useLoaderData();
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher]
  );

  const {
    cart,
    // customer,
    estimatedDelivery,
    id,
    orderPrice,
    priority,
    priorityPrice,
    status,
  } = order;

  const estimatedMinutesLeft = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="mt-10 space-y-8">
      <div className="flex justify-between items-center">
        <p className="tracking-wider space-x-2 capitalize">
          <span> Order </span> <strong>#{id}</strong> <span> status: </span>
        </p>
        <div className="flex gap-2">
          {priority && (
            <h5 className="bg-red-500 uppercase text-sm px-4 py-2 rounded-full text-white font-semibold">
              Priority
            </h5>
          )}
          <h5 className="bg-green-500 uppercase text-sm px-4 py-2 rounded-full text-white font-semibold">
            {status === "preparing" ? "Preparing Order" : "Order is Ready"}
          </h5>
        </div>
      </div>
      <div className="flex justify-between items-center bg-stone-200 p-5">
        {estimatedMinutesLeft > 0 ? (
          <p>
            Only{" "}
            <span className="tracking-wider font-extrabold">
              {estimatedMinutesLeft}
            </span>{" "}
            minutes left 😉
          </p>
        ) : (
          <p className="tracking-wider">Order should have arrived 🙂</p>
        )}
        <p className="text-xs text-stone-500">
          Estimated delivery ({formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide-x-3 divide-stone-300 border-stone-300 border-t border-b">
        {cart.map((item: EachOrderType) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher?.data
                ?.find((el: itemType) => el.id === item.pizzaId)
                .ingredients.join(", ") || ""
            }
          />
        ))}
      </ul>
      <div className="bg-stone-200 p-6 space-y-2">
        <p className="text-sm">Pizza Price: {formatCurrency(orderPrice)}</p>
        <p className="text-sm">
          Priority Price: {formatCurrency(priorityPrice)}
        </p>
        <p className="">
          To be paid on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}

export async function loader({ params }: any) {
  const order = await getOrder(params.orderId);
  return order;
}
