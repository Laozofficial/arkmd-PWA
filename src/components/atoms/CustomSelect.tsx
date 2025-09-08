import { useField } from "formik";

import ErrorMessage from "./ErrorMessage";
import { ReactNode, useState } from "react";
import ClickOutside from "../shared/ClickOutside";
import { SearchNormal } from "iconsax-react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

export interface OptionType {
    text: string | ReactNode;
    value: string;
}

const CustomSelect = ({
    label,
    id,
    parentContainer,
    disabled,
    container,
    options,
    value,
    onChange,
    optionsParentClassName,
    placeholder,
    labelClass,
    ...props
}: any) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [, setSelectedId] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [focusColor, setFocusColor] = useState(false);
    const [selectedItem, setSelectedItem] = useState(false);
    const [, meta] = useField(props);

    const node = ClickOutside(() => {
        setIsOpen(false);
        setFocusColor(false);
        setSearchTerm("");
    });

    const filteredOptions = options?.filter((option:any) =>
        option?.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectedItem = (option:any) => {
        setSelectedItem(option.text);
        setIsOpen(false);
        setSearchTerm("")
        onChange(option);
    }

    return (
        <>
            {label && (
                <div className={`text-[14px] mb-4 text-neutral-dark ${labelClass}`}>
                    <label htmlFor={id}>{label}</label>
                </div>
            )}
            <div className="relative" ref={node}>
                <div
                    onClick={() => {
                        setIsOpen(!isOpen);
                        setFocusColor(true);
                    }}
                    className={`  rounded-[4px] ${focusColor ? "border-purple-normal-hover" : ""
                        }  ${parentContainer} ${disabled
                            ? "bg-[#F4F4F4] !cursor-not-allowed border-[0.6px] border-[#B2BBC699]"
                            : "bg-[#ABD9F60D]"
                        } flex items-center h-[50px] !outline-none px-3 w-full ${meta.touched && meta.error ? "!border !border-alert-text-error" : ""
                        }  `}
                >
                    <div className={`!w-full pr-2 flex justify-between ${container}`}>
                        <input className={`h-auto w-full !outline-none border-none bg-transparent capitalize `} readOnly type="text" name="" id="" value={selectedItem || value || placeholder} />
                        {(isOpen && !disabled) ? (<FaCaretUp size={16} className=" ml-3" color="#FFDE59" />) : (<FaCaretDown size={16} className=" ml-3" color="#FFDE59" />)}

                    </div>
                </div>
                {(isOpen && !disabled) && (
                    <div className="absolute top-10 z-[100] right-0 w-[150px] rounded-md bg-black shadow-lg ">
                        <div className="relative m-1">
                            <input
                                type="search"
                                className={`border-[0.5px] placeholder:text-12 indent-8 rounded placeholder:text-neutral-light-hover w-full h-[32px] border-[#B2BBC6B0] `}
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <SearchNormal className="text-neutral-light-hover absolute top-2 ml-3" size={16} />
                        </div>
                        <ul className={`max-h-[180px] overflow-y-auto pb-2 overflow-x-hidden show-scrollbar ${optionsParentClassName}`}>
                            {placeholder && (
                                <li
                                    className="mt-[7px] pl-3.5 cursor-pointer hover:bg-purple-light hover:text-purple-normal py-1"
                                    onClick={() => { handleSelectedItem({ text: placeholder, value: "" }) }} >{placeholder}</li>
                            )}
                            {filteredOptions?.map((option, index) => (
                                <li
                                    key={index}
                                    onClick={() => { handleSelectedItem(option); setSelectedId(index) }}
                                    className={`mt-[7px] pl-3.5 cursor-pointer hover:bg-[#FFDE5933] hover:text-white py-1 ${(value === option.text) ? "bg-purple-light text-purple-normal" : ""}`}
                                >
                                    {option.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {meta.touched && meta.error && <ErrorMessage error={meta.error} />}
        </>
    );
};

export default CustomSelect;
