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
      <div className={`${container} font-poppins !text-black w-full`}>
        {label && (
          <div className="text-[14px] mb-2 text-[#F9F9F9]">
            <label htmlFor={id}>{label}</label>
          </div>
        )}
        <div className="relative">
          <input
            className={`rounded-lg relative  placeholder:text-[#B7B7B780] bg-[#ABD9F60D]  text-[#F9F9F9]  focus:bg-[#ABD9F60D] focus:outline-none focus:ring-0 ${inputClassName} focus:border-none border-0 h-[50px] px-3 w-full
  `}
            id={id}
            disabled={disabled}
            type={type === "password" && showPassword ? "text" : type}
            // type={type}
            {...field}
            {...props}
          />
          {icon && iconPosition === "end" && icon}
          <div className="absolute top-1/3 right-5 ">
            {type === "password" && showPassword ? (
              <Eye size={16} className="cursor-pointer" color='#F9F9F9' onClick={handleShowPassword} />
            ) : (
              type === "password" &&
              !showPassword && (
                <EyeSlash size={16} className="cursor-pointer" color='#F9F9F9' onClick={handleShowPassword} />
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







