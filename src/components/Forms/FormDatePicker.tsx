import { DatePicker, DatePickerProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

type FormDatePickerProps = {
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
  name: string;
  label?: string;
  value?: Dayjs;
  size?: "large" | "small";
};

const FormDatePicker = ({
  name,
  label,
  onChange,
  size,
}: FormDatePickerProps) => {
  const { control, setValue } = useFormContext();
  const handleOneChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString) : null;
    setValue(name, date);
  };

  return (
    <div>
      {label ? label : null}
      <br />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            defaultValue={dayjs(field.value)}
            size={size}
            onChange={handleOneChange}
            style={{ width: "100%" }}
          />
        )}
      />
    </div>
  );
};

export default FormDatePicker;
