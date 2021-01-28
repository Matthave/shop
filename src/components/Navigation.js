import React, {useState, useEffect} from 'react';
import cx from "classnames";
import logo from '../images/mp.svg'

function Navigation() {
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [isThatMobile, setIsThatMobile] = useState(false);

    useEffect(() => {
        const windowWidth = window.innerWidth;
        if(windowWidth > 1023){
            setIsThatMobile(true);
        }
    }, []) 


    const burgerOnClick = () =>{
        setShowMobileNav(!showMobileNav);
    }

    const mobileNavClasses = cx({
        "navMobile": true,
        "navMobile--show": showMobileNav,
      });

    return (
        <>
            <nav className="nav">
                <ul className="nav__ul">
                    {isThatMobile ?
                    <>
                     <li className="nav__li"><a href="/" className="nav__link">Home</a></li>
                    <li className="nav__li"><a href="/" className="nav__link">About a brand</a></li>
                    <li className="nav__li"><a href="/" className="nav__link">Shop</a></li>
                    <li className="nav__li"><a href="/" className="nav__link"><img className="nav__logo" src={logo} alt=""/></a></li>
                    <li className="nav__li"><a href="/" className="nav__link">Your Account</a></li>
                    <li className="nav__li"><a href="/"  className="nav__link">Basket</a></li>
                    <li className="nav__li"><a href="/" className="nav__link">Contact</a></li>
                    </>
                    :
                    <>
                    <li className="nav__li">
                        <div className="burger" onClick={()=> burgerOnClick()}>
                            <div className="burger__bar burger__barOne"></div>
                            <div className="burger__bar burger__barTwo"></div>
                            <div className="burger__bar burger__barThree"></div>
                        </div>
                    </li>
                    </>
                    }

                </ul>
            </nav>

            {!isThatMobile ?
            
        <nav className={mobileNavClasses}>
            <ul className="navMobile__ul">
                <li className="navMobile__li"><a href="/" className="navMobile__link">Home</a></li>
                <li className="navMobile__li"><a href="/" className="navMobile__link">About a brand</a></li>
                <li className="navMobile__li"><a href="/" className="navMobile__link">Shop</a></li>
                <li className="navMobile__li"><a href="/" className="navMobile__link"><img className="navMobile__logo" src={logo} alt=""/></a></li>
                <li className="navMobile__li"><a href="/" className="navMobile__link">Your Account</a></li>
                <li className="navMobile__li"><a href="/"  className="navMobile__link">Basket</a></li>
                <li className="navMobile__li"><a href="/" className="navMobile__link">Contact</a></li>
                <li className="navMobile__li navMobile__liLast">
                    <div className="burgerClose" onClick={()=> burgerOnClick()}>
                        <div className="burgerClose__one"></div>
                        <div className="burgerClose__two"></div>
                    </div>
                </li>
            </ul>
        </nav>

            : null}
        </>
    )
}

export default Navigation
