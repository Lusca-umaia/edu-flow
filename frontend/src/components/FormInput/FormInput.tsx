// "use client";

// import { InputHTMLAttributes } from "react";
// import { IMaskInput } from "react-imask";

// interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
//   label?: string;
//   name: string;
//   type: InputHTMLAttributes<HTMLInputElement>["type"] | "textarea";
//   required?: boolean;
//   mask?: string;
//   value?: string;
//   disabled?: boolean;
//   handleChange: (value: string) => void;
//   className?: string;
//   error?: string;
// }

// const FormInput: React.FC<FormInputProps> = ({
//   name,
//   type,
//   className,
//   disabled,
//   error,
//   handleChange,
//   label,
//   mask,
//   value = "",
//   required = false,
//   ...props
// }) => {
//   return (
//     <div className={className}>
//       <div className="flex gap-1 items-center">
//         {label && (
//           <label
//             htmlFor={name}
//             className="text-sm font-semibold leading-6 text-gray-900"
//           >
//             {label}
//           </label>
//         )}
//       </div>
//       <div className="mt-1">
//         {mask ? (
//           <IMaskInput
//             id={name}
//             onAccept={(value: string) => handleChange(value)}
//             className="block w-full rounded-md outline-black border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black font-medium text-sm"
//             mask={mask}
//             value={value}
//             lazy={false}
//             required={required}
//             type={type}
//             {...props}
//           />
//         ) : (
//           <input
//             type={type}
//             value={value}
//             {...props}
//             onChange={(e) => handleChange(e.target.value)}
//             id={name}
//             disabled={disabled}
//             className="block w-full rounded-md outline-black border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black font-medium text-sm"
//             required={required}
//           />
//         )}
//       </div>
//       {error && (
//         <p className="text-sm font-medium mt-0.5 text-red-600">{error}</p>
//       )}
//     </div>
//   );
// };

// export default FormInput;

"use client";

import { classNames } from "@/utils/auxiliars";
import { InputHTMLAttributes } from "react";
import { IMaskInput } from "react-imask";

type FormInputType = InputHTMLAttributes<HTMLInputElement>["type"] | "textarea";

interface FormInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  name: string;
  type: FormInputType;
  required?: boolean;
  mask?: string;
  value?: string;
  disabled?: boolean;
  handleChange: (value: string) => void;
  className?: string;
  error?: string;
}

const baseInputClass =
  "block w-full rounded-md outline-black border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black font-medium text-sm";

const FormInput: React.FC<FormInputProps> = ({
  name,
  type,
  className,
  disabled,
  error,
  handleChange,
  label,
  mask,
  value = "",
  required = false,
  ...props
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          {label}
        </label>
      )}

      <div className="mt-1">
        {type === "textarea" ? (
          <textarea
            id={name}
            value={value}
            placeholder={props.placeholder}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            required={required}
            rows={4}
            className={classNames(baseInputClass, "resize-none")}
          />
        ) : mask ? (
          <IMaskInput
            id={name}
            onAccept={(value: string) => handleChange(value)}
            className={baseInputClass}
            mask={mask}
            value={value}
            lazy={false}
            required={required}
            type={type}
            {...props}
          />
        ) : (
          <input
            id={name}
            type={type}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            disabled={disabled}
            required={required}
            className={baseInputClass}
            {...props}
          />
        )}
      </div>

      {error && (
        <p className="text-sm font-medium mt-0.5 text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
