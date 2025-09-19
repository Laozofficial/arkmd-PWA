import React, { useEffect, useRef, useState } from 'react'
import CustomButton from '../../../components/atoms/CustomButton'
import { FaArrowLeft, FaCaretDown, FaPlus, FaRegStar, FaXmark } from 'react-icons/fa6'
import { IoDocumentTextOutline, IoSend } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import CustomSidBarModal from '../../../components/atoms/CustomSideBarModal'
import Bars from '../../../assets/SidebarIcon.png'
import New from '../../../assets/edit.png'
import { FiLogOut } from 'react-icons/fi'
import User from '../../../assets/Usericon.png'
import Logo from '../../../assets/arkmd-logo.png'
import { generateSessionId, getChatHistoryById, getChatLimit, getChatSummary, handleChatPrompt } from '../../../api/chat'
import ReactMarkdown from 'react-markdown';
import { useRecoilState, useRecoilValue } from 'recoil'
import { getChatSessionIdAtom, getCurrentChatHistoryAtom } from '../../../recoil/atom/chat'
import { getLoggedUserAtom } from '../../../recoil/atom/auth'
import CustomLoader from '../../../components/atoms/CustomLoader'
import { PiImageBold } from 'react-icons/pi'
import Pdf from '../../../assets/pdfImage.png'


function Patients() {

    const navigate = useNavigate();

    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const imageInputRef = useRef(null);
    const docInputRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isChatLoading, setIsChatLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);
    const [chat, setChat] = useState<any>('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [chatSummary, setChatSummary] = useState<any>([]);
    const [limitReached, setLimitReached] = useState(false);
    const [isNewChat, setIsNewChat] = useState(false);
    const [showMediaModal, setShowMediaModal] = useState(false);

    const [selectedDoc, setSelectedDoc] = useState(null);

    const [, setChatHistoryAtom] = useRecoilState(getCurrentChatHistoryAtom);
    const getChatHistoryValue = useRecoilValue(getCurrentChatHistoryAtom);

    const [, setChatSessionAtom] = useRecoilState(getChatSessionIdAtom);
    const getChatSessionIdValue = useRecoilValue(getChatSessionIdAtom);

    const getLoggedUserValue = useRecoilValue(getLoggedUserAtom);


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
            setShowMediaModal(false);
        }
    }

    const handleDocChange = (e: any) => {
        const file = e.target.files[0]
        if (file) {
            setSelectedDoc(file);
            setShowMediaModal(false);
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
                setChatSessionAtom(res.data);
                localStorage.setItem("session_id", res.data);
                setIsLoading(false);
            }
        });
    };

    const getChatHistory = () => {
        setIsChatLoading(true);
        getChatHistoryById(getChatSessionIdValue).then((res) => {
            if (res?.success) {
                setChatHistoryAtom(res.data);
                setIsChatLoading(false);
                setIsNewChat(false);
            }
        });
    }

    const handleChat = (prompt: any) => {

        if (getChatHistory?.length == 0) {
            setIsNewChat(true);
        }

        if (chat !== '') {
            HandleChatLimit();
            setIsChatLoading(true);
            const formData = new FormData();
            formData.append("session_id", getChatSessionIdValue);
            formData.append("prompt", prompt);
            formData.append("patient_id", "");
            if (selectedFile) {
                formData.append("image", selectedFile);
            }
            if (selectedDoc) {
                formData.append("doc", selectedDoc);
            }

            handleChatPrompt(formData).then((res) => {
                if (res?.success) {
                    setChat('');
                    setSelectedFile(null)
                    getChatHistory();
                    setSelectedDoc(null);
                    setSelectedFile(null);
                    setIsChatLoading(false);
                }
            });
        } else {
            setIsNewChat(false);
            return;
        }
    };

    const newChat = () => {
        generateId();
        setChatHistoryAtom([]);
    }

    const fetchChatHistory = (id: any) => {
        setIsLoading(true);
        getChatHistoryById(id).then((res) => {
            if (res?.success) {
                setChatSessionAtom(id);
                setShowHistory(false);
                setChatHistoryAtom(res.data);
                HandleChatLimit();
                setSelectedDoc(null);
                setSelectedFile(null);
                setIsLoading(false);
            }
        });
    }

    const convertSize = (size: any) => {
        if (selectedDoc !== null) {
            const newSize = size / 1048576
            return newSize.toFixed(2);
        }
    }


    const logOut = () => {
        localStorage.removeItem("token");
        navigate('/login')
    }

    useEffect(() => {
        const savedId = localStorage.getItem("session_id");
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
    }, [getChatHistoryValue, isChatLoading, getChatHistoryValue]);

    useEffect(() => {
        HandleChatSummary();
        HandleChatLimit();
    }, [])


    if (isLoading) {
        return (
            <CustomLoader />
        )
    }



    return (
        <>
            <div className="p-5 h-screen flex flex-col relative">

                <div className="sticky top-0  z-50">
                    <div className="text-[#FFDE59] flex items-center justify-between pb-5">
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
                    getChatHistoryValue?.length !== 0 || isNewChat ?
                        <div
                            className="flex-1 overflow-y-auto pb-32 show-scrollbar"
                        >
                            {
                                getChatHistoryValue.map(({ imageUrl, userPrompt, assistantResponse, createdAt, documentName, documentSize }: any, index: any) => (
                                    <div
                                        key={index}
                                        className="mt-10 space-y-4 text-[14px]"
                                        ref={messagesEndRef}
                                    >
                                        <div className="flex justify-end">
                                            <div className="p-2 text-black flex flex-col items-end ">
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
                                                {
                                                    documentName !== null && (
                                                        <div className="bg-[#303030] rounded-md w-[200px] text-white">
                                                            <div className="flex gap-2 px-4 py-2 ">
                                                                <div className="h-[42px] w-[32px] overflow-hidden">
                                                                    <img
                                                                        src={Pdf}
                                                                        alt="pdf"
                                                                        className='h-full w-full object-cover'
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <p className='!text-[14px]'>{documentName}</p>
                                                                    <p className='!text-[10px] font-light'>PDF Document {documentSize}MB</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                <div className="bg-white p-2 rounded-lg max-w-[300px]">
                                                    <p>{userPrompt}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-start">
                                            <div className="p-2 bg-[#121416] rounded-lg text-white max-w-[270px] whitespace-pre-wrap">
                                                <ReactMarkdown>{String(assistantResponse).replace(/(?<!\n)\n(?!\n)/g, '\n')}</ReactMarkdown>
                                            </div>
                                        </div>
                                        <div className="mt-3 text-[6px] opacity-40 leading-none" style={{ fontSize: '6px' }}>{new Date(createdAt).toLocaleString()}</div>
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
                                <p className="font-semibold">Hello {getLoggedUserValue?.firstName},</p>
                                <p className="font-extralight text-[#C5C5C5]">How are you feeling</p>
                                <p className="font-extralight text-[#C5C5C5]">today?</p>
                            </div>

                            <div className="flex flex-col justify-between items-center font-extralight text-[12px] text-[#7E7E7E] mt-[80px]">
                                <p>ArkMD doesn't replace doctors, it co-pilots</p>
                                <p>with them to save lives.</p>
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
                    {
                        selectedDoc !== null && (
                            <div className="w-[210px] overflow-hidden absolute bottom-24 rounded-lg ">
                                <div className="flex justify-end mb-1 ">
                                    <div className="h-[15px] w-[15px] flex justify-center items-center rounded-full bg-[#FFDE59]">
                                        <span
                                            className='cursor-pointer'
                                            onClick={() => { setSelectedDoc(null) }}
                                        >
                                            <FaXmark color='#000' size={10} />
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-[#303030] rounded-md w-[200px]">
                                    <div className="flex gap-2 px-4 py-2 ">
                                        <div className="h-[40px] w-[30px] overflow-hidden">
                                            <img
                                                src={Pdf}
                                                alt="pdf"
                                                className='h-full w-full object-cover'
                                            />
                                        </div>
                                        <div>
                                            <p className='!text-[14px]'>{selectedDoc.name}</p>
                                            <p className='!text-[10px] font-light'>PDF Document {convertSize(selectedDoc.size)}MB</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div
                        className="h-[50px] w-[50px] rounded-full bg-[#121416] flex items-center justify-center cursor-pointer mb-2"
                        onClick={() => setShowMediaModal(true)}
                    >
                        <FaPlus color="#FFDE59" size={12} />
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
                        {/* </div> */}
                    </div>
                </div>

            </div>

            <CustomSidBarModal
                visibility={showMediaModal}
                toggleVisibility={setShowMediaModal}
                sideClassName='justify-start h-full ml-[40px] '
                cardClassName='overflow-y-scroll !bg-transparent !w-[200px]'
            >
                <div className="flex items-center h-full">
                    <div className="bg-[#121416] p-8 rounded">
                        <div className="flex flex-col gap-3">
                            <div
                                className="flex items-center gap-3 cursor-pointer"
                                onClick={() => imageInputRef.current.click()}
                            >
                                <p><PiImageBold size={18} /></p>
                                <p>Add image</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={imageInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                            <hr className="w-full border-t border-[#ABD9F60D]" />
                            <div
                                className="flex items-center gap-3 cursor-pointer"
                                onClick={() => docInputRef.current.click()}
                            >
                                <p><IoDocumentTextOutline size={18} /></p>
                                <p>Add doc</p>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    ref={docInputRef}
                                    onChange={handleDocChange}
                                    className="hidden"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </CustomSidBarModal>

            <CustomSidBarModal
                visibility={showHistory}
                toggleVisibility={setShowHistory}
                sideClassName='mt-12 p-4'
                cardClassName='overflow-y-scroll'
            >
                <div className="flex justify-end">
                    <div className="grid grid-cols w-[200px] ">
                        <div className="py-2 bg-gray-900 rounded-t-md pl-2">
                            <p>Chat history</p>
                        </div>
                        <div className="bg-[#000000]  flex flex-col pt-2 pl-2 text-[14px] pb-3 gap-3 h-[150px] overflow-y-scroll show-scrollbar">
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

                        {/* <div
                            className="flex items-center bg-[#FFDE59] text-black rounded-b-md px-5 py-2 gap-2 font-semibold cursor-pointer "
                            onClick={() => navigate('/add-patient')}
                        >
                            <p className=''>Manage chat history </p>
                        </div> */}

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