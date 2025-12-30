import { Field } from "@/@types/global";
import Select, { Option } from "../Select/Select";
import FormInput from "@/components/FormInput/FormInput";

type GenericInputProps<T> = {
  field: Field<T>;
  formData: T;
  errors: Partial<Record<keyof T, string>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (name: keyof T, value: any) => void;
  hiddenLabel?: boolean;
  options?: Option[];
};

export function GenericInput<T>({
  field,
  formData,
  errors,
  handleChange,
  hiddenLabel,
  options = [],
}: GenericInputProps<T>) {
  switch (field.type) {
    case "select":
      return (
        <Select
          value={formData[field.name] as number | null}
          onChange={({ id }) => handleChange(field.name, id)}
          options={options}
          placeholder={field.placeholder}
          label={hiddenLabel ? "" : field.label}
          error={errors[field.name]}
        />
      );

    default:
      return (
        <FormInput
          name={String(field.name)}
          label={hiddenLabel ? "" : field.label}
          placeholder={field.placeholder}
          type={field.type}
          required
          mask={field.mask}
          value={formData[field.name] as string}
          handleChange={(value) => handleChange(field.name, value)}
          error={errors[field.name]}
        />
      );
  }
}
