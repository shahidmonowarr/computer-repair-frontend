"use client";

import { Rate } from "antd";
import { Controller, useFormContext } from "react-hook-form";
interface IInput {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
}

const FormRating = ({ name, label, required, disabled }: IInput) => {
  const { control, setValue } = useFormContext();

  return (
    <div className="flex flex-col">
      {label && (
        <div className="flex gap-1 items-center mb-1">
          <label className={"label_text"}>
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
        </div>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Rate
            allowHalf={true}
            onChange={(e) => setValue(name, e)}
            disabled={disabled}
            style={{
              margin: "5px 0px ",
            }}
          />
        )}
      />
    </div>
  );
};

export default FormRating;
