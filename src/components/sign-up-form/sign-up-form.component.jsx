import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { SignUpContainer } from './sign-up-form.styles'

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";

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
    const dispatch = useDispatch();

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
            dispatch(signUpStart(email, password, { displayName }, navigate, resetFormFields))
        } else {
            toast.success(`Password does not match.`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return;
        }

    }

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