/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import { FaX } from "react-icons/fa6";

interface CustomModalProps {
    toggleVisibility?: Function;
    cancelModal?: Function;
    visibility: boolean;
    children: any;
    callBack?: Function;
    cardClassName?: string;
    sideClassName?: string;
}

const CustomSidBarModal = ({ toggleVisibility, visibility, callBack, cardClassName, children, cancelModal, sideClassName }: CustomModalProps) => {
    const closeModal = () => {
        toggleVisibility && toggleVisibility(false);
        callBack && callBack();
    };

    const closeWithBtn = () => {
        cancelModal && cancelModal(false);
        callBack && callBack();
    }

    return (
        <>
            <Transition appear as={Fragment} show={visibility}>
                <Dialog as="div"
                    className="relative z-[120]"
                    onClose={closeModal}
                >
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className={`fixed inset-0 bg-[#0A0A0ACC]`} />
                    </TransitionChild>

                    <div className="fixed inset-0  ">
                        <div className={`flex justify-end text-center ${sideClassName}`}>
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className={`${cardClassName}  relative rounded-lg transform  hide-scrollbar bg-black text-neutral-normal text-left align-middle shadow-xl transition-all`}>
                                    {cancelModal &&
                                        <span onClick={closeWithBtn} className="absolute right-4 top-5 bg-white cursor-pointer py-2 px-2 rounded-full text-purple-normal font-bold "><FaX /></span>
                                    }
                                    {children}
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default CustomSidBarModal;

