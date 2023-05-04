
import { Outlet, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { signOutUser } from "../../utils/firebase/firebase.utils";

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
import { selectorIsOpen } from "../../store/cart/cart.selector";
import { setIsOpen } from "../../store/cart/cart.action";

const Navigation = () => {
    const dispatch = useDispatch();

    const userInfo = useSelector(selectorUserInfo);
    const isOpen = useSelector(selectorIsOpen);
    const navigate = useNavigate();

    const closeCartPopUp = () => dispatch(setIsOpen(false))

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