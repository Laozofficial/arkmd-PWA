import React, { useState } from 'react'
import ResetPassword from './ResetPassword';
import Otp from './Otp';
import NewPasword from './NewPasword';
import Success from './Success';



function ForgetPassword() {

    const [steps, setSteps] = useState(0);

    const resetSteps = [
        { name: 'reset_password', component: <ResetPassword step={setSteps} /> },
        { name: 'Password_otp', component: <Otp step={setSteps} /> },
        { name: 'new_password', component: <NewPasword step={setSteps} /> },
        { name: 'success_reset', component: <Success step={setSteps} /> }
    ]

    return (
        <div className="h-full">
            {resetSteps[steps].component}
        </div>
    )
}

export default ForgetPassword;