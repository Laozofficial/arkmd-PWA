import React, { useState } from 'react'
import { errorMessages } from '../../../components/shared';
import * as yup from "yup";
import CustomAuthLayout from '../../../components/atoms/CustomAuthLayout';
import { Form, Formik } from 'formik';
import CustomInput from '../../../components/atoms/CustomInput';
import CustomButton from '../../../components/atoms/CustomButton';
import { createPassword } from '../../../api/auth';
import { useRecoilValue } from 'recoil';
import { getResetStepsAtom } from '../../../recoil/atom/auth';


function NewPasword({ step }: any) {

    const stepsValue = useRecoilValue(getResetStepsAtom);

    const [isLoading, setIsLoading] = useState(false);

    const resetSchema = yup.object().shape({
        new_password: yup
            .string()
            .required(errorMessages.required),

        confirm_password: yup
            .string()
            .oneOf([yup.ref("new_password")], "Passwords must match")
            .required(errorMessages.required),
    });


    const initialState = {
        new_password: "",
        confirm_password: "",
    };

    const handleSubmit = (values: any) => {

        const payload = {
            email: stepsValue.email,
            otp: stepsValue.otp,
            password: values.new_password,
            password_confirmation: values.confirm_password,
        }

        createPassword(payload).then((res) => {
            setIsLoading(true);
            if (res?.success) {
                setIsLoading(false);
                step((prev: any) => prev + 1)
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
                                <Formik
                                    initialValues={initialState}
                                    onSubmit={(values) => handleSubmit(values)}
                                    validationSchema={resetSchema}
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
                                                        type="submit"
                                                        handleClick={() => { }}
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