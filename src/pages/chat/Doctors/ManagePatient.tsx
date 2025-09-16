import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import CustomButton from "../../../components/atoms/CustomButton";
import CustomModal from "../../../components/atoms/CustomModal";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { getPatients, removePatientById } from "../../../api/chat";

function ManagePatient() {

    const [selectedPatient, setSelectedPatient] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [patients, setPatients] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);



    const fetchAllPatients = () => {
        setIsLoading(true);
        getPatients().then((res) => {
            if (res?.success) {
                setPatients(res.data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });
    }

    const removePatient = (id: any) => {
        setOpenDelete(false);
        setIsLoading(true);
        removePatientById({ patient_id: id }).then((res) => {
            if (res?.success) {
                fetchAllPatients();
            } else {
                setIsLoading(false);
            }
        });
    }


    useEffect(() => {
        fetchAllPatients();
    }, [])




    if (isLoading) {
        return (
            <div className="h-[100vh] flex items-center justify-center">
                <p>Loading....</p>
            </div>
        )
    }




    return (
        <>
            <div className="py-8 px-5 w-full">

                <div className="flex flex-col items-center justify-center gap-1 relative">
                    <div
                        className="absolute top-5 left-0 cursor-pointer"
                        onClick={() => window.history.back()}
                    >
                        <IoArrowBackOutline />
                    </div>
                    <p className="text-[19px] font-bold">Manage patients</p>
                    <p className="text-[13px] font-light">
                        Select patient to remove from list
                    </p>
                    <hr className="w-full border-t border-[#B7B7B780] mt-3" />
                </div>

                <div className="w-full">
                    <div className="mt-3 flex flex-col gap-5">
                        {patients && patients.length > 0 ? (
                            patients.map((patient: any, index: any) => (
                                <div
                                    key={patient.id}
                                    className={`flex items-center gap-3 rounded-xl border pl-2 py-2 w-full cursor-pointer 
                                     ${selectedPatient === patient.id ? "border-yellow-400 bg-[#2E291666]" : "border-[#FFDE5933]"}`}
                                >
                                    <input
                                        type="radio"
                                        name="patient"
                                        id={`patient-${index}`}
                                        value={patient.id}
                                        checked={selectedPatient === patient.id}
                                        onChange={(e) => setSelectedPatient(e.target.value)}
                                        className="w-4 h-4 accent-yellow-500"
                                    />
                                    <div>
                                        <p className="text-[16px]">{patient.name}</p>
                                        <div className="flex items-center gap-2">
                                            <p className="text-[12px] font-light text-[#E4E4E7]">
                                                {patient.gender}
                                            </p>
                                            <div className="h-[4px] w-[4px] rounded-full bg-[#FFDE59]"></div>
                                            <p className="text-[12px] font-light italic text-[#E4E4E7]">
                                                {patient.age} years old
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No patients</div>
                        )}
                    </div>

                    <div className="mt-[16px] absolute bottom-8 w-full left-0 px-5">
                        <CustomButton
                            title='Remove patient'
                            type='button'
                            handleClick={() => { setOpenDelete(true) }}
                            className={`!w-full !bg-[#F63D4A] !text-white disabled:!bg-[#F63D4A12] disabled:!text-[#F63D4A]`}
                            isDisabled={selectedPatient == ''}
                        />
                    </div>
                </div>
            </div>

            <CustomModal
                visibility={openDelete}
                toggleVisibility={setOpenDelete}
                cardClassName="!w-[300px]"
            >
                <div className="flex flex-col items-center py-12 gap-10">
                    <div className="flex flex-col items-center gap-2">
                        <div className="mb-2">
                            <HiOutlineExclamationCircle color="#F63D4A" size={30} />
                        </div>
                        <p className="font-bold">Remove Patient1</p>
                        <div className="flex flex-col items-center text-[14px] font-extralight">
                            <p>Removing this patient will erase all chat</p>
                            <p>history and saved data</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <CustomButton
                            title='Cancel'
                            type='button'
                            handleClick={() => { setOpenDelete(false) }}
                            className='!w-[80px] !h-[30px] !text-[12px] border border-white !bg-transparent !text-white'
                        />
                        <CustomButton
                            title='Proceed'
                            type='button'
                            handleClick={() => removePatient(selectedPatient)}
                            className='!w-[80px] !h-[30px] !text-[12px] !bg-[#F63D4A] !text-white'
                        />
                    </div>
                </div>
            </CustomModal>
        </>


    );
}

export default ManagePatient;
