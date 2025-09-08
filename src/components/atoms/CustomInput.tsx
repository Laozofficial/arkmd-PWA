import { useField } from "formik";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";
import { Eye, EyeSlash } from "iconsax-react";

interface InputProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  inputClassName?: string;
  container?: string;
}

const CustomInput = ({
  container,
  id,
  label,
  type,
  disabled,
  icon,
  inputClassName,
  iconPosition,
  ...props
}: InputProps | any) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [field, meta] = useField(props);

  return (
    <>
      <div className={`${container} font-poppins text-neutral-dark w-full`}>
        {label && (
          <div className="text-[14px] mb-2 text-[#F9F9F9]">
            <label htmlFor={id}>{label}</label>
          </div>
        )}
        <div className="relative">
          <input
            className={`rounded-lg relative placeholder:text-[#B7B7B780] bg-[#ABD9F60D] text-[#B7B7B780] ${inputClassName}  h-[50px] px-3 w-full ${meta.touched && meta.error ? "!border !border-alert-text-error" : ""
              }  `}
            id={id}
            disabled={disabled}
            type={type === "password" && showPassword ? "text" : type}
            // type={type}
            {...field}
            {...props}
          />
          {icon && iconPosition === "end" && icon}
          <div className="absolute top-3 right-3">
            {type === "password" && showPassword ? (
              <Eye className="cursor-pointer" onClick={handleShowPassword} color="red" />
            ) : (
              type === "password" &&
              !showPassword && (
                <EyeSlash className="cursor-pointer" onClick={handleShowPassword} color="red" />
              )
            )}
          </div>
        </div>
      </div>

      {meta.touched && meta.error && <ErrorMessage error={meta.error} />}
    </>
  );
};

export default CustomInput;
