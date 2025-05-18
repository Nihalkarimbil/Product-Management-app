
import { CiLock, CiMail } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from "yup";
import { loginUser } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';


const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("password is required")
})

const initialvalue = {
    email: "",
    password: ""
}

export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    //Form Handling With Formik
    const { handleChange, handleBlur, handleSubmit, values, touched, errors, resetForm } = useFormik({
        initialValues: initialvalue,
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            const resultAction = await dispatch(loginUser(values));
            if (loginUser.fulfilled.match(resultAction)) {
                navigate("/");
            }
            resetForm()
        }
    })

    
    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
    };

    return (
        <div className="flex h-screen w-full">

            <div className="w-full md:w-3/5 bg-white flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold text-yellow-500 mb-12 text-center">
                        Sign In to<br />Your Account
                    </h1>

                    <div className="space-y-6">
                        <form onSubmit={handleSubmit} className='space-y-6'>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <CiMail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name='email'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full pl-10 pr-4 py-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                {errors.email && touched.email && (
                                    <div className='text-red-500 text-sm mt-1'>{errors.email}</div>
                                )}
                            </div>


                            <div className="relative">
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <CiLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name='password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full pl-10 pr-4 py-4 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                {errors.password && touched.password && (
                                    <div className='text-red-500 text-sm mt-1'>{errors.password}</div>
                                )}
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={handleForgotPassword}
                                    className="text-gray-600 hover:text-gray-800 text-sm"
                                >
                                    forgot password?
                                </button>
                            </div>
                            <button
                                type='submit'
                                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-full mt-4 transition-colors"
                            >
                                SIGN IN
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex w-2/5 bg-blue-900 text-white relative overflow-hidden">

                <div className="absolute top-20 right-16 w-20 h-20 bg-blue-700 transform rotate-45 opacity-50"></div>
                <div className="absolute top-40 left-16 w-12 h-12 bg-blue-700 rounded-full opacity-30"></div>
                <div className="absolute bottom-40 right-16 w-24 h-24 bg-blue-700 transform rotate-45 opacity-40"></div>
                <div className="absolute bottom-20 left-16 w-10 h-10 bg-blue-700 rounded-full opacity-30"></div>
                <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-blue-700 transform rotate-45 opacity-20"></div>
                <div className="absolute top-2/3 left-20 w-40 h-40 bg-blue-700 transform rotate-45 opacity-10"></div>


                <div className="flex flex-col h-full justify-center items-center px-8 relative z-10">
                    <h1 className="text-4xl font-bold mb-6">Hello Freind!</h1>
                    <p className="text-center text-lg mb-10 opacity-90">
                        Enter your personal details and start your journey with us
                    </p>

                    <button
                        onClick={() => navigate("/register")}
                        className="border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-12 py-3 rounded-full transition-colors"
                    >
                        SIGN UP
                    </button>
                </div>
            </div>


        </div>
    );
}