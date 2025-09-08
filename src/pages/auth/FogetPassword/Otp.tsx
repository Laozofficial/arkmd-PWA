import React, { useState } from 'react'
import CustomAuthLayout from '../../../components/atoms/CustomAuthLayout'
import OTPInput from "react-otp-input";
import CustomButton from '../../../components/atoms/CustomButton';
import { Form, Formik } from 'formik';





function Otp({ step }) {

    const [resetOtp, setResetOtp] = useState<string>('');

    const handleSubmit = () => { }

    return (
        <>
            <CustomAuthLayout
                className='relative h-[100vh]'
            >
                <div
                    className="text-white flex flex-col r items-center gap-1 mt-8 mb-5"
                >
                    <p className='text-[19px] font-bold'>Check your email</p>
                    <p className='text-[13px] font-light'>We just sent a code <span className='italic'>samplemail@gmail.com</span></p>
                </div>
                <Formik
                    initialValues={{}}
                    onSubmit={handleSubmit}
                    validationSchema={{}}
                >
                    {() => (
                        <Form>
                            <div className="h-[80vh] flex flex-col justify-between">
                                <div className="flex flex-col gap-5">
                                    <p className=''>Enter code</p>
                                    <div className="">
                                        <OTPInput
                                            value={resetOtp}
                                            onChange={setResetOtp}
                                            numInputs={4}
                                            renderInput={(props) => (
                                                <input
                                                    {...props}
                                                    className="!w-[45px] !h-[40px] border-0 border-b-2 border-b-[#B7B7B74D] focus:border-b-[#FFDE59] outline-none text-center text-[18px]"
                                                />
                                            )}
                                            containerStyle={{ display: 'flex', gap: '10px' }}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="text-[14px] flex flex-col items-center justify-center mt-[80px]">
                                        <p>I didn't recieve any code <span className='text-[#FFDE59] underline'>Resend</span></p>
                                        <p className='text-[#FFDE59] underline'>Use another mail</p>
                                    </div>
                                    <div
                                        className=""
                                    >
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="mb-8">
                                                <CustomButton
                                                    title='Proceed'
                                                    type='button'
                                                    handleClick={() => step((prev) => prev + 1)}
                                                    className='!w-[350px]'
                                                // isDisabled
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik >
            </CustomAuthLayout>
        </>
    )

}

export default Otp