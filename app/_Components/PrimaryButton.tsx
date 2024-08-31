import React from "react";
import SpinnerMini from "./SpinnerMini";
type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
};
export default function PrimaryButton({
  children,
  onClick,
  disabled,
  isLoading,
}: Props) {
  return (
    <button
      className="w-full py-3 text-center transition-colors rounded-md bg-primary-600 hover:bg-primary-500 disabled:cursor-not-allowed disabled:bg-slate-800 "
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? <SpinnerMini /> : <>{children}</>}
    </button>
  );
}
