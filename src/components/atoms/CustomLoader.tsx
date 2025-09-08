import React from 'react'
import Star from '../../assets/star.png'

function CustomLoader() {

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="h-8 w-8 ">
                <img src={Star} alt="loader" className="loader w-full h-full object-cover" />
            </div>
        </div>
    );

}

export default CustomLoader