import React from 'react'
import { useNavigate } from 'react-router-dom';
import { errorMessages } from '../../../components/shared';
import * as yup from "yup";
import CustomAuthLayout from '../../../components/atoms/CustomAuthLayout';
import { Form, Formik } from 'formik';
import CustomInput from '../../../components/atoms/CustomInput';
import CustomButton from '../../../components/atoms/CustomButton';


function NewPasword({ step }) {

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
        <>
            <div className="">
                <div
                    className="text-white flex flex-col justify-center items-center gap-1 mt-8 relative h-full"
                >
                    <p className='text-[19px] font-bold'>Yayy</p>
                    <p className='text-[13px] font-light'>Email confirmed! You can now create your new password</p>
                </div>
                <CustomAuthLayout
                    className=' mt-10'
                >
                    <div className="">
                        <div className="">
                            <div className="mt-10">
                                <Formik<Values>
                                    initialValues={initialState}
                                    onSubmit={handleSubmit}
                                    validationSchema={loginSchema}
                                >
                                    {() => (
                                        <Form>
                                            <div className="h-[70vh] flex flex-col justify-between">
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div className="grid grid-cols-1 gap-5">
                                                        <CustomInput
                                                            label="New password"
                                                            id="new_password"
                                                            name="new_password"
                                                            placeholder="Enter your new password "
                                                            type="text"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-5">
                                                        <CustomInput
                                                            label="Confirm password"
                                                            id="confirm_password"
                                                            name="confirm_password"
                                                            placeholder="confirm your password "
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-8">
                                                    <CustomButton
                                                        title="Proceed"
                                                        type="button"
                                                        handleClick={() => step((prev) => prev + 1)}
                                                        className='!w-[350px]'
                                                    />
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
        </>
    )
}

export default NewPasword