
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Fragment, useContext } from "react";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";

import './navigation.styles.scss'
import { ReactComponent as UrbanLogo } from '../../assets/logo.svg'

const Navigation = () => {

    const { userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const signOuthandler = async () => {
        await signOutUser();
        setUserInfo(null);
        navigate('/', { replace: true });
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <UrbanLogo className="logo"/>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to='/shop'>
                        SHOP
                    </Link>
                    <Link className="nav-link" to='/shop'>
                        CONTACT
                    </Link>
                    {
                        userInfo ? (
                            <span className="nav-link" onClick={signOuthandler}>
                                SIGN OUT
                            </span>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }
                </div>
            </div>
            
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;