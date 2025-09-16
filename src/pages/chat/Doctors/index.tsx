import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeft, FaCaretDown, FaPlus, FaRegStar, FaXmark } from 'react-icons/fa6'
import { IoSend } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../../../components/atoms/CustomButton'
import CustomSidBarModal from '../../../components/atoms/CustomSideBarModal'
import Logo from '../../../assets/arkmd-logo.png'
import { FiLogOut } from 'react-icons/fi'
import Bars from '../../../assets/SidebarIcon.png'
import User from '../../../assets/Usericon.png'
import Users from '../../../assets/Usersicon.png'
import { generateSessionId, getChatLimit, getPatientChatById, getPatients, handleChatPrompt } from '../../../api/chat'
import ReactMarkdown from 'react-markdown';
import { useRecoilState, useRecoilValue } from 'recoil'
import { getLoggedUserAtom } from '../../../recoil/atom/auth'
import { getChatSessionIdAtom, getCurrentChatHistoryAtom, getCurrentPatientAtom } from '../../../recoil/atom/chat'



function Doctors() {

    const navigate = useNavigate();

    const patientId = localStorage.getItem("patient_id");
    const savedId = localStorage.getItem("session_id");

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isChatLoading, setIsChatLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);
    const [chat, setChat] = useState<any>('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [patients, setPatients] = useState<any>([]);
    const [limitReached, setLimitReached] = useState(false);

    const getLoggedUserValue = useRecoilValue(getLoggedUserAtom);

    const [, setChatHistoryAtom] = useRecoilState(getCurrentChatHistoryAtom);
    const getChatHistoryValue = useRecoilValue(getCurrentChatHistoryAtom);

    const [, setChatSessionAtom] = useRecoilState(getChatSessionIdAtom);
    const getChatSessionIdValue = useRecoilValue(getChatSessionIdAtom);

    const [, setPatientAtom] = useRecoilState(getCurrentPatientAtom);
    const getPatientValue = useRecoilValue(getCurrentPatientAtom);


    const secureUrl = (url: string) => {
        if (url !== null) {
            const newUrl = url.replace(/^http:\/\//, "https://");
            return newUrl;
        } else {
            return
        }
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedFile(file);
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    }

    const HandleChatLimit = () => {
        getChatLimit().then((res) => {
            if (res?.success) {
                const limit = res.data;
                if (limit?.freeMessagesCount == limit?.usageLimit) {
                    setLimitReached(true);
                } else {
                    return;
                }
            }
        });
    };

    const generateId = () => {
        setIsLoading(true);
        generateSessionId().then((res) => {
            if (res?.success) {
                setChatSessionAtom(res.data);
                localStorage.setItem("session_id", res.data);
                setIsLoading(false);
            }
        });
    };

    const fetchAllPatients = () => {
        getPatients().then((res) => {
            if (res?.success) {
                setPatients(res.data)
            }
        });
    }

    const handlePatientChat = (id: any) => {
        setIsLoading(true);
        getPatientChatById(id).then((res) => {
            if (res?.success) {
                localStorage.setItem("patient_id", id);
                setShowHistory(false)
                setChatHistoryAtom(res.data);
                setIsLoading(false);
            }
        });
    }

    const handleChat = (prompt: any) => {
        if (patientId && getPatientValue && chat !== '') {
            HandleChatLimit();
            setIsChatLoading(true);
            const formData = new FormData();
            formData.append("session_id", getChatSessionIdValue);
            formData.append("prompt", prompt);
            formData.append("patient_id", patientId || '');
            if (selectedFile) {
                formData.append("image", selectedFile);
            }
            handleChatPrompt(formData).then((res) => {
                if (res?.success) {
                    setChat('');
                    setSelectedFile(null)
                    handlePatientChat(patientId);
                }
                setIsChatLoading(false);
            });
        } else {
            return;
        }
    };

    const logOut = () => {
        localStorage.removeItem("token");
        navigate('/login')
    }

    useEffect(() => {
        if (savedId) {
            setChatSessionAtom(savedId);
        } else {
            generateId();
        }
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [getChatHistoryValue, isChatLoading]);

    useEffect(() => {
        fetchAllPatients();
        HandleChatLimit();
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
            <div className="p-5 h-screen flex flex-col relative bg-[#0A0A0A]">

                <div className="relative">
                    <div className="text-[#FFDE59] flex items-center justify-between pb-5">
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
                            {
                                patients?.length !== 0 ?
                                    <div>
                                        <CustomButton
                                            title={
                                                <div className="flex items-center gap-1">
                                                    <span>{getPatientValue !== '' ? getPatientValue : 'Patients'}</span>
                                                    <FaCaretDown />
                                                </div>
                                            }
                                            type='button'
                                            handleClick={() => { setShowHistory(true) }}
                                            className='!w-full !h-[25px] px-3 !text-[12px] !bg-[#ABD9F60D] !text-[#FFDE59] !border !border-[#E4E4E759] font-extralight'
                                        />
                                    </div> :
                                    <div>
                                        <CustomButton
                                            title={
                                                <div className="flex items-center gap-1">
                                                    <span>Add patient</span>
                                                    <FaPlus size={12} />
                                                </div>
                                            }
                                            type='button'
                                            handleClick={() => navigate('/add-patient')}
                                            className='!w-full !h-[25px] px-3 !text-[12px] !bg-[#ABD9F60D] !text-[#FFDE59] !border !border-[#E4E4E759] font-extralight'
                                        />
                                    </div>
                            }
                        </div>
                    </div>
                </div>

                {
                    getChatHistoryValue?.length !== 0 ?
                        <div
                            className="flex-1 overflow-y-auto pb-32 show-scrollbar"
                        >
                            {
                                getChatHistoryValue.map(({ imageUrl, userPrompt, assistantResponse }: any, index: any) => (
                                    <div
                                        key={index}
                                        className="mt-10 space-y-4 text-[14px]"
                                        ref={messagesEndRef}
                                    >
                                        <div className="flex justify-end">
                                            <div className="p-2 bg-[#121416] rounded-lg text-white max-w-[300px]">
                                                {
                                                    imageUrl !== null && (
                                                        <div className="h-[120px] w-[160px] overflow-hidden rounded-lg mb-2">
                                                            <img
                                                                src={secureUrl(imageUrl)}
                                                                alt="img"
                                                                className='h-full w-full object-cover'
                                                            />
                                                        </div>
                                                    )
                                                }
                                                <p>{userPrompt}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-start">
                                            <div className="p-2 bg-white rounded-lg text-black max-w-[300px]">
                                                <ReactMarkdown>{String(assistantResponse)}</ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            {
                                isChatLoading &&
                                <div className="mt-5 flex space-x-1">
                                    <span className="h-1.5 w-1.5 bg-[#FFDE59] rounded-full animate-bounce"></span>
                                    <span className="h-1.5 w-1.5 bg-[#FFDE59] rounded-full animate-bounce [animation-delay:100ms]"></span>
                                    <span className="h-1.5 w-1.5 bg-[#FFDE59] rounded-full animate-bounce [animation-delay:200ms]"></span>
                                </div>
                            }
                        </div >
                        :
                        <div className="flex-1 mt-24 flex flex-col">
                            <div className="text-[28px]">
                                <p className="font-semibold">Hello Dr. {getLoggedUserValue?.firstName},</p>
                                <p className="font-extralight text-[#C5C5C5]">How are you feeling</p>
                                <p className="font-extralight text-[#C5C5C5]">today?</p>
                            </div>

                            <div className="flex flex-col justify-between items-center font-extralight text-[12px] text-[#7E7E7E] mt-[80px]">
                                <p>arkMD doesn't replace doctors, it co-pilots</p>
                                <p>with them save lives.</p>
                            </div>
                        </div>
                }

                {
                    patients?.length !== 0 && (
                        <div className="flex items-center gap-2 mt-5 bottom-0 fixed w-full left-0 px-5 pb-2">
                            {limitReached && (
                                <div className="text-red-600 mb-2 absolute bottom-16 right-8"><p>free limit reached </p></div>
                            )}
                            {
                                selectedFile !== null && (
                                    <div className="h-[100px] w-[100px] overflow-hidden absolute bottom-24 rounded-lg ">
                                        <div className="flex justify-end mb-2">
                                            <span
                                                className='cursor-pointer'
                                                onClick={() => { setSelectedFile(null) }}
                                            >
                                                <FaXmark color='#FFDE59' size={14} />
                                            </span>
                                        </div>
                                        <img
                                            src={previewImage}
                                            alt="preview"
                                            className='w-full h-full object-cover rounded-lg'
                                        />
                                    </div>
                                )
                            }
                            <div
                                className="h-[50px] w-[50px] rounded-full bg-[#121416] flex items-center justify-center cursor-pointer mb-2"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <FaPlus color="#FFDE59" size={12} />
                                <input
                                    type="file"
                                    accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.csv,.ppt,.pptx,.zip,.rar,.mp3,.wav"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                            <div className="relative flex-1">
                                <textarea
                                    name="chat"
                                    id="chat"
                                    value={chat}
                                    onChange={(e) => setChat(e.target.value)}
                                    placeholder="Talk to me..."
                                    className="bg-[#121416] w-full rounded-full pl-4 pr-12 resize-none text-white placeholder-[#B7B7B780] placeholder:text-[14px] pt-5 min-h-[50px] max-h-[120px] overflow-y-auto leading-[20px]"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleChat(chat);
                                        }
                                    }}
                                />
                                {
                                    !isChatLoading && !limitReached ?
                                        <div
                                            className="absolute top-3 right-3 h-[35px] w-[35px] rounded-full bg-[#FFDE59] flex items-center justify-center cursor-pointer"
                                        >

                                            <span onClick={() => handleChat(chat)} ><IoSend color="#121416" /></span>

                                        </div> : ''
                                }
                            </div>

                        </div>)}

            </div>

            <CustomSidBarModal
                visibility={showHistory}
                toggleVisibility={setShowHistory}
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
                                    patients?.length !== 0 && (
                                        patients.map(({ name, id }: any, index: any) => (
                                            <p
                                                key={index}
                                                className='cursor-pointer'
                                                onClick={() => {
                                                    handlePatientChat(id);
                                                    setPatientAtom(name);
                                                }}
                                            >
                                                {name}
                                            </p>
                                        ))
                                    )
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
                    <div className="flex items-center mb-10 justify-center text-[#F63D4A]">
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
            </CustomSidBarModal>

        </>
    )
}

export default Doctors