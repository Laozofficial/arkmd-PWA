import { Formik, Form } from 'formik';
import React from 'react'
import * as yup from "yup";
import { errorMessages } from '../../../components/shared';
import CustomInput from '../../../components/atoms/CustomInput';
import CustomButton from '../../../components/atoms/CustomButton';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../../../components/atoms/CustomSelect';
import { FaCaretDown } from 'react-icons/fa6';


function AddPatient() {

    const Navigate = useNavigate();



    interface Values {
        email: string;
        password: string;
    }

    const loginSchema = yup.object().shape({
        email: yup
            .string()
            .email(errorMessages.email)
            .required(errorMessages.required),
        password: yup.string().required(errorMessages.required),
    });

    const initialState = {
        email: "",
        password: "",
    };

    const handleSubmit = () => { }


    return (
        <>
            <div className="py-10 px-5">
                <div className="flex flex-col items-center justify-center gap-1 ">
                    <p className="text-[19px] font-bold">Add new patient</p>
                    <p className="text-[13px] font-light">Enter patient information</p>
                    <hr className="w-full border-t border-[#B7B7B780] mt-3" />
                </div>

                <div className="mt-10">
                    <Formik<Values>
                        initialValues={initialState}
                        onSubmit={handleSubmit}
                        validationSchema={loginSchema}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <div className="grid grid-cols-1 gap-5">
                                    <div className="">
                                        <CustomInput
                                            label="Patient's name"
                                            id="name"
                                            name="name"
                                            placeholder="Enter patient's name "
                                            type="name"
                                        />
                                    </div>

                                    <div>
                                        <CustomSelect
                                            label="Gender"
                                            options={[{ text: "Male", value: "Male" }, { text: "Female", value: "Female" }]}
                                            placeholder="Select gender"
                                            name="gender"
                                            required
                                            value=''
                                            onChange={(e:any) => setFieldValue("gender", e.value)}
                                        />
                                    </div>

                                    <div className="">
                                        <CustomInput
                                            label="Date of birth"
                                            id="dob"
                                            name="dob"
                                            placeholder="Select date of birth"
                                            type="dob"
                                        />
                                    </div>

                                    <div className="">
                                        <CustomInput
                                            label="Contact info"
                                            id="info"
                                            name="info"
                                            placeholder="Email or Phone number "
                                            type="info"
                                        />
                                    </div>

                                    <div className="">
                                        <CustomInput
                                            label="Notes"
                                            id="note"
                                            name="note"
                                            placeholder="Mediacl history, allergies,irritable... etc "
                                            type="note"
                                        />
                                        <p className='flex justify-end text-[12px] mt-1'>13/150</p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <p>More details</p>
                                        <span><FaCaretDown color='white' /></span>
                                    </div>

                                    <div className="mt-[16px]">
                                        <CustomButton
                                            title='Save and continue'
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
            </div>
        </>
    )
}

export default AddPatient