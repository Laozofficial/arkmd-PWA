import { Formik, Form } from 'formik';
import React, { useState } from 'react'
import * as yup from "yup";
import { errorMessages } from '../../../components/shared';
import CustomInput from '../../../components/atoms/CustomInput';
import CustomButton from '../../../components/atoms/CustomButton';
import { useNavigate } from 'react-router-dom';
import CustomSelect from '../../../components/atoms/CustomSelect';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6';
import { createNewPatient } from '../../../api/chat';


function AddPatient() {

    const Navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    interface Values {
        name: string;
        email: string;
        weight: string;
        height: string;
        gender: string;
        medical_history: string;
        age: string;
    }

    const patientSchema = yup.object().shape({
        name: yup.string().required(errorMessages.required),
        age: yup.string().required(errorMessages.required),
    });

    const initialState: Values = {
        name: "",
        email: "",
        weight: "",
        height: "",
        gender: "",
        medical_history: "",
        age: "",
    };


    const handleSubmit = (values: any) => {

        const payload = {
            name: values.name,
            email: values.email,
            weight: values.weight,
            height: values.height,
            gender: values.gender,
            medical_history: values.medical_history,
            age: values.age
        }

        setIsLoading(true);
        createNewPatient(payload).then((res) => {
            if (res?.success) {
                setIsLoading(false);
                Navigate('/doctor');
            }
        });

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
            <div className="py-10 px-5 ">
                <div className="flex flex-col items-center justify-center gap-1 ">
                    <p className="text-[19px] font-bold">Add new patient</p>
                    <p className="text-[13px] font-light">Enter patient information</p>
                    <hr className="w-full border-t border-[#B7B7B780] mt-3" />
                </div>

                <div className="mt-10 ">
                    <Formik<Values>
                        initialValues={initialState}
                        onSubmit={(values) => handleSubmit(values)}
                        validationSchema={patientSchema}
                    >
                        {({ setFieldValue, values }) => (
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
                                            options={[{ text: "Male", value: "M" }, { text: "Female", value: "F" }]}
                                            placeholder="Select gender"
                                            name="gender"
                                            required
                                            value=''
                                            onChange={(e: any) => setFieldValue("gender", e.value)}
                                        />
                                    </div>

                                    <div className="">
                                        <CustomInput
                                            label="Age"
                                            id="age"
                                            name="age"
                                            placeholder="Enter age"
                                            type="number"
                                        />
                                    </div>

                                    <div className="">
                                        <CustomInput
                                            label="Email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter email  "
                                            type="email"
                                        />
                                    </div>

                                    <div className="">
                                        <CustomInput
                                            label="Notes"
                                            id="medical_history"
                                            name="medical_history"
                                            placeholder="Mediacl history, allergies,irritable... etc "
                                            type="text"
                                            maxLength={150}
                                        />
                                        <p
                                            className={`flex justify-end text-[12px] mt-1 ${values.medical_history.length === 150 && 'text-red-800'}`}
                                        >
                                            {(values.medical_history || "").length}/150
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <p>More details</p>
                                        <span
                                            onClick={() => setShowMore(!showMore)}
                                        >
                                            {
                                                showMore ? <FaCaretUp color='white' /> : <FaCaretDown color='white' />
                                            }
                                        </span>
                                    </div>

                                    {
                                        showMore && (
                                            <div className="grid grid-cols-1 gap-5">
                                                <div className="">
                                                    <CustomInput
                                                        label="Height"
                                                        id="height"
                                                        name="height"
                                                        placeholder="Enter height"
                                                        type="text"
                                                    />
                                                </div>

                                                <div className="">
                                                    <CustomInput
                                                        label="Weight"
                                                        id="weight"
                                                        name="weight"
                                                        placeholder="Enter weight"
                                                        type="number"
                                                    />
                                                </div>
                                            </div>
                                        )
                                    }

                                    <div className="mt-[16px]">
                                        <CustomButton
                                            title='Save and continue'
                                            type='submit'
                                            handleClick={() => { }}
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