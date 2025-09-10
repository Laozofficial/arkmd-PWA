
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import Splash from './pages/splash'
import WelcomePage from './pages/auth/SignUp/WelcomePage'
import Login from './pages/auth/Login'
import ForgetPassword from './pages/auth/FogetPassword'
import Doctors from './pages/chat/Doctors'
import Patients from './pages/chat/Patients'
import AddPatient from './pages/chat/Doctors/AddPatient'
import Pricing from './pages/pricing'
import ManagePatient from './pages/chat/Doctors/ManagePatient'
import ChangePassword from './pages/auth/ChangePassword.tsx'
import Error from './pages/error'





function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={< Splash />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/doctor" element={<Doctors />} />
        <Route path="/patient" element={<Patients />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/manage-patient" element={<ManagePatient />} />
        <Route path="/price" element={<Pricing />} />



        <Route path="*" element={<Error />} />
      </Routes>
    </>
  )
}

export default App
