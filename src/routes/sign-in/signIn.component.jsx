import Button from '../../components/button/button.component';
import SignUp from '../../components/sign-up-form/signUpForm.component';

import './signIn.styles.scss'
import { ReactComponent as GoogleLogo } from '../../assets/google_logo.svg'

import { signInWithGooglePopup, createUserFromAuth } from '../../utils/firebase/firebase.utils'

const SignIn = () => {

    const loginWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        const userRef = await createUserFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <Button buttonType='google' onClick={loginWithGoogle}>
                <GoogleLogo className='google-logo'/>Sign in with Google
            </Button>
            <SignUp/>
        </div>
    )
}

export default SignIn;