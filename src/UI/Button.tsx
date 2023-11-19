import React from "react";
import { Link } from "react-router-dom";

interface buttonType {
  children?: React.ReactNode;
  to?: string;
  type: keyof stylesType;
  onClick?: (e?: React.FormEvent) => void;
  disabled?: boolean;
}

interface stylesType {
  primary: string;
  small: string;
  round: string;
  secondary: string;
}

export default function Button({
  children,
  to,
  type,
  onClick,
  disabled = false,
}: buttonType) {
  const base =
    "bg-yellow-400 hover:bg-yellow-300 text-stone-700 rounded-full cursor-pointer uppercase active:translate-y-2 transform transition duration-500 focus:ring focus:ring-offset-2 focus:outline-none focus:ring-yellow-400";

  const styles: stylesType = {
    primary: base + " px-3 py-2 sm:px-6 sm:py-2.5 text-sm font-semibold",
    small: base + " px-2 py-1 sm:px-4 sm:py-2 text-xs font-semibold",
    round: base + " px-2 py-1 sm:px-3 sm:py-1 text-sm font-bold aspect-square",
    secondary:
      "px-3 sm:px-6 py-1 sm:py-2 text-sm sm:text-base rounded-full cursor-pointer uppercase active:translate-y-2 transform transition duration-500 border border-4 outline-none border-stone-300 hover:bg-stone-300 hover:ring hover:ring-offset-1 hover:outline-none hover:ring-stone-200",
  };

  if (to)
    return (
      <Link to={to} className={`${styles[type]}`}>
        {children}
      </Link>
    );
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${disabled && "cursor-not-allowed"} ${styles[type]}`}
    >
      {children}
    </button>
  );
}
