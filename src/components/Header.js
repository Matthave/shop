import React from 'react';
import { NavLink} from "react-router-dom";



function Header({executeScroll}) {
    return (
        <header className="header">
            <p className="header__optionOne header__option" onClick={executeScroll}>shop</p>
            <div className="header__bar header__barOne"></div>
            <NavLink className="header__optionTwo header__option" to="/">brand</NavLink>
            <div className="header__bar header__barTwo"></div>
            <NavLink className="header__optionThree header__option" to="/sign-in">sign in</NavLink>
            <div className="header__bar header__barThree"></div>  
        </header>
    )
}

export default Header
