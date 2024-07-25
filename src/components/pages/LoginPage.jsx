import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from 'axios'
import validator from "validator";
import { regexPassword } from "../../../utils";
import { UserContext } from "../UserContext";

const LoginPage = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    })
    const [errors, setErrors] = useState({
        email: false,
        password: false,
        fetchError: false,
        fetchErrorMsg: '',
    })
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext)

    const handleChange = (fieldName) => (event) => {
        const currValue = event.target.value
        let isCorrectValue =
            fieldName === 'email'
                ? validator.isEmail(currValue)
                : regexPassword.test(currValue)

        isCorrectValue
            ? setErrors({ ...errors, [fieldName]: false })
            : setErrors({ ...errors, [fieldName]: true })

        setValues({ ...values, [fieldName]: event.target.value })
       
    }

    const handleShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        })
    }

    const loginUser = async (values) => {
        try {
            const response = await axios.post('/login', values);
            // console.log(response);
            return response;
        } catch (error) {
            throw new Error(error.response.data.error || 'An error occurred');
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log('submitted');
        try {
            const {data} = await loginUser(values);
            // Display success message to user
            // console.log(data);
            alert(data.msg);
            setUser(data.userSession);
            setRedirect(true);


            setValues({
                email: '',
                password: '',
                showPassword: false,
            });

            

        } catch (error) {
            // console.log(error)
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg: error.message || 'There was a problem with our server, please try again later',

            })

        }

    }

    if(redirect){
        return <Navigate to = {'/'} />
    }

    return (
        <div className="mt-4 grow  items-center justify-around">
            <div className="mb-60" >
                <h1 className="text-4xl text-center mb-4 ">Login</h1>
                <form className="max-w-md mx-auto " onSubmit={handleSubmit}>

                    <input type="email"
                        placeholder="your@email.com"
                        onChange={handleChange('email')}
                        value={values.email}
                        error={errors.email.toString()}
                        className= 'mt-6'
                        />


                    {errors.email &&
                        <p className="validate">Please insert a valid email address</p>}


                    <div className="relative">
                        <input type={values.showPassword ? 'text' : 'password'}
                            placeholder="passoword"
                            onChange={handleChange('password')}
                            value={values.password}
                            error={errors.password.toString()}
                            className= 'mt-6'
                        />

                        <button
                            type="button"
                            className="picon"
                            onClick={() => handleShowPassword('showPassword')}
                        >
                            {values.showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>

                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"  className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>


                            )}
                        </button>
                    </div>

                    <button className="primary mt-9" >Login</button>


                    <div className="text-center py-2 text-gray-500">
                        Not a member? <Link className="underline text-black" to="/register">Register</Link>
                    </div>

                    {errors.fetchError && (
                        <p error className="validate mt-5">{errors.fetchErrorMsg}</p>
                    )}
                </form>
            </div>
        </div>
    )
}

export default LoginPage