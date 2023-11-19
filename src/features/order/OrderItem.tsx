import { formatCurrency } from "../../utils/helpers";
import { EachOrderType } from "./Order";

export default function OrderItem({
  item,
  ingredients,
}: {
  item: EachOrderType;
  ingredients: string;
}) {
  return (
    <li className="flex justify-between py-4">
      <div>
        <p>
          {item.quantity}x <span className="ml-2">{item.name}</span>
        </p>
        <p className="capitalize italic text-sm">{ingredients}</p>
      </div>
      <p>{formatCurrency(item.totalPrice)}</p>
    </li>
  );
}
