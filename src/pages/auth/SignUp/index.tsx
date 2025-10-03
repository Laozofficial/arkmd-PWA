import React, { useState } from 'react'
import CustomButton from '../../../components/atoms/CustomButton'
import CustomInput from '../../../components/atoms/CustomInput'
import { Form, Formik } from 'formik'
import { errorMessages } from '../../../components/shared';
import * as yup from "yup";
import CustomAuthLayout from '../../../components/atoms/CustomAuthLayout';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../../../api/auth';
import { getLoggedUserAtom } from '../../../recoil/atom/auth';
import { useRecoilState } from 'recoil';
import { Country, } from "country-state-city";
import CustomSelect from '../../../components/atoms/CustomSelect';
import CustomLoader from '../../../components/atoms/CustomLoader';



function SignUp() {

    const Navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');

    const [, setLoggedUserAtom] = useRecoilState(getLoggedUserAtom);

    let countries = Country.getAllCountries().map((country) => ({
        text: country.name,
        value: country.isoCode,
    }));




    interface Values {
        first_name: string,
        last_name: string,
        country: string,
        email: string;
        password: string;
        confirm_password: string;
    }

    const signUpSchema = yup.object().shape({
        first_name: yup
            .string()
            .required(errorMessages.required)
            .min(2, "First name must be at least 2 characters"),
        last_name: yup
            .string()
            .required(errorMessages.required)
            .min(2, "Last name must be at least 2 characters"),
        email: yup
            .string()
            .required(errorMessages.required)
            .email(errorMessages.email),
        password: yup
            .string()
            .required(errorMessages.required)
            .min(6, "Password must be at least 6 characters"),
        confirm_password: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required(errorMessages.required),
    });

    const initialState = {
        first_name: "",
        last_name: "",
        country: "",
        email: "",
        password: "",
        confirm_password: "",
    };

    const handleLogin = async ({ email, password }: any) => {

        setIsLoading(true);
        const res = await loginUser({ email, password });

        if (res?.success) {

            setLoggedUserAtom(res.data.user);

            const token = res.data.access_token.token;
            const type = res.data.user.type;
            localStorage.setItem("token", token);
            if (type !== null) {
                Navigate(`/${type}`)
                setIsLoading(false);
            } else {
                Navigate('/welcome')
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (values: any) => {
        const payload = {
            first_name: values.first_name,
            last_name: values.last_name,
            country: values.country,
            email: values.email,
            password: values.password,
            password_confirmation: values.confirm_password,
        };

        setIsLoading(true);
        const res = await registerUser(payload);

        if (res?.success) {
            await handleLogin({
                email: values.email,
                password: values.password,
            });
        } else {
            setIsLoading(false);
        }
    };



    if (isLoading) {
        return (
            <CustomLoader />
        )
    }


    return (
        <>
            <div className="h-full">
                <CustomAuthLayout
                    className='h-[100vh] relative'
                >
                    <div className="">
                        <div
                            className="text-white flex flex-col justify-center items-center gap-1 mt-8"
                        >
                            <p className='text-[19px] font-bold'>Sign Up</p>
                            <p className='text-[13px] font-light'>Enter your details below create your account</p>
                        </div>
                        <div className="mt-[30px]">
                            <Formik<Values>
                                initialValues={initialState}
                                onSubmit={(values) => handleSubmit(values)}
                                validationSchema={signUpSchema}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form>
                                        <div className="grid grid-cols-1 gap-5">
                                            <div className="">
                                                <CustomInput
                                                    label="First name"
                                                    id="first_name"
                                                    name="first_name"
                                                    placeholder="enter your first name "
                                                    type="text"
                                                />
                                            </div>
                                            <div className="">
                                                <CustomInput
                                                    label="Last name"
                                                    id="last_name"
                                                    name="last_name"
                                                    placeholder="enter your last name "
                                                    type="text"
                                                />
                                            </div>
                                            <div>
                                                <CustomSelect
                                                    label="Country"
                                                    options={countries}
                                                    name="country"
                                                    value={selectedCountry || values.country}
                                                    onChange={(item: { value: string; text: string }) => {
                                                        setSelectedCountry(item.text);
                                                        setFieldValue("country", item.text);
                                                    }}
                                                    placeholder='select country'
                                                />
                                            </div>
                                            <div className="">
                                                <CustomInput
                                                    label="Email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="enter your email "
                                                    type="email"
                                                />
                                            </div>
                                            <div>
                                                <CustomInput
                                                    label="Create Password"
                                                    name="password"
                                                    id="password"
                                                    type="password"
                                                    placeholder="create your password"
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
                                                    type='submit'
                                                    handleClick={() => { }}
                                                    className='!w-full'
                                                />
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik >
                        </div>
                        <div className="text-white flex flex-col items-center gap-5 mt-5">
                            {/* <div className="flex flex-col items-center gap-2">
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
                            </div> */}
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