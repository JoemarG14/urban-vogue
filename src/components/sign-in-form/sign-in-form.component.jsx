import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { UserContext } from "../../contexts/user.context";
import './sign-in-form.styles.scss'

import { ReactComponent as GoogleLogo } from '../../assets/google_logo.svg'
import { 
    signInWithGooglePopup, 
    createUserFromAuth,
    signInUserWithEmailAndPassword
 } from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
    email: '',
    password: ''
};

const SignInForm = ()  => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const navigate = useNavigate();

    const { userInfo, setUserInfo } = useContext(UserContext);

    const loginWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserFromAuth(user);
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
            const { user } = await signInUserWithEmailAndPassword(email, password);
            setUserInfo(user);
            resetFormFields();
            navigate('/', { replace: true });
        } catch (err) {
            switch (err.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for the given email.')
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email.')
                    break;
                default:
                    console.log(err);
            }
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