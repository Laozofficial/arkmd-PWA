import React, { useState } from 'react'
import CustomAuthLayout from '../../../components/atoms/CustomAuthLayout';
import { Form, Formik } from 'formik';
import CustomInput from '../../../components/atoms/CustomInput';
import CustomButton from '../../../components/atoms/CustomButton';
import * as yup from "yup";
import { errorMessages } from '../../../components/shared';
import { changePassword } from '../../../api/auth';
import CustomLoader from '../../../components/atoms/CustomLoader';



function NewChangedPassword({ step }: any) {

    const [isLoading, setIsLoading] = useState(false);

    const changePasswordSchema = yup.object().shape({
        current_password: yup
            .string()
            .required(errorMessages.required),
        password: yup
            .string()
            .min(6, "Password must be at least 6 characters")
            .required(errorMessages.required),
        password_confirmation: yup
            .string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required(errorMessages.required),
    });


    const initialState = {
        current_password: "",
        password: "",
        password_confirmation: "",
    };

    const handleSubmit = (values: any) => {

        setIsLoading(true);

        changePassword(values).then((res) => {
            if (res?.success) {
                setIsLoading(false);
                step((prev: any) => prev + 1)
            } else {
                setIsLoading(false);
            }
        });

    }

    if (isLoading) {
        return (
            <CustomLoader />
        )
    }




    return (
        <>
            <div className="">
                <div
                    className="text-white flex flex-col justify-center items-center gap-1 mt-8 relative h-full"
                >
                    <p className='text-[19px] font-bold'>Change password</p>
                    <p className='text-[13px] font-light'>Enter details to proceed</p>
                </div>
                <CustomAuthLayout
                    className=' mt-10'
                >
                    <div className="">
                        <div className="">
                            <div className="mt-10">
                                <Formik
                                    initialValues={initialState}
                                    onSubmit={handleSubmit}
                                    validationSchema={changePasswordSchema}
                                >
                                    {() => (
                                        <Form>
                                            <div className="h-[70vh] flex flex-col justify-between">
                                                <div className="grid grid-cols-1 gap-4">
                                                    <div className="grid grid-cols-1 gap-5">
                                                        <CustomInput
                                                            label="Current password"
                                                            id="current_password"
                                                            name="current_password"
                                                            placeholder="Enter your current password"
                                                            type="password"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-5">
                                                        <CustomInput
                                                            label="New password"
                                                            id="password"
                                                            name="password"
                                                            placeholder="Enter your new password "
                                                            type="password"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-5">
                                                        <CustomInput
                                                            label="Confirm password"
                                                            id="password_confirmation"
                                                            name="password_confirmation"
                                                            placeholder="confirm your password "
                                                            type="password"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-8 w-full">
                                                    <CustomButton
                                                        title="Proceed"
                                                        type="submit"
                                                        handleClick={() => { }}
                                                        className='!w-full'
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

export default NewChangedPassword