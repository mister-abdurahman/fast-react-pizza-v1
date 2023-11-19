import { useRouteError, useNavigate } from "react-router-dom";

export default function Error() {
  const error: any = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 flex justify-center items-center backdrop-blur-md">
      <div className="bg-red-200 text-stone-600 w-fit rounded-md px-10 py-5 font-semibold text-white text-xl">
        <h1>Oops! An error occured 😢</h1>
        {error.status && (
          <h2>
            {" "}
            Status: {error?.status} - {error?.statusText}{" "}
          </h2>
        )}
        <p>Extra Information: {error.data || error.message}</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 underline bold capitalize"
        >
          Go back
        </button>
      </div>
    </div>
  );
}
