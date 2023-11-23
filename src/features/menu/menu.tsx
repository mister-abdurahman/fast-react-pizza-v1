import { getMenu } from "../../services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

export interface itemType {
  id: number;
  name: string;
  imageUrl: string;
  ingredients: string[];
  soldOut: boolean;
  unitPrice: number;
}

export default function Menu() {
  const menu = useLoaderData() as itemType[];

  return (
    <div className="divide-y-4 divide-stone-200 mt-3">
      {menu?.map((item: itemType) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
