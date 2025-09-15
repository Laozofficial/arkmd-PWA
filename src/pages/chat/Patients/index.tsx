import React, { useEffect, useRef, useState } from 'react'
import CustomButton from '../../../components/atoms/CustomButton'
import { FaArrowLeft, FaCaretDown, FaPlus, FaRegStar, FaStop, FaXmark } from 'react-icons/fa6'
import { IoSend } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import CustomSidBarModal from '../../../components/atoms/CustomSideBarModal'
import Bars from '../../../assets/SidebarIcon.png'
import New from '../../../assets/edit.png'
import { FiLogOut } from 'react-icons/fi'
import User from '../../../assets/Usericon.png'
import Logo from '../../../assets/arkmd-logo.png'
import { generateSessionId, getChatHistoryById, getChatLimit, getChatSummary, handleChatPrompt } from '../../../api/chat'
import ReactMarkdown from 'react-markdown';



function Patients() {

    const navigate = useNavigate();

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isChatLoading, setIsChatLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [chat, setChat] = useState<any>('');
    const [chatHistory, setChatHistory] = useState<any>([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [chatSummary, setChatSummary] = useState<any>([]);
    const [limitReached, setLimitReached] = useState(false);


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

    const HandleChatSummary = () => {
        getChatSummary().then((res) => {
            if (res?.success) {
                setChatSummary(res.data)
            }
        });
    }

    const generateId = () => {
        setIsLoading(true);
        generateSessionId().then((res) => {
            if (res?.success) {
                setSessionId(res.data);
                localStorage.setItem("session_id", res.data);
                setIsLoading(false);
            }
        });
    };

    const getChatHistory = () => {
        setIsChatLoading(true);
        getChatHistoryById(sessionId).then((res) => {
            if (res?.success) {
                setChatHistory(res.data);
                setIsChatLoading(false);
            }
        });
    }

    const handleChat = (prompt: any) => {
        HandleChatLimit();
        setIsChatLoading(true);
        const formData = new FormData();
        formData.append("session_id", sessionId);
        formData.append("prompt", prompt);
        formData.append("patient_id", "");
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        handleChatPrompt(formData).then((res) => {
            if (res?.success) {
                setChat('');
                setSelectedFile(null)
                getChatHistory();
            }
            setIsChatLoading(false);
        });
    };

    const newChat = () => {
        generateId();
        setChatHistory([]);
    }

    const fetchChatHistory = (id: any) => {
        setIsLoading(true);
        getChatHistoryById(id).then((res) => {
            if (res?.success) {
                setShowHistory(false)
                setChatHistory(res.data);
                HandleChatLimit();
                setIsLoading(false);
            }
        });
    }

    const logOut = () => {
        localStorage.removeItem("token");
        navigate('/login')
    }

    useEffect(() => {
        const savedId = localStorage.getItem("session_id");
        if (savedId) {
            setSessionId(savedId);
        } else {
            generateId();
        }
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [chatHistory, isChatLoading]);

    useEffect(() => {
        HandleChatSummary();
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
            <div className="p-5 h-screen flex flex-col relative">

                <div className="relative">
                    <div className="text-[#FFDE59] flex items-center justify-between">
                        <span
                            className='cursor-pointer'
                            onClick={() => setShowSideBar(true)}>
                            <div className="h-[8px] w-[15px] overflow-hidden">
                                <img
                                    src={Bars}
                                    alt="icon"
                                    className='h-full w-full object-cover'
                                />
                            </div>
                        </span>
                        <div className="flex items-center gap-2">
                            <div
                                className="h-[16px] w-[16px] overflow-hidden cursor-pointer"
                                onClick={newChat}
                            >
                                <img
                                    src={New}
                                    alt="icon"
                                    className='h-full w-full object-cover'
                                />
                            </div>
                            <div>
                                <CustomButton
                                    title={
                                        <div className="flex items-center gap-1">
                                            <span>Chat history</span>
                                            <FaCaretDown />
                                        </div>
                                    }
                                    type='button'
                                    handleClick={() => { setShowHistory(!showHistory) }}
                                    className='!w-full !h-[25px] px-3 !text-[12px] !bg-[#ABD9F60D] !text-[#FFDE59] !border !border-[#E4E4E759] font-extralight'
                                // isDisabled
                                />
                            </div>
                        </div>
                    </div>

                </div>
                {
                    chatHistory?.length !== 0 ?
                        <div
                            className="flex-1 overflow-y-auto pb-32 show-scrollbar"
                        >
                            {
                                chatHistory.map(({ imageUrl, userPrompt, assistantResponse }: any, index: any) => (
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
                                <p className="font-semibold">Hello Josh,</p>
                                <p className="font-extralight text-[#C5C5C5]">How are you feeling</p>
                                <p className="font-extralight text-[#C5C5C5]">today?</p>
                            </div>

                            <div className="flex flex-col justify-between items-center font-extralight text-[12px] text-[#7E7E7E] mt-[80px]">
                                <p>arkMD doesn't replace doctors, it co-pilots</p>
                                <p>with them save lives.</p>
                            </div>
                        </div>
                }

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
                            className="bg-[#121416] w-full rounded-full pl-4 pr-12 resize-none text-white placeholder-[#B7B7B780] placeholder:text-[14px] pt-3 min-h-[50px] max-h-[120px] overflow-y-auto leading-[20px]"
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
                                    className="absolute top-2 right-3 h-[35px] w-[35px] rounded-full bg-[#FFDE59] flex items-center justify-center cursor-pointer"
                                >

                                    <span onClick={() => handleChat(chat)} ><IoSend color="#121416" /></span>

                                </div> : ''
                        }
                        {/* </div> */}
                    </div>
                </div>

            </div>

            <CustomSidBarModal
                visibility={showHistory}
                toggleVisibility={setShowHistory}
                sideClassName='mt-12 p-4'
                cardClassName='overflow-y-scroll'
            >
                <div className="flex justify-end">
                    <div className="grid grid-cols ">
                        <div className="py-2 bg-gray-900 rounded-t-md pl-2">
                            <p>Chat history</p>
                        </div>
                        <div className="bg-[#000000]  flex flex-col pt-2 pl-2 text-[14px] pb-3 gap-3">
                            {
                                chatSummary.map(({ userPrompt, chatSessionId }: any, index: any) => (
                                    <p
                                        key={index}
                                        className='cursor-pointer'
                                        onClick={() => fetchChatHistory(chatSessionId)}
                                    >
                                        {userPrompt.length > 50 ? userPrompt.slice(0, 20) + "..." : userPrompt}
                                    </p>
                                ))
                            }
                        </div>
                        <div
                            className="flex items-center bg-[#FFDE59] text-black rounded-b-md px-5 py-2 gap-2 font-semibold cursor-pointer "
                            onClick={() => navigate('/add-patient')}
                        >
                            <p className=''>Manage chat history </p>
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

export default Patients