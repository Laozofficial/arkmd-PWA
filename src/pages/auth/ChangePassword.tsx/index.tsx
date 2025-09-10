import React, { useState } from 'react'
import NewChangedPassword from './NewChangedPassword';
import Success from '../FogetPassword/Success';


function ChangePassword() {

    const [steps, setSteps] = useState<any>(0);

    const resetSteps = [
        { name: 'reset_password', component: <NewChangedPassword step={setSteps} /> },
        { name: 'success_reset', component: <Success step={setSteps} /> }
    ]

    return (
        <div className="h-full">
            {resetSteps[steps].component}
        </div>
    )

}

export default ChangePassword