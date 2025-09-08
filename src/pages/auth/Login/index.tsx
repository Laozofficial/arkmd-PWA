import React from 'react'
import CustomAuthLayout from '../../../components/atoms/CustomAuthLayout'
import { Form, Formik } from 'formik'
import CustomInput from '../../../components/atoms/CustomInput'
import CustomButton from '../../../components/atoms/CustomButton'
import { FaApple } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { errorMessages } from '../../../components/shared'
import * as yup from "yup";
// import CustomLoader from '../../../components/atoms/CustomLoader'


function Login() {

  const Navigate = useNavigate();

  // const [isLoading, setIsLoading] = useState(false);

  interface Values {
    email: string;
    password: string;
  }

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email(errorMessages.email)
      .required(errorMessages.required),
    password: yup.string().required(errorMessages.required),
  });

  const initialState = {
    email: "",
    password: "",
  };

  const handleSubmit = () => { }

  // if (isLoading) {
  //   return (
  //     <CustomLoader />
  //   )
  // }

  return (
    <>
      <div className="">
        <CustomAuthLayout
          className=' h-[100vh]'
        >
          <div className="">
            <div
              className="text-white flex flex-col justify-center items-center gap-1 mt-8 relative h-full"
            >
              <p className='text-[19px] font-bold'>Log in</p>
              <p className='text-[13px] font-light'>Enter your details below to continue</p>
            </div>
            <div className="mt-10">
              <Formik<Values>
                initialValues={initialState}
                onSubmit={handleSubmit}
                validationSchema={loginSchema}
              >
                {() => (
                  <Form>
                    <div className="grid grid-cols-1 gap-5">
                      <CustomInput
                        label="Email"
                        id="email"
                        name="email"
                        placeholder="enter your email "
                        type="email"
                      />
                      <div className="">
                        <CustomInput
                          label="Password"
                          id="password"
                          name="password"
                          placeholder="**********"
                          type="password"
                        />
                      </div>
                      <div
                        className="font-light text-[12px] flex justify-end cursor-pointer"
                        onClick={() => Navigate('/forget-password')}
                      >
                        <p>Forget password ?</p>
                      </div>
                      <div className="mt-[16px]">
                        <CustomButton
                          title='Login'
                          type='button'
                          handleClick={() => { Navigate('/welcome') }}
                          className='!w-full'
                        // isDisabled
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik >
            </div>
            <div className="text-white flex flex-col items-center gap-5 mt-5">
              <div className="flex flex-col items-center gap-5">
                <p>Or</p>
                <p>Sign up with</p>
              </div>
              <div className="flex gap-4 ">
                <div className=" w-[30px] h-[30px] rounded-full border-[1px] border-[#E4E4E733] flex justify-center items-center">
                  <FaApple size={14} color='white' />
                </div>
                <div className=" w-[30px] h-[30px] rounded-full border-[1px] border-[#E4E4E733] flex justify-center items-center">
                  <FaGoogle size={14} color='white' />
                </div>
              </div>
              <div
                className=""
              >
                <p>{`Don't have an account?`}
                  <span
                    className='text-[#FFDE59] ml-2 italic underline cursor-pointer'
                    onClick={() => Navigate('/sign-up')}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </div>
        </CustomAuthLayout>
      </div>
    </>
  )
}

export default Login