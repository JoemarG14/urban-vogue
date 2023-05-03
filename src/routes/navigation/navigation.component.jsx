
import { Outlet, useNavigate } from "react-router-dom";
import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";

import { signOutUser } from "../../utils/firebase/firebase.utils";
import { CartContext } from '../../contexts/cart.context';

import {
    NavigationContainer,
    LogoContainer,
    Logo,
    NavLinks,
    NavLink
} from './navigation.styles'

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { selectorUserInfo } from "../../store/user/user.selector";

const Navigation = () => {

    const userInfo = useSelector(selectorUserInfo);
    const { isOpen, closeCartPopUp } = useContext(CartContext);
    const navigate = useNavigate();

    const signOuthandler = async () => {
        await signOutUser();
        navigate('/auth');
        closeCartPopUp();
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/' onClick={closeCartPopUp}>
                    <Logo />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop' onClick={closeCartPopUp}>
                        SHOP
                    </NavLink>
                    {
                        userInfo ? (
                            <Fragment>
                                <NavLink as='span' onClick={signOuthandler}>
                                    SIGN OUT
                                </NavLink>
                                <CartIcon/>
                            </Fragment>
                        ) : (
                            <NavLink to='/auth'>
                                SIGN IN
                            </NavLink>
                        )
                    }
                </NavLinks>
                { isOpen && <CartDropDown/> } 
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;