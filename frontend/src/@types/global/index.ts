import { InputHTMLAttributes } from "react";

export interface Field<T> {
  label: string;
  name: keyof T;
  type: InputHTMLAttributes<HTMLInputElement>["type"] | "select";
  placeholder?: string;
  mask?: string;
  customClass?: string;
}
