import { AuthenticationContainer } from './authentication.styles'

import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { Fragment } from 'react';

const Authentication = () => (
    <Fragment>
        <AuthenticationContainer>
            <SignInForm/>
            <SignUpForm/>
        </AuthenticationContainer>
    </Fragment>
)

export default Authentication;