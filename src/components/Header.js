import React, {useState, useEffect} from 'react';

function Header() {
    return (
        <header className="header">
            <p className="header__optionOne header__option">shop</p>
            <div className="header__bar header__barOne"></div>
            <p className="header__optionTwo header__option">brand</p>
            <div className="header__bar header__barTwo"></div>
            <p className="header__optionThree header__option">sign in</p>
            <div className="header__bar header__barThree"></div>           
        </header>
    )
}

export default Header
