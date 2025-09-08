
import React from 'react'
import { FaX } from 'react-icons/fa6'

function CustomAuthLayout({ children, className }: any) {
    return (
        <div className={`bg-[#0A0A0A] h-[85vh] rounded-t-4xl p-5 ${className}`}>
            <div className="flex justify-end mb-5">
                <div className="h-[20px] w-[20px] flex items-center justify-center rounded-full bg-amber-400">
                    <FaX
                        size={10}
                        color='black'
                        onClick={() => window.history.back()}
                    />
                </div>
            </div>
            {children}
        </div>
    )
}

export default CustomAuthLayout