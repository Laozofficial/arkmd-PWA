import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../api/auth';
import CustomLoader from '../../components/atoms/CustomLoader';
import CustomButton from '../../components/atoms/CustomButton';
import CustomInput from '../../components/atoms/CustomInput';
import { Form, Formik } from 'formik';
import CustomSelect from '../../components/atoms/CustomSelect';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useRecoilValue } from 'recoil';
import { getUserAtom } from '../../recoil/atom/auth';
import { BiSolidImageAdd } from 'react-icons/bi';
import { Country } from 'country-state-city';



function EditProfile() {

    const Navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    const getUserProfileAtomValue = useRecoilValue(getUserAtom);

    const countries = Country.getAllCountries().map((country) => ({
        text: country.name,
        value: country.isoCode,
    }));

    const initialState = {
        first_name: getUserProfileAtomValue.firstName || "",
        last_name: getUserProfileAtomValue.lastName || "",
        gender: getUserProfileAtomValue.gender || "",
        age: getUserProfileAtomValue.age || "",
        phone: getUserProfileAtomValue.phoneNumber || "",
        country: getUserProfileAtomValue.country || "",
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    }

    const handleSubmit = (values: any) => {

        const formData = new FormData();

        formData.append("first_name", values.first_name);
        formData.append("last_name", values.last_name);
        formData.append("gender", values.gender);
        formData.append("age", String(values.age));
        formData.append("phone_number", values.phone);
        formData.append("country", values.country);

        if (selectedFile) {
            formData.append("avatar", selectedFile);
        }

        setIsLoading(true);

        updateProfile(formData)
            .then((res) => {
                if (res?.success) {
                    Navigate('/profile');
                }
            })
            .catch(() => {
                setIsLoading(false);
                return;
            })
    };



    if (isLoading) {
        return (
            <CustomLoader />
        )
    }


    return (
        <>
            <div className="py-5 px-5 overflow-y-scroll h-screen  ">
                <div className="flex flex-col items-center justify-center gap-1 relative">
                    <div
                        className="absolute top-2 left-0 cursor-pointer"
                        onClick={() => window.history.back()}
                    >
                        <IoArrowBackOutline />
                    </div>
                    <p className="text-[19px] font-bold">Edit profile</p>
                    <hr className="w-full border-t border-[#B7B7B780] mt-3" />
                </div>

                <div className="mt-10 ">
                    <Formik
                        initialValues={initialState}
                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ setFieldValue, values }) => (
                            <Form>
                                <div className="grid grid-cols-1 gap-5">

                                    {
                                        getUserProfileAtomValue?.avatar !== null || previewImage ?
                                            (
                                                <div className="flex justify-center relative">
                                                    <label
                                                        htmlFor="avatar"
                                                        className="absolute h-[100px] w-[100px] rounded-full bg-black/70 flex justify-center items-center flex-col cursor-pointer text-[#FFDE59]"
                                                    >
                                                        <BiSolidImageAdd />
                                                        <p className="text-[10px]">Change image</p>
                                                    </label>

                                                    <div className="h-[100px] w-[100px] overflow-hidden rounded-full">
                                                        {
                                                            previewImage ?
                                                                <img
                                                                    src={previewImage}
                                                                    alt="plan"
                                                                    className="h-full w-full object-cover"
                                                                /> :
                                                                <img
                                                                    src={getUserProfileAtomValue?.avatar}
                                                                    alt="plan"
                                                                    className="h-full w-full object-cover"
                                                                />
                                                        }
                                                    </div>

                                                    <input
                                                        type="file"
                                                        name="avatar"
                                                        id="avatar"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                    />
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="flex justify-center mb-3">
                                                    <label
                                                        htmlFor="avatar"
                                                        className="h-[100px] w-[100px] rounded-full bg-[#ABD9F60D] text-[#FFDE59] flex flex-col items-center justify-center text-3xl gap-1 cursor-pointer"
                                                    >
                                                        <BiSolidImageAdd />
                                                        <p className='text-[10px]'>Add image</p>
                                                    </label>

                                                    <input
                                                        type="file"
                                                        name="avatar"
                                                        id="avatar"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={handleFileChange}
                                                    />
                                                    {
                                                        previewImage && (
                                                            <div className="h-[100px] w-[100px] overflow-hidden rounded-full">
                                                                <img
                                                                    src={previewImage}
                                                                    alt="plan"
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            )
                                    }

                                    <div className="">
                                        <CustomInput
                                            label="First name"
                                            id="first_name"
                                            name="first_name"
                                            placeholder="Enter first name "
                                            type="text"
                                        />
                                    </div>

                                    <div className="">
                                        <CustomInput
                                            label="Last name"
                                            id="last_name"
                                            name="last_name"
                                            placeholder="Enter last name "
                                            type="text"
                                        />
                                    </div>

                                    <div className="">
                                        <CustomInput
                                            label="Phone"
                                            id="phone"
                                            name="phone"
                                            placeholder="Enter phone"
                                            type="number"
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

                                    <div>
                                        <CustomSelect
                                            label="Gender"
                                            options={[{ text: "Male", value: "Male" }, { text: "Female", value: "Female" }]}
                                            placeholder="Select gender"
                                            name="gender"
                                            required
                                            value={getUserProfileAtomValue.gender || values.gender}
                                            onChange={(e: any) => setFieldValue("gender", e.value)}
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

export default EditProfile