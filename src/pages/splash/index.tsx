
import React, { useState } from 'react'
import Pic from '../../assets/arkmd-logo.png'
import OnboardPic from '../../assets/onboard.png'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../../components/atoms/CustomButton';



function Splash() {

    const [showOnboard, setShowOnBoard] = useState(false);

    const Navigate = useNavigate();

    setTimeout(() => {
        setShowOnBoard(true)
    }, 3000);


    return (
        <>
            {
                showOnboard ?
                    <div className="">
                        <div className="flex flex-col ">

                            <div className="flex flex-col items-center mt-[100px] gap-5">
                                <div className="">
                                    <div className="w-[200px] h-[200px] overflow-hidden">
                                        <img
                                            src={OnboardPic}
                                            alt="onboard picture"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center mt-6 text-white">
                                    <p>Smart Care, Just for you!</p>
                                    <p>From everyday guidance to professional</p>
                                    <p>insights, we make healthcare simple</p>
                                    <p>and accessible.</p>
                                </div>
                            </div>

                            <div className="flex w-full fixed bottom-0 left-0">
                                <CustomButton
                                    title="Log in"
                                    handleClick={() => { Navigate('/login') }}
                                    className="!w-full !bg-transparent !text-[#FFDE59] !h-[50px]"
                                />
                                <CustomButton
                                    title="Sign up"
                                    handleClick={() => { Navigate('/sign-up') }}
                                    className="!w-full rounded-none rounded-tl-4xl !h-[50px]"
                                />
                            </div>

                        </div>
                    </div> :
                    <div className="flex items-center justify-center h-[100vh]">
                        <div className="w-[200px] h-[200px] overflow-hidden">
                            <img
                                src={Pic}
                                alt="onboard picture"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
            }
        </>

    )
}

export default Splash




