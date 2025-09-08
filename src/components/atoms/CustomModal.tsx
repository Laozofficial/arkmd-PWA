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
}

const CustomModal = ({ toggleVisibility, visibility, callBack, cardClassName, children, cancelModal }: CustomModalProps) => {
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
                        <div className="fixed inset-0 bg-[#0A0A0ACC] " />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto rounded-full">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className={`${cardClassName} w-[400px] relative rounded-lg transform overflow-y-scroll hide-scrollbar bg-black text-neutral-normal text-left align-middle shadow-xl transition-all`}>
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

export default CustomModal;

