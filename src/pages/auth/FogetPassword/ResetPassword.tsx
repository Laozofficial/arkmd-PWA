import React, { useState } from 'react'
import CustomAuthLayout from '../../../components/atoms/CustomAuthLayout'
import { Form, Formik } from 'formik'
import CustomInput from '../../../components/atoms/CustomInput'
import CustomButton from '../../../components/atoms/CustomButton'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup";
import { errorMessages } from '../../../components/shared'
import { forgetPassword } from '../../../api/auth'
import { getResetStepsAtom } from '../../../recoil/atom/auth'
import { useRecoilState } from 'recoil'



function ResetPassword({ step }: any) {

    const Navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [, setStepsAtom] = useRecoilState(getResetStepsAtom);

    interface Values {
        email: string;
    }

    const resetSchema = yup.object().shape({
        email: yup
            .string()
            .email(errorMessages.email)
            .required(errorMessages.required),
    });

    const initialState = {
        email: "",
    };

    const handleSubmit = (values: any) => {

        const payload = {
            email: values.email,
        }

        forgetPassword(payload).then((res) => {
            setIsLoading(true);
            if (res?.success) {
                setIsLoading(false);
                setStepsAtom((prev: any) => ({
                    ...prev, email: values.email
                }));
                step((prev: any) => prev + 1);
            } else {
                setIsLoading(false);
            }
        })
    }

    if (isLoading) {
        return (
            <div className="h-[100vh] flex items-center justify-center">
                <p>Loading....</p>
            </div>
        )
    }



    return (
        <div>
            <CustomAuthLayout
                className=' h-[100vh] relative'
            >
                <div className="">
                    <div
                        className="text-white flex flex-col justify-center items-center gap-1 mt-8 relative h-full"
                    >
                        <p className='text-[19px] font-bold'>Forgot password</p>
                        <p className='text-[13px] font-light'>Enter your email to get confirmation message</p>
                    </div>
                    <div className="h-[80vh] flex flex-col justify-between">
                        <div className="mt-10">
                            <Formik<Values>
                                initialValues={initialState}
                                onSubmit={handleSubmit}
                                validationSchema={resetSchema}
                            >
                                {() => (
                                    <Form>
                                        <div className="h-[80vh] flex flex-col justify-between">
                                            <div className="grid grid-cols-1 gap-5">
                                                <CustomInput
                                                    label="Email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="enter your email "
                                                    type="email"
                                                />
                                            </div>

                                            <div className="text-white flex flex-col items-center gap-5 mb-10">
                                                <div className="flex flex-col items-center justify-center w-full">
                                                    <div className="mb-8 w-full">
                                                        <CustomButton
                                                            title="Proceed"
                                                            type="submit"
                                                            // handleClick={() => { step((prev: any) => prev + 1) }}
                                                            handleClick={() => { }}
                                                            className='!w-full'
                                                        />
                                                    </div>
                                                    <p>
                                                        Remember password?
                                                        <span
                                                            className="text-[#FFDE59] ml-2 italic underline cursor-pointer"
                                                            onClick={() => Navigate("/login")}
                                                        >
                                                            Log in
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>

                </div>
            </CustomAuthLayout>
        </div>
    )

}

export default ResetPassword