import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import validator from "validator";

import { regexPassword, regexName } from "../../../utils";


export default function RegisterPage() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        showPassword: false,
        showRepeatPassword: false,
    })
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
        repeatPassword: false,
        fetchError: false,
        fetchErrorMsg: '',
    })

    const handleChange = (fieldName) => (event) => {
        const currValue = event.target.value;
        switch (fieldName) {
            case 'name':
                currValue.match(regexName) && currValue.length >= 2 && currValue.length <= 30
                    ? setErrors({ ...errors, name: false })
                    : setErrors({ ...errors, name: true })
                break

            case 'email':
                validator.isEmail(currValue)
                    ? setErrors({ ...errors, email: false })
                    : setErrors({ ...errors, email: true })
                break

            case 'password':
                regexPassword.test(currValue)
                    ? setErrors({ ...errors, password: false })
                    : setErrors({ ...errors, password: true })
                break

            case 'repeatPassword':
                currValue === values.password
                    ? setErrors({ ...errors, repeatPassword: false })
                    : setErrors({ ...errors, repeatPassword: true })
                break

            default:
        }
        setValues({ ...values, [fieldName]: event.target.value })
    }

    const handleShowPassword = (showPasswordField) => {
        setValues({
            ...values,
            [showPasswordField]: !values[showPasswordField],
        })
    }

    const registerUser = async (values) =>{
        try {
            const response = await axios.post('/register', values);
            return response.data;
          } catch (error) {
            throw new Error(error.response.data.error || 'An error occurred');
          }
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent the default form submission behavior

        try {
            const data = await registerUser(values);
            // Display success message to user
            console.log(data.message);
            

            setValues({
                name:'',
                email: '',
                password: '',
                repeatPassword: '',
                showPassword: false,
                showRepeatPassword: false,
              })  

          } catch (error) {
            // Display error message to user
            // console.error(error.message);
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg: error.message ||'There was a problem with our server, please try again later',
                
            })
           
           
          }
       

    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-60" >
                <h1 className="text-4xl text-center mb-4 ">Register</h1>
                <form className="max-w-md mx-auto " onSubmit={handleSubmit}>

                    <input type="text"
                        placeholder="John Doe"
                        value={values.name}
                        onChange={handleChange('name')}
                        error={errors.name.toString()}
                        className= 'mt-6'                      
                    />

                    {errors.name &&
                        <p className="validate">
                            Name should be between 2 and 30 characters and only contain letters and spaces.
                        </p>
                    }

                    <input type="email"
                        placeholder="your@email.com"
                        value={values.email}
                        onChange={handleChange('email')}
                        error={errors.email.toString()}
                        className= 'mt-6'

                    />
                    {/* valid email or not p showing  */}

                    {errors.email &&
                        <p className="validate">Please insert a valid email address</p>}


                    <div className="relative">
                        <input type={values.showPassword ? 'text' : 'password'}
                            placeholder="passoword"
                            value={values.password}
                            onChange={handleChange('password')}
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

                    {errors.password &&
                        <p className="validate"> Password must be at least 8 characters, have one symbol, 1
                            uppercase letter, 1 lowercase and 1 digit</p>}

                    <div className="relative">
                        <input type={values.showRepeatPassword ? 'text' : 'password'}
                            placeholder="repeat passoword"
                            value={values.repeatPassword}
                            onChange={handleChange('repeatPassword')}
                            error={errors.repeatPassword.toString()}
                            className= 'mt-6'
                        />

                        <button
                            type="button"
                            className="picon"
                            onClick={() => handleShowPassword('showRepeatPassword')}
                        >
                            {values.showRepeatPassword ? (
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

                    {errors.repeatPassword &&
                        <p className="validate"> Password must be the same as above</p>}

                    <button className="primary mt-9" >Register</button>


                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" to="/login">Login</Link>
                    </div>

                    {errors.fetchError && (
                        <p error className="validate mt-5">{errors.fetchErrorMsg}</p>
                    )}
                </form>
            </div>
        </div>
    )
}