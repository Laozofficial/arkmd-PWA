import React from 'react'
import CustomButton from '../../../components/atoms/CustomButton'
import CustomInput from '../../../components/atoms/CustomInput'
import { Form, Formik } from 'formik'
import { errorMessages } from '../../../components/shared';
import * as yup from "yup";
import CustomAuthLayout from '../../../components/atoms/CustomAuthLayout';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



function SignUp() {

    const Navigate = useNavigate();

    interface Values {
        email: string;
        password: string;
        confirm_password: string;
    }

    const signUpSchema = yup.object().shape({
        email: yup
            .string()
            .email(errorMessages.email)
            .required(errorMessages.required),
        password: yup.string().required(errorMessages.required),
    });

    const initialState = {
        email: "",
        password: "",
        confirm_password: "",
    };

    const handleSubmit = () => { }

    return (
        <>
            <div className="h-full">
                <CustomAuthLayout
                    className='h-[100vh] relative'
                >
                    <div className=" ">
                        <div
                            className="text-white flex flex-col justify-center items-center gap-1 mt-8"
                        >
                            <p className='text-[19px] font-bold'>Sign Up</p>
                            <p className='text-[13px] font-light'>Enter your details below create your account</p>
                        </div>
                        <div className="mt-[30px]">
                            <Formik<Values>
                                initialValues={initialState}
                                onSubmit={handleSubmit}
                                validationSchema={signUpSchema}
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
                                            <div className="">
                                                <CustomInput
                                                    label="Password"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Create password"
                                                    type="password"
                                                />
                                            </div>
                                            <div className="">
                                                <CustomInput
                                                    label="Confirm password"
                                                    id="confirm_password"
                                                    name="confirm_password"
                                                    placeholder="confirm password"
                                                    type="password"
                                                />
                                            </div>
                                            <div className="mt-[10px]">
                                                <CustomButton
                                                    title='Sign up'
                                                    type='button'
                                                    handleClick={() => { Navigate('/welcome') }}
                                                    className='!w-full'
                                                // isDisabled
                                                />
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik >
                        </div>
                        <div className="text-white flex flex-col items-center gap-5 mt-5">
                            <div className="flex flex-col items-center gap-2">
                                <p>Or</p>
                                <p>Sign up with</p>
                            </div>
                            <div className="flex gap-4 ">
                                <div className=" w-[30px] h-[30px] rounded-full border-[1px] border-[#E4E4E733] flex justify-center items-center">
                                    <FaApple size={14} color='white' />
                                </div>
                                <div className=" w-[30px] h-[30px] rounded-full border-[1px] border-[#E4E4E733] flex justify-center items-center">
                                    <FaGoogle size={14} color='white' />
                                </div>
                            </div>
                            <div className="  ">
                                <p>Already have an account?
                                    <span
                                        className='text-[#FFDE59] ml-2 italic underline cursor-pointer'
                                        onClick={() => Navigate('/login')}
                                    >
                                        Log in
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </CustomAuthLayout>
            </div>
        </>
    )
}

export default SignUp