import React, { useEffect, useState } from 'react'
import { FaX } from 'react-icons/fa6';
import { IoArrowBackOutline, IoCheckmarkSharp } from 'react-icons/io5';
import { getAllPlan, getUserPlan } from '../../api/payment';
import CustomButton from '../../components/atoms/CustomButton';
import { usePaystackPayment } from 'react-paystack';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getLoggedUserAtom } from '../../recoil/atom/auth';
import CustomLoader from '../../components/atoms/CustomLoader';
import { getCurrentPlanAtom } from '../../recoil/atom/price';




function Pricing() {

    const [selected, setSelected] = useState("free");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [userPlan, setUserPlan] = useState<any>('');
    const [amount, setAmount] = useState<any>('');

    const [nigeriaMonthlyPlan, setnigeriaMonthlyPlan] = useState([]);
    const [nigeriaAnnuallyPlan, setnigeriaAnnuallyPlan] = useState([]);


    const [planId, setPlanId] = useState('');

    const [isAnnual, setIsAnnual] = useState(false);

    const [, setCurrentPlanAtom] = useRecoilState(getCurrentPlanAtom);

    const userEmailValue = useRecoilValue(getLoggedUserAtom);

    const fetchAllPlans = () => {
        setIsLoading(true);
        getAllPlan().then((res) => {
            if (res?.success) {

                const data = res.data;

                const planA = data.filter(({ country }: any) => country == 'nigeria');
                const planB = data.filter(({ country }: any) => country !== 'nigeria');

                const ngnMonthlyPlans = planA.filter((plan: any) => plan.frequency === "monthly");
                const ngnAnnualPlans = planA.filter((plan: any) => plan.frequency === "annually");

                setnigeriaAnnuallyPlan(ngnAnnualPlans);
                setnigeriaMonthlyPlan(ngnMonthlyPlans);

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
                setCurrentPlanAtom(res.data)
                if (res.data == null) {
                    setSelected('free');
                } else {
                    const currentPlanName = res?.data?.plan_price?.plan?.name;
                    setSelected(currentPlanName);
                }
                setUserPlan(res.data);
                setIsLoading(false);

            } else {
                setIsLoading(false);
                return;
            }
        });
    }

    const config = {
        reference: (new Date()).getTime().toString(),
        email: userEmailValue.email,
        amount: amount * 100,
        publicKey: import.meta.env.VITE_PK_TEST,
        metadata: {
            plan_price_id: planId
        }
    };


    const onSuccess = (reference: any) => {
        fetchUserPlans();
    };

    // const onClose = () => {
    //     console.log('closed')
    // }

    const initializePayment = usePaystackPayment(config);

    const UpgradePlan = () => {
        initializePayment({
            onSuccess,
            // onClose
        });
    };

    useEffect(() => {
        fetchAllPlans();
        fetchUserPlans();
    }, [])

    const priceType = [
        { name: 'Annually', value: 'annually' },
        { name: 'Monthly', value: 'monthly' }
    ]

    const freePlan = [
        {
            name: 'free',
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
    ]





    if (isLoading) {
        return (
            <CustomLoader />
        )
    }




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

                {/* <div className="flex items-center justify-between mt-4 font-extralight">
                    <p className='text-[#B7B7B780]'>Showing plans for <span></span> Nigeria</p>
                    <div className="bg-[#B7B7B780] text-[#FFDE59] rounded-full h-[20px] px-3 text-2 font-extralight">
                        <p>Change</p>
                    </div>
                </div> */}

                <div className="grid grid-cols-1 gap-2">
                    <div className="border-1 border-[#FFDE594D] p-1.5 rounded-full w-[145px] flex gap-4 mt-10 items-center justify-center">
                        {
                            priceType.map(({ name, value }, index) => (
                                <div
                                    key={index}
                                    className={`text-[14px] cursor-pointer ${isAnnual && value === "annually"
                                        ? "bg-gradient-to-l from-[#FFFFFF] to-[#FFDE59] text-[#000000] font-semibold rounded-full py-1 px-3"
                                        : !isAnnual && value === "monthly"
                                            ? "bg-gradient-to-l from-[#FFFFFF] to-[#FFDE59] text-[#000000] font-semibold rounded-full py-1 px-3"
                                            : "text-[#FFDE59]"
                                        }`}
                                    onClick={() => setIsAnnual(value === "annually")}
                                >
                                    <p>{name}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className="mt-3">
                        <p>Choose a plan that works for you</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 ">
                        <div className="">
                            {
                                freePlan.map(({ name, monthly_price, yearly_price, }, index) => (
                                    <div key={index}>
                                        <div
                                            className="flex items-center gap-3 rounded-3xl border px-3 py-3 w-full"
                                            style={{
                                                borderColor: selected === name ? "#FFDE59" : "#FFDE5933",
                                                backgroundColor: selected === name ? "#2E291666" : "",
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name={name}
                                                id={name}
                                                value={name}
                                                checked={selected === "free"}
                                                onChange={(e) => {
                                                    setSelected(e.target.value);
                                                    setSelectedIndex(index);
                                                }}
                                            />

                                            <div className='grid grid-cols-1 gap-1 w-full'>
                                                <div className="flex items-center justify-between w-full">
                                                    <p className="text-[16px] grid grid-cols-1 ">
                                                        {name?.toUpperCase()} ({isAnnual ? yearly_price : monthly_price})
                                                    </p>
                                                    {
                                                        userPlan == null && (
                                                            <div className=" bg-green-500/10 text-green-500 rounded-full h-[20px] px-3 text-2 font-extralight">
                                                                <p>current plan</p>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <p className="text-[16px] ">
                                                    NGN (NGN {isAnnual ? yearly_price : monthly_price}) {isAnnual ? "yr" : "/monthly"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {(isAnnual ? nigeriaAnnuallyPlan : nigeriaMonthlyPlan).map(({ id, frequency, price, plan }: any, index) => (
                            <div key={id}>
                                <div
                                    className="flex items-center gap-3 rounded-3xl border px-3 py-3 w-full"
                                    style={{
                                        borderColor: selected === plan.name ? "#FFDE59" : "#FFDE5933",
                                        backgroundColor: selected === plan.name ? "#2E291666" : "",
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="plan"
                                        id={plan.name}
                                        value={plan.name}
                                        checked={selected === plan.name}
                                        onChange={(e) => {
                                            setSelected(e.target.value);
                                            setSelectedIndex(index);
                                            setPlanId(id);
                                            setAmount(price)

                                        }}
                                        className="w-4 h-4 accent-yellow-500 "
                                    />

                                    <div className='grid grid-cols-1 gap-1 w-full'>
                                        <div className="flex items-center justify-between w-full">
                                            <p className="text-[16px] grid grid-cols-1 ">
                                                {plan?.name?.toUpperCase()} (NGN {price})
                                            </p>
                                            {
                                                userPlan !== null &&
                                                userPlan?.plan_price?.id == id && (
                                                    <div className=" bg-green-500/10 text-green-500 rounded-full h-[20px] px-3 text-2 font-extralight">
                                                        <p>current plan</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <p className="text-[16px] ">
                                            NGN {price} {frequency === "monthly" ? "/monthly" : "/yr"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5">
                        <div className="">
                            <p>What's included</p>
                        </div>

                        {selected !== "free" && (
                            <div className="grid grid-cols-1 gap-3 mt-4">
                                {nigeriaMonthlyPlan.length > 0 &&
                                    JSON.parse(nigeriaMonthlyPlan[selectedIndex]?.plan?.description).map(
                                        ({ text, status }: { text: string; status: boolean }, index: number) => (
                                            <div key={index} className="flex items-center gap-2 font-extralight">
                                                {status ? (
                                                    <IoCheckmarkSharp color="#39F45F" size={15} />
                                                ) : (
                                                    <FaX color="#F63D4A" size={13} />
                                                )}
                                                <p>{text}</p>
                                            </div>
                                        )
                                    )}
                            </div>
                        )}

                        {
                            selected == 'free' && (
                                <div
                                    className='grid grid-cols-1 gap-3 mt-4'
                                >
                                    {
                                        freePlan[0].details.map(({ text, status }, index) => (
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
                            )
                        }

                    </div>

                    {selected !== 'free' && !userPlan && (
                        <div className="mt-[40px]">
                            <CustomButton
                                title="Upgrade plan"
                                type="button"
                                handleClick={UpgradePlan}
                                className="!w-full"
                            />
                        </div>
                    )}

                </div>

            </div>
        </>
    )

}

export default Pricing