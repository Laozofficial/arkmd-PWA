import React from 'react'
import CustomButton from '../../../components/atoms/CustomButton'
import Image from '../../../assets/cheers.png'



function Success({ step }) {

    return (
        <>
            <div className="flex items-center justify-center h-[100vh]">
                <div className="flex flex-col items-center gap-8">
                    <div className="h-[70px] w-[70px] overflow-hidden">
                        <img
                            src={Image}
                            alt="cheers"
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <p>You're all set!</p>
                        <p className='font-extralight text-[14px]'>Passsword created, you can now log in</p>
                        <p className='font-extralight text-[14px]'>with your new password</p>
                    </div>
                    <div className="">
                        <CustomButton
                            title="Awwnn thanks 😊"
                            type="button"
                            handleClick={() => { }}
                            className='!w-full px-5'
                        />
                    </div>
                </div>
            </div>
        </>
    )

}

export default Success