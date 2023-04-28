import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { ReactComponent as GoogleLogo } from '../../assets/google_logo.svg'
import { toast } from 'react-toastify';
import { 
    signInWithGooglePopup, 
    signInUserWithEmailAndPassword
 } from '../../utils/firebase/firebase.utils'

import './sign-in-form.styles.scss'
import 'react-toastify/dist/ReactToastify.css';

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = ()  => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    let navigate = useNavigate();

    const loginWithGoogle = async () => {
        toast.promise(
            async () => { return await signInWithGooglePopup() },
            {
              pending: 'Signing In',
              success: {
                render(){
                    navigate('/')
                    return 'Successfully signed in';
                }
              },
              error: 'System encountered an error while logging in to your account. Please try again later.'
            }, {
                position: toast.POSITION.BOTTOM_RIGHT,
            }
        )
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
        try {

            toast.promise(
                async () => { return await signInUserWithEmailAndPassword(email, password) },
                {
                  pending: 'Signing In',
                  success: {
                    render(){
                        navigate('/');
                        resetFormFields();
                        return 'Successfully signed in';
                    }
                  },
                  error: {
                    render({data}){
                        switch (data.code) {
                            case 'auth/wrong-password':
                                return 'Incorrect password for the given email.'
                            case 'auth/user-not-found':
                                return 'No user associated with this email.'
                            case 'auth/too-many-requests':
                                return 'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
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
            console.log(err);
        }
    }

    return (
        <div className="sign-in-container">
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

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType='google' onClick={loginWithGoogle}>
                        <GoogleLogo className='google-logo'/>Sign in with Google
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;