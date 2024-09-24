import React from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
};
export default function Textarea({
  label,
  name,
  defaultValue,
  placeholder,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="space-y-1">
      <label className="label">
        {label}
      </label>
      <textarea
        className="h-40 input"
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name)}
      ></textarea>
      {errors && (
        <span className="block text-sm text-left capitalize text-red">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}
