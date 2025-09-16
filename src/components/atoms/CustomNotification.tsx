


import { AiOutlineExclamationCircle } from "react-icons/ai";
import { toast, TypeOptions } from "react-toastify";

export const CustomNotification = (
  type: TypeOptions,
  text: string,
  autoClose?: number
) => {
  toast(
    <div
      className="w-full flex gap-2 text-16 font-poppins-medium justify-center bg-transparent"
    >
      <div className="flex items-center w-full gap-2 justify-center ">
        <span><AiOutlineExclamationCircle color="#F63D4A" size={25} /></span>
        <p className="mt-[3px] text-[#F63D4A]">{text}</p>
      </div>
    </div>,
    {
      type,
      icon: false,
      position: "top-center",
      hideProgressBar: true,
      autoClose: autoClose || 5000,
    }
  );
};
