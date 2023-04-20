
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";

import './navigation.styles.scss'
import { ReactComponent as UrbanLogo } from '../../assets/logo.svg'

const Navigation = () => {
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
                    <Link className="nav-link" to='/shop'>
                        SIGN IN
                    </Link>
                </div>
            </div>
            
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;