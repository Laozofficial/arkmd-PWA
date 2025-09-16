import React, { useEffect, useState } from 'react'
import { FaX } from 'react-icons/fa6';
import { IoArrowBackOutline, IoCheckmarkSharp } from 'react-icons/io5';
import { getAllPlan, getUserPlan } from '../../api/payment';




function Pricing() {

    const [selected, setSelected] = useState("");
    const [selectedPrice, setSelectedPrice] = useState<string | number>(0);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [pricePlans, setPricePlans] = useState([]);
    const [userCountry, setUserCountry] = useState('nigeria');



    const fetchAllPlans = () => {
        setIsLoading(true);
        getAllPlan().then((res) => {
            if (res?.success) {
                setPricePlans(res.data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });
    }

    const fetchUserPlans = () => {
        setIsLoading(true);
        getUserPlan().then((res) => {
            if (res?.success) {
                // setUserPlans(res.data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });
    }

    useEffect(() => {
        fetchAllPlans();
        fetchUserPlans();
    }, [])


    if (isLoading) {
        return (
            <div className="h-[100vh] flex items-center justify-center">
                <p>Loading....</p>
            </div>
        )
    }


    

    const priceType = [
        { name: 'Yearly', value: 'yearly' },
        { name: 'Monthly', value: 'monthly' }
    ]

    const plans = [
        {
            name: 'Starter plan ',
            descr: 'Full diagnosis features',
            monthly_price: 'Free',
            yearly_price: 'Free',
            details: [
                { text: 'Grey(AI Diagnostician)-10 chats/day', status: true },
                { text: 'Image Analysis - 6 credits / month', status: true },
                { text: 'Elijah (AI Pharmacist)', status: false },
                { text: 'Noah (Medical Knowledge AI)', status: false },
                { text: 'Video Analysis', status: false },
                { text: 'Support', status: false }
            ],
        },
        {
            name: 'Clinical Plan ',
            descr: 'Drug recommendations & prescription support',
            monthly_price: '15,000',
            yearly_price: '150,000',
            details: [
                { text: 'Two (2) months free', status: true },
                { text: 'Grey(AI Diagnostician)-10 chats/day', status: true },
                { text: 'Elijah (AI Pharmacist)', status: false },
                { text: 'Image Analysis - 50 credits / month', status: true },
                { text: 'Standard Email Support', status: true },
                { text: 'Audio Analysis', status: false },
                { text: 'Noah (Medical Knowledge AI)', status: false },
                { text: 'Video Analysis', status: false }
            ],
        },
        {
            name: 'Advanced Clinic Plan ',
            descr: 'Comprehensive medical insights',
            monthly_price: '35,000',
            yearly_price: '35,0000',
            details: [
                { text: 'Two (2) months free', status: true },
                { text: 'Grey(AI Diagnostician)-10 chats/day', status: true },
                { text: 'Elijah (AI Pharmacist)', status: true },
                { text: 'Noah (Medical Knowledge AI) - Full Access', status: true },
                { text: 'Image Analysis - 50 credits / month', status: true },
                { text: 'Audio Analysis - unlimited credit', status: true },
                { text: 'Video Analysis - creadits/month', status: true },
                { text: 'Priority Support', status: true }
            ],
        }
    ]




    return (
        <>
            <div className="py-8 px-5 ">
                <div className="flex flex-col items-center justify-center gap-1 relative ">
                    <div
                        className="absolute top-5 left-0 cursor-pointer"
                        onClick={() => window.history.back()}
                    >
                        <IoArrowBackOutline />
                    </div>
                    <p className="text-[19px] font-bold">Our pricing</p>
                    <p className="text-[13px] font-light">No hidden fees, cancel anytime 😉</p>
                    <hr className="w-full border-t border-[#B7B7B780] mt-3" />
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <div className="border-1 border-[#FFDE594D] p-1.5 rounded-full w-[145px] flex gap-4 mt-10 items-center justify-center">
                        {
                            priceType.map(({ name, }, index) => (
                                <div
                                    key={index}
                                    className={`text-[14px] cursor-pointer ${selectedPrice === index
                                        ? 'bg-gradient-to-l from-[#FFFFFF] to-[#FFDE59] text-[#000000] font-semibold rounded-full py-1 px-3'
                                        : 'text-[#FFDE59]'}`}
                                    onClick={() => setSelectedPrice(index)}
                                >
                                    <p>{name}</p>
                                </div>

                            ))
                        }

                    </div>

                    <div className="mt-3">
                        <p>Choose a plan that works for you</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {
                            plans.map(({ name, frequency, country, currency, descr, yearly_price, plan, price }, index) => (
                                <div key={index}>
                                    <div>
                                        <div
                                            className="flex items-center gap-3 rounded-xl border pl-2 py-2 w-full"
                                            style={{
                                                borderColor: selected === name ? "#FFDE59" : "#FFDE5933",
                                                backgroundColor: selected === name ? "#2E291666" : "",
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name="plan"
                                                id={name}
                                                value={name}
                                                checked={selected === name}
                                                onChange={(e) => { setSelected(e.target.value); setSelectedIndex(index) }}
                                                className="w-4 h-4 accent-yellow-500"
                                            />
                                            <div>
                                                <p className="text-[16px]">
                                                    {name} ({selectedPrice == 0 ? yearly_price : price}
                                                    {selectedPrice == 0 ? "/y" : "/m"})
                                                </p>
                                                <p className="text-[12px] font-light">{descr}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="mt-5">

                        <div className="">
                            <p>What's included</p>
                        </div>

                        <div className="grid grid-cols-1 gap-1">
                            {
                                plans[selectedIndex].details.map(({ text, status }, index) => (
                                    <div key={index}>
                                        <div className="flex items-center gap-2 font-extralight">
                                            <p>
                                                {
                                                    status ? <IoCheckmarkSharp color='#39F45F' size={15} /> : <FaX color='#F63D4A' size={13} />
                                                }
                                            </p>
                                            <p>{text}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>

            </div>
        </>
    )

}

export default Pricing