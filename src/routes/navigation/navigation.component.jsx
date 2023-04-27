
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Fragment, useContext } from "react";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from '../../contexts/cart.context';

import './navigation.styles.scss'
import { ReactComponent as UrbanLogo } from '../../assets/logo.svg'
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";

const Navigation = () => {

    const { userInfo } = useContext(UserContext);
    const { isOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const signOuthandler = async () => {
        await signOutUser();
        navigate('/auth');
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
                            <Fragment>
                                <span className="nav-link" onClick={signOuthandler}>
                                    SIGN OUT
                                </span>
                                <CartIcon/>
                            </Fragment>
                        ) : (
                            <Link className="nav-link" to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }
                </div>
                { isOpen && <CartDropDown/> }
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;