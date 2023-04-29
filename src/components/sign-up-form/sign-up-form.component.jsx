import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { SignUpContainer } from './sign-up-form.styles'

import { signUpWithEmailAndPassword, createUserFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    const navigate = useNavigate();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password === confirmPassword) {
            try {

                toast.promise(
                    async () => { 
                        const { user } = await signUpWithEmailAndPassword(email, password);
                        return await createUserFromAuth(user, {displayName}); 
                    },
                    {
                        pending: 'Creating account',
                        success: {
                          render(){
                              navigate('/');
                              resetFormFields();
                              return 'Account successfully created';
                          }
                        },
                        error: {
                            render({data}){
                                switch (data.code) {
                                    case 'auth/email-already-in-use':
                                        return 'Email is already registered.'
                                    default:
                                        console.log(data.message);
                                }
                            }
                        }
                    }, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    }
                )

            } catch (err) {
                console.log('Encountered an error while saving the account.', err);
            }
            
        } else {
            alert('password does not match');
            return;
        }

    }

    // const validate = (value) => {
 
    //     if (validator.isStrongPassword(value, {
    //         minLength: 8, minLowercase: 1,
    //         minUppercase: 1, minNumbers: 1, minSymbols: 1
    //     })) {
    //         setErrorMessage('Is Strong Password');
    //         return true;
    //     } else {
    //         setErrorMessage('Is Strong Password');
    //         return false;
    //     }
    
    // }

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label="Name"
                    type="text" 
                    name="displayName" 
                    pattern="[a-zA-Z]+" 
                    value={displayName} 
                    onChange={handleChange} 
                    required />

                <FormInput 
                    label="Email"
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={handleChange} 
                    required />

                <FormInput 
                    label="Password"
                    type="password" 
                    minLength='8' 
                    name="password" 
                    value={password} 
                    onChange={handleChange} 
                    required />

                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    minLength='8' 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={handleChange} 
                    required />

                <Button type="submit">Register</Button>

            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;