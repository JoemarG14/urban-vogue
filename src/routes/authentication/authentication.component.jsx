import './authentication.styles.scss'

import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { Fragment } from 'react';

const Authentication = () => (
    <Fragment>
        <div className='authentication-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>
    </Fragment>
)

export default Authentication;