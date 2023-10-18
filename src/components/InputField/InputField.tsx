import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  label?: string;
  name?: string;
  type?: "text" | "number" | "email" | "password" | "date" | "time";
  placeholder?: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: any;
  value?: string;
  disabled?: boolean;
  defaultValue?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  name,
  type,
  placeholder,
  required,
  register,
  errors,
  value,
  disabled,
  defaultValue,
  onChange,
}: InputFieldProps) => {
  return (
    <div className="w-full">
      {label && (
        <div className="flex gap-1 items-center mb-1">
          <label className={`${errors?.name ? "label_text2" : "label_text"}`}>
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        </div>
      )}
      {register ? (
        <input
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          type={type ? type : "text"}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue ? defaultValue : null}
          {...register(name ? name : "noName", {
            required: required ? true : false,
          })}
        />
      ) : (
        <input
          type={type ? type : "text"}
          placeholder={placeholder}
          name={name}
          value={value}
          disabled={disabled}
          defaultValue={defaultValue ? defaultValue : null}
          onChange={onChange ? onChange : () => {}}
          required={required ? true : false}
        />
      )}
      {errors?.name && <p className="text-rose-500">{label} is required</p>}
    </div>
  );
};

export default InputField;
