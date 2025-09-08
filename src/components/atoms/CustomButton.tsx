import React from 'react'


interface ButtonProps {
    handleClick: () => void;
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;
    isDisabled?: boolean;
    title?: string;
    value?: string;
    iconClass?: string;
    id?: string;
}


function CustomButton({ id, type, value, handleClick, title, isDisabled,className }: ButtonProps) {
    return (
        <button
            id={id}
            onClick={() => handleClick()}
            type={type}
            value={value}
            disabled={isDisabled}
            className={`w-[150px] h-[50px] rounded-4xl text-[#0A0A0A] font-bold text-[16px] ${isDisabled
                ? "bg-[#FFDE5933] cursor-not-allowed text-[#FFDE598C]"
                : "bg-[#FFDE59] cursor-pointer hover:bg-yellow-400"
                } ${className} `}
        >
            {title}
        </button>
    )
}

export default CustomButton