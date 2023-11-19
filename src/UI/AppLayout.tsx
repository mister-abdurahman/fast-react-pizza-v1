import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { getCart } from "../features/cart/cartSlice";

export default function AppLayout() {
  const navigation = useNavigation();
  const cart = useSelector(getCart);

  const loading = navigation.state === "loading";
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen bg-stone-100">
      {loading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl px-6">
          <Outlet />
        </main>
      </div>
      {cart.length ? <Footer /> : null}
    </div>
  );
}
