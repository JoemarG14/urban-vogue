import { useState } from "react";
import { useNavigate } from "react-router-dom";

import './sign-up-form.styles.scss'

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

                const { user } = await signUpWithEmailAndPassword(email, password);

                await createUserFromAuth(user, {displayName});
                resetFormFields();
                navigate('/');

            } catch (err) {

                if (err.code === 'auth/email-already-in-use') {
                    alert('Email is already registered.');
                } else {
                    console.log('Encountered an error while saving the account.', err);
                }
                
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
        <div className="sign-up-container">
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
        </div>
    )
}

export default SignUpForm;