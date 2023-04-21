import { signInWithGooglePopup, createUserFromPopUp } from '../../utils/firebase/firebase.utils'

const SignIn = () => {

    const loginWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        const userRef = await createUserFromPopUp(user);
        console.log(userRef);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={loginWithGoogle}>
                Sign in with Google
            </button>
        </div>
    )
}

export default SignIn;