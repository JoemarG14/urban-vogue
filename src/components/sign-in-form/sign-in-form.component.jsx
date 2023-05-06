import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button, { BUTTON_TYPE } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { SignInContainer, SignInButtonsContainer, GoogleLogo } from './sign-in-form.styles'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { emailSignInStart, googleSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = ()  => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const loginWithGoogle = () => {
        dispatch(googleSignInStart(navigate))
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(emailSignInStart(email, password, navigate, resetFormFields))
    }

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label="Email"
                    autoComplete="none"
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={handleChange}
                    required />

                <FormInput 
                    label="Password"
                    autoComplete="none"
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={handleChange}
                    required />

                <SignInButtonsContainer>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType={BUTTON_TYPE.google} onClick={loginWithGoogle}>
                        <GoogleLogo />Sign in with Google
                    </Button>
                </SignInButtonsContainer>

            </form>
        </SignInContainer>
    )
}

export default SignInForm;