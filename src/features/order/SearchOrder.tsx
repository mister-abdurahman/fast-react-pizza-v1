import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        className="rounded-full sm:w-64 w-36 focus:w-48 sm:focus:w-80 transform transition-all duration-500 px-4 py-2 text-sm placeholder:text-stone-400 bg-yellow-100 focus:ring focus:outline-none focus:ring-yellow-600 focus:ring-opacity-50 focus:ring-offset-2"
        placeholder="Search Order #"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
