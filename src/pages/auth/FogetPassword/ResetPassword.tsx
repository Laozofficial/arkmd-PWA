import React from 'react'
import CustomAuthLayout from '../../../components/atoms/CustomAuthLayout'
import { Form, Formik } from 'formik'
import CustomInput from '../../../components/atoms/CustomInput'
import CustomButton from '../../../components/atoms/CustomButton'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup";
import { errorMessages } from '../../../components/shared'



function ResetPassword({ step }) {

    const Navigate = useNavigate();

    interface Values {
        email: string;
    }

    const loginSchema = yup.object().shape({
        email: yup
            .string()
            .email(errorMessages.email)
            .required(errorMessages.required),
    });

    const initialState = {
        email: "",
    };

    const handleSubmit = () => { }

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
                                validationSchema={loginSchema}
                            >
                                {() => (
                                    <Form>
                                        <div className="grid grid-cols-1 gap-5">
                                            <CustomInput
                                                label="Email"
                                                id="email"
                                                name="email"
                                                placeholder="enter your email "
                                                type="email"
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                        <div className="text-white flex flex-col items-center gap-5 mb-10">
                            <div className="flex flex-col items-center justify-center">
                                <div className="mb-8">
                                    <CustomButton
                                        title="Proceed"
                                        type="button"
                                        handleClick={() => step((prev) => prev + 1)}
                                        className='!w-[350px]'
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

                </div>
            </CustomAuthLayout>
        </div>
    )

}

export default ResetPassword