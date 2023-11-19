import React from "react";
import { itemType } from "./menu";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseAnItemQuantity,
  deleteAnItem,
  getCart,
  increaseAnItemQuantity,
} from "../cart/cartSlice";

interface eachItem {
  item: itemType;
}

export default function MenuItem({ item }: eachItem) {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);

  function handleAddToCart() {
    const newItem = {
      pizzaId: item.id,
      name: item.name,
      quantity: 1,
      unitPrice: item.unitPrice,
      totalPrice: item.unitPrice * 1,
    };
    dispatch(addToCart(newItem));
  }

  const itemIsInCart = cart.find((el) => el.pizzaId === item.id);

  return (
    <li
      key={item.id}
      className={`${
        item.soldOut && "opacity-60 grayscale"
      } flex gap-3 justify-between py-4`}
    >
      <figure className="w-24 h-24">
        <img
          src={item.imageUrl}
          className="w-full h-full"
          alt="pizza image url"
        />
      </figure>
      <div className="flex flex-col grow">
        <h4>{item.name}</h4>
        <p className="capitalize italic">{item.ingredients.join(", ")}</p>
        <div className="flex justify-between items-center mt-auto">
          <p className="mt-auto uppercase text-sm">
            {item.soldOut ? "Sold Out" : formatCurrency(item.unitPrice)}
          </p>
          {!item.soldOut &&
            (itemIsInCart ? (
              <div className="flex gap-4">
                <div className="flex gap-3 items-center">
                  <Button
                    type="round"
                    onClick={() => dispatch(decreaseAnItemQuantity(item.id))}
                  >
                    -
                  </Button>
                  {itemIsInCart.quantity}
                  <Button
                    type="round"
                    onClick={() => dispatch(increaseAnItemQuantity(item.id))}
                  >
                    +
                  </Button>
                </div>
                <Button
                  type="small"
                  onClick={() => dispatch(deleteAnItem(item.id))}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <Button onClick={handleAddToCart} type="small">
                Add to cart
              </Button>
            ))}
        </div>
      </div>
    </li>
  );
}
