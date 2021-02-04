import React from 'react';
import { NavLink} from "react-router-dom";
import $ from "jquery";



function Header({executeScroll}) {

    const scrollToShop = () => {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#shop").offset().top - 90,
        }, 1000);
    }

    return (
        <header className="header">
            <p className="header__optionOne header__option" onClick={()=> scrollToShop()}>shop</p>
            <div className="header__bar header__barOne"></div>
            <NavLink className="header__optionTwo header__option" to="/">brand</NavLink>
            <div className="header__bar header__barTwo"></div>
            <NavLink className="header__optionThree header__option" to="/sign-in">sign in</NavLink>
            <div className="header__bar header__barThree"></div>  
        </header>
    )
}

export default Header
