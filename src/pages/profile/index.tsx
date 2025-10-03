import React, { useEffect, useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import CustomButton from '../../components/atoms/CustomButton'
import { LuMail } from 'react-icons/lu'
import Crown from '../../assets/crown.png'
import { getUserAtom } from '../../recoil/atom/auth'
import { useRecoilState, useRecoilValue } from 'recoil'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { getCurrentChatHistoryAtom } from '../../recoil/atom/chat'
import { getProfile } from '../../api/auth'
import CustomLoader from '../../components/atoms/CustomLoader'

function Profile() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [, setChatHistoryAtom] = useRecoilState(getCurrentChatHistoryAtom);

    const [, setUserProfileAtom] = useRecoilState(getUserAtom);
    const getUserProfileAtomValue = useRecoilValue(getUserAtom);



    const getUser = () => {
        setIsLoading(true);
        getProfile().then((res) => {
            if (res?.success) {
                setUserProfileAtom(res.data);
                setIsLoading(false);
            }
        });
    }

    const logOut = () => {
        localStorage.clear();
        setChatHistoryAtom([]);
        navigate('/login');
    };



    useEffect(() => {
        getUser();
    }, [])

    if (isLoading) {
        return (
            <CustomLoader />
        )
    }



    return (
        <>
            <div className="py-8 px-5 h-screen relative ">
                <div className="flex flex-col items-center justify-center gap-1 relative ">
                    <div className="flex items-center">
                        <div
                            className="absolute top-3 left-0 cursor-pointer"
                            onClick={() => window.history.back()}
                        >
                            <IoArrowBackOutline />
                        </div>
                        <p className="text-[19px] font-bold">My profile</p>
                    </div>
                    <hr className="w-full border-t border-[#B7B7B780] mt-10" />
                </div>

                <div className="flex flex-col items-center justify-center gap-4 mt-10">

                    {
                        getUserProfileAtomValue?.avatar !== null ?
                            <div className="h-[80px] w-[80px] overflow-hidden rounded-full">
                                <img
                                    src={getUserProfileAtomValue?.avatar}
                                    alt="plan"
                                    className='h-full w-full object-cover'
                                />
                            </div>
                            :
                            <div className="h-[80px] w-[80px] rounded-full bg-[#ABD9F60D] text-[#FFDE59]  flex items-center justify-center text-3xl gap-1">
                                <p>{getUserProfileAtomValue?.firstName.charAt(0).toUpperCase() || '--'}</p>
                                <p>{getUserProfileAtomValue?.lastName.charAt(0).toUpperCase() || '--'}</p>
                            </div>
                    }

                    <div className="text-[#C5C5C5] font-normal flex flex-col items-center">
                        <p className='!text-white'>{getUserProfileAtomValue?.firstName} {getUserProfileAtomValue?.lastName}</p>
                        <p>{getUserProfileAtomValue?.gender || '--'}</p>
                        <p>{getUserProfileAtomValue?.age || '--'}</p>
                    </div>

                    <div className="">
                        <CustomButton
                            title='Edit profile'
                            className='!bg-transparent !text-[#39F45F] !font-normal !w-fit'
                            handleClick={() => { navigate('/edit-profile') }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-20">
                    <div className="flex items-center justify-between h-[50px] w-full px-3 bg-[#121212] rounded">
                        <div className="flex items-center gap-2">
                            <div className="h-[20px] w-[20px] overflow-hidden">
                                <img
                                    src={Crown}
                                    alt="plan"
                                    className='h-full w-full object-cover'
                                />
                            </div>
                            <p className='text-[#C5C5C5]'>Starter plan</p>
                        </div>
                        <CustomButton
                            title='Upgrade'
                            className='!bg-transparent !text-[#39F45F] !font-normal !w-fit'
                            handleClick={() => { navigate('/price') }}
                        />
                    </div>
                    <div className="flex items-center justify-between h-[50px] w-full px-3 bg-[#121212] text-[#C5C5C5] rounded">
                        <div className="flex items-center gap-2">
                            <span><LuMail color='#FFDE59' size={18} /></span>
                            <p className='text-[#C5C5C5]' >{getUserProfileAtomValue?.email || '--'}</p>
                        </div>
                        <CustomButton
                            title='Change mail'
                            className='!bg-transparent !text-[#39F45F] !font-normal !w-fit'
                            handleClick={() => { }}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="flex items-center justify-center text-[#F63D4A] absolute bottom-6">
                        <div
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={logOut}
                        >
                            <p>Log out</p>
                            <span>
                                <FiLogOut />
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Profile
