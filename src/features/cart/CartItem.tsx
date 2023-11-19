import { useDispatch } from "react-redux";
import Button from "../../UI/Button";
import { formatCurrency } from "../../utils/helpers";
import { CartType } from "./cart";
import {
  decreaseAnItemQuantity,
  deleteAnItem,
  increaseAnItemQuantity,
} from "./cartSlice";

interface CartItemType {
  item: CartType;
}

export default function CartItem({ item }: CartItemType) {
  const dispatch = useDispatch();

  return (
    <div
      key={item.pizzaId}
      className="flex justify-between py-3 items-center tracking-wider"
    >
      <p>
        <span className="mr-3">{item.quantity}x</span> {item.name}
      </p>
      <div className="flex items-center gap-5">
        <p>{formatCurrency(item.totalPrice)}</p>
        <div className="flex items-center gap-2">
          <Button
            type="round"
            onClick={() => dispatch(decreaseAnItemQuantity(item.pizzaId))}
          >
            -
          </Button>
          {item.quantity}
          <Button
            type="round"
            onClick={() => dispatch(increaseAnItemQuantity(item.pizzaId))}
          >
            +
          </Button>
        </div>
        <Button
          type="small"
          onClick={() => dispatch(deleteAnItem(item.pizzaId))}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
