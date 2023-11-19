import Button from "../../UI/Button";
import { Form, useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant";

export default function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    // doesnt cause a navigation
    <fetcher.Form className="text-right" method="PATCH">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }: any) {
  await updateOrder(params.orderId, { priority: true });
  return null;
}
