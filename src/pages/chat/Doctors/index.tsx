import React, { useState } from 'react'
import { FaArrowLeft, FaCaretDown, FaPlus, FaRegStar } from 'react-icons/fa6'
import { IoSend } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../../../components/atoms/CustomButton'
import CustomSidBarModal from '../../../components/atoms/CustomSideBarModal'
import Logo from '../../../assets/arkmd-logo.png'
import { FiLogOut } from 'react-icons/fi'
import Bars from '../../../assets/SidebarIcon.png'
import User from '../../../assets/Usericon.png'
import Users from '../../../assets/Usersicon.png'



function Doctors() {

    const navigate = useNavigate();

    const [isChatOn, setIsChatOn] = useState(false);
    const [showPatients, setShowPatients] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);


    const allPatients = [
        { name: 'Joseph Adebola (M)', value: 'joseph' },
        { name: 'Deborah Williams  (F)', value: 'deborah' },
    ]

    return (
        <>
            <div className="p-5 h-screen flex flex-col relative bg-[#0A0A0A]">

                <div className="relative">
                    <div className="text-[#FFDE59] flex items-center justify-between">
                        <span
                            className='cursor-pointer'
                            onClick={() => setShowSideBar(true)}
                        >
                            <div className="h-[8px] w-[15px] overflow-hidden">
                                <img
                                    src={Bars}
                                    alt="icon"
                                    className='h-full w-full object-cover'
                                />
                            </div>
                        </span>
                        <div className="flex items-center gap-2">
                            <div>
                                <CustomButton
                                    title={
                                        <div className="flex items-center gap-1">
                                            <span>Patients</span>
                                            <FaCaretDown />
                                        </div>
                                    }
                                    type='button'
                                    handleClick={() => { setShowPatients(true) }}
                                    className='!w-full !h-[25px] px-3 !text-[12px] !bg-[#ABD9F60D] !text-[#FFDE59] !border !border-[#E4E4E759] font-extralight'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {
                    isChatOn ?
                        <div className="mt-10 space-y-4 text-[14px]">
                            <div className="flex justify-start">

                                <div className="p-2 bg-[#121416] rounded-lg text-white max-w-[300px]">
                                    <p>What can I ask you?</p>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <div className="p-2 bg-white rounded-lg text-black max-w-[300px]">
                                    <p>Lorem ipsum dolor sit amet consectetur. Sit nibh dui orci eget odio arcu duis. Venenatis aenean nisl pharetra erat lorem tincidunt sit tincidunt consectetur. Aliquam neque nec interdum ut sagittis ectus phasellus auctor et mauris condimentum ut volutpat. Suscipit ele enim aliquam lorem. Elit et sit non in libero nibh sem molestie. </p>
                                </div>
                            </div>
                        </div> :
                        <div className="flex-1 mt-24 flex flex-col">
                            <div className="text-[28px]">
                                <p className="font-semibold">Hello Dr. Mike,</p>
                                <p className="font-extralight text-[#C5C5C5]">How are you feeling</p>
                                <p className="font-extralight text-[#C5C5C5]">today?</p>
                            </div>

                            <div className="flex flex-col justify-between items-center font-extralight text-[12px] text-[#7E7E7E] mt-[80px]">
                                <p>arkMD doesn't replace doctors, it co-pilots</p>
                                <p>with them save lives.</p>
                            </div>
                        </div>
                }

                <div
                    className={`flex items-center gap-2 mt-5 bottom-0 ${isChatOn ? 'fixed w-full left-0 px-5' : ''}`}
                >
                    <div className="h-[50px] w-[50px] rounded-full bg-[#121416] flex items-center justify-center cursor-pointer">
                        <FaPlus color="#FFDE59" size={12} />
                    </div>

                    <div className="relative flex-1">
                        <textarea
                            name="chat"
                            id="chat"
                            placeholder="Talk to me..."
                            className="bg-[#121416] w-full rounded-full pl-4 pr-12 resize-none text-white placeholder-[#B7B7B780] placeholder:text-[14px] pt-3 min-h-[50px] max-h-[120px] overflow-y-auto leading-[20px] overflow-hidden"
                        ></textarea>

                        <div
                            className="absolute top-2 right-3 h-[35px] w-[35px] rounded-full bg-[#FFDE59] flex items-center justify-center cursor-pointer"
                            onClick={() => setIsChatOn(true)}
                        >
                            <IoSend color="#121416" />
                        </div>
                    </div>
                </div>

            </div>

            <CustomSidBarModal
                visibility={showPatients}
                toggleVisibility={setShowPatients}
                sideClassName='mt-12 p-4'
                cardClassName='overflow-y-scroll'
            >
                <div className="flex justify-end">
                    <div className="">
                        <div className="grid grid-cols ">
                            <div className="py-2 bg-gray-900 rounded-t-md pl-2">
                                <p>Patient List</p>
                            </div>
                            <div className="bg-[#000000]  flex flex-col pt-2 pl-2 text-[14px] pb-3 gap-3">
                                {
                                    allPatients.map(({ name }, index) => (
                                        <p key={index}>{name}</p>
                                    ))
                                }
                            </div>
                            <div
                                className="flex items-center bg-[#FFDE59] text-black rounded-b-md px-5 py-2 gap-2 font-semibold cursor-pointer "
                                onClick={() => navigate('/add-patient')}
                            >
                                <p className=''>Add new patient </p>
                                <span><FaPlus size={15} color='black' /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </CustomSidBarModal>

            <CustomSidBarModal
                visibility={showSideBar}
                toggleVisibility={setShowSideBar}
                sideClassName='justify-start h-full'
            >
                <div className=" flex flex-col justify-between h-full px-4">
                    <div className="grid grid-cols-1 gap-2 w-[220px]">
                        <div className="flex items-center justify-between w-[250px] bg-black mt-10 rounded-full  pr-2 mb-8">
                            <div className="w-[60px] h-[52px] overflow-hidden">
                                <img src={Logo} alt="logo" className='h-full w-full object-cover' />
                            </div>
                            <span
                                className='cursor-pointer'
                                onClick={() => setShowSideBar(false)}
                            >
                                <FaArrowLeft size={15} />
                            </span>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div
                                className="flex gap-2 items-center cursor-pointer"
                                onClick={() => { navigate('/manage-patient') }}
                            >
                                <div className="h-[20px] w-20px] overflow-hidden">
                                    <img
                                        src={Users}
                                        alt="icon"
                                        className='h-full w-full object-cover'
                                    />
                                </div>
                                <p>Manage patience</p>
                            </div>
                            <div
                                className="flex gap-2 items-center cursor-pointer"
                                onClick={() => { navigate('/price') }}
                            >
                                <span><FaRegStar color='#FFDE59' /></span>
                                <p>Upgrade plan</p>
                            </div>
                            <div
                                className="flex gap-2 items-center cursor-pointer"
                                onClick={() => { navigate('/change-password') }}
                            >
                                <div className="h-[20px] w-20px] overflow-hidden">
                                    <img
                                        src={User}
                                        alt="icon"
                                        className='h-full w-full object-cover'
                                    />
                                </div>
                                <p>Change password</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mb-10 justify-center text-[#F63D4A]">
                        <p>Log out </p>
                        <span><FiLogOut /></span>
                    </div>
                </div>
            </CustomSidBarModal>

        </>
    )
}

export default Doctors