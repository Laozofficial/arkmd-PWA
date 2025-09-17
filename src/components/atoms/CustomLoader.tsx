import React from 'react'
import Star from '../../assets/star.png'
import { motion } from "framer-motion";

function CustomLoader() {

    const starVariants = {
        animate: (delay: number) => ({
            opacity: [0.2, 1, 0.2],
            transition: {
                duration: 1.2,
                repeat: Infinity,
                delay,
                ease: "linear",
            },
        }),
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="flex items-center justify-center w-[50px] min-h-screen bg-black relative">
                <motion.img
                    src={Star}
                    alt="star"
                    className="absolute top-[45%] left-[-3%] w-6 h-6"
                    variants={starVariants}
                    animate="animate"
                    custom={0}
                />
                <motion.img
                    src={Star}
                    alt="star"
                    className="absolute top-[48%] right-[6%] w-7 h-7"
                    variants={starVariants}
                    animate="animate"
                    custom={0.3}
                />
                <motion.img
                    src={Star}
                    alt="star"
                    className="absolute top-[51%] left-[0%] w-9 h-9"
                    variants={starVariants}
                    animate="animate"
                    custom={0.6}
                />
            </div>
        </div>
    );

}

export default CustomLoader