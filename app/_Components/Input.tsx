import React, { MouseEvent, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import OpenEye from "@/app/_Icons/OpenEye";
import CloseEye from "@/app/_Icons/CloseEye";

type InputType = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

export default function Input({
  name,
  label,
  type = "text",
  placeholder,
  defaultValue,
  disabled,
}: InputType) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const handleShowPassword = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();
      setIsShowPassword((prev) => !prev);
    },
    []
  );
  return (
    <div className="space-y-0">
      <label className="label">
        {type == "password" ? (
          <div className="flex items-center justify-between">
            {label}
            <button
              className="space-x-1 text-sm cursor-pointer"
              onClick={handleShowPassword}
            >
              
              {isShowPassword ? <OpenEye /> : <CloseEye />}
              <span>{isShowPassword ?"hide" : "show"}</span>
            </button>
          </div>
        ) : (
          label
        )}
      </label>

      <input
        type={type === "password" && isShowPassword ? "text" : type}
        placeholder={placeholder}
        className="input"
        defaultValue={defaultValue}
        disabled={disabled}
        {...register(name)}
      />
      {errors && (
        <span className="block text-sm text-left capitalize text-red">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}
