import React, { useState } from 'react'
import CustomAuthLayout from '../../../components/atoms/CustomAuthLayout'
import CustomButton from '../../../components/atoms/CustomButton';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../../components/atoms/CustomModal';
import Image from '../../../assets/question.png'
import { createUserType } from '../../../api/auth';
import CustomLoader from '../../../components/atoms/CustomLoader';



function WelcomePage() {

    const Navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [role, setRole] = useState("");
    const [isOpen, setIsOpen] = useState(false);


    const storeUserType = (type: any) => {
        createUserType({ type: type }).then((res) => {
            setIsLoading(true);
            if (res?.success) {
                setIsLoading(false);
                Navigate(`/${type}`);
            } else {
                setIsLoading(false);
            }
        })
    }

    const handleProceed = () => {
        if (role == 'doctor') {
            storeUserType('doctor');

        } else {
            storeUserType('patient')
        }
    }


    if (isLoading) {
        return (
            <CustomLoader />
        )
    }


    return (
        <>
            <div className="h-full">
                <div className="text-white flex flex-col justify-center items-center gap-1 mt-8">
                    <p className='text-[19px] font-bold'>Welcome</p>
                    <p className="text-[13px] font-light">Now one last thing...</p>
                </div>
                <CustomAuthLayout
                    className='mt-8 h-[88vh]'
                >
                    <div className="flex flex-col justify-center items-center">
                        <div className=" gap-5 flex flex-col w-[350px]">
                            <div className="text-start">
                                <p>Who are you here as ?</p>
                            </div>
                            <div
                                className="flex items-center gap-3 rounded-xl border  pl-2 py-2 w-full"
                                style={{
                                    borderColor: role === "patient" ? "#FFDE59" : "#FFDE5933",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="patient"
                                    id="patient"
                                    value="patient"
                                    checked={role === "patient"}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-4 h-4 accent-yellow-500"
                                />
                                <div className="">
                                    <p className="text-[18px]">A patient</p>
                                    <p className="text-[10px] font-light">I want to consult to get health support & recommendations</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-xl border border-[#FFDE5933] pl-2 py-2 w-full "
                                style={{
                                    borderColor: role === "doctor" ? "#FFDE59" : "#FFDE5933",
                                    backgroundColor: role === "doctor" ? "#121416" : "",
                                }}
                            >
                                <input
                                    type="radio"
                                    name="doctor"
                                    id="doctor"
                                    value="doctor"
                                    checked={role === "doctor"}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-4 h-4 accent-yellow-500"
                                />
                                <div className="">
                                    <p className="text-[18px]">A doctor</p>
                                    <p className="text-[10px] font-light">I want to consult & support patients</p>
                                </div>
                            </div>
                            <div
                                className="font-extralight text-[12px] w-full flex justify-end cursor-pointer"
                                onClick={() => setIsOpen(true)}
                            >
                                <p>Why do we ask this ?</p>
                            </div>
                            <div className="mt-[16px] absolute bottom-8">
                                <CustomButton
                                    title={`I'm ready to start`}
                                    type='button'
                                    handleClick={handleProceed}
                                    className='!w-[350px]'
                                    isDisabled={role == ''}
                                />
                            </div>
                        </div>
                    </div>

                </CustomAuthLayout>
            </div>
            <CustomModal
                visibility={isOpen}
                toggleVisibility={setIsOpen}
                cardClassName='!w-250px'
            >
                <div className="flex flex-col items-center gap-5 py-10">
                    <div className="">
                        <img src={Image} alt="response" />
                    </div>
                    <div className="">
                        <p>Why do we ask this?</p>
                    </div>
                    <div className="flex flex-col items-center italic text-[14px] font-light">
                        <p>We adapt response to your role:</p>
                        <p>Patients get clear, easy-to-understand</p>
                        <p>answers while doctors get detailed,</p>
                        <p>professional medical insights.</p>
                    </div>
                    <div className="">
                        <CustomButton
                            title={`ok, got it`}
                            type='button'
                            handleClick={() => { setIsOpen(false) }}
                            className='!w-full px-5'
                        // isDisabled
                        />
                    </div>
                </div>
            </CustomModal>
        </>
    )
}

export default WelcomePage