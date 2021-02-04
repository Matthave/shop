import React, {useState, useEffect} from 'react';
import { NavLink} from "react-router-dom";
import cx from "classnames";
import $ from "jquery";
import logo from '../images/mp.svg'

function Navigation({executeScroll}) {
    const [showMobileNav, setShowMobileNav] = useState(false);
    const [isThatMobile, setIsThatMobile] = useState(false);
    const [isScrollZero, setIsScrollZero] = useState(true);

    useEffect(() => {
        const windowWidth = window.innerWidth;
        if(windowWidth > 1023){
            setIsThatMobile(true);
        }

        window.addEventListener("resize", ()=> windowResizeFeature());
        window.addEventListener("scroll", ()=> windowScrollFeature());
    }, []) 

    
    const scrollToShop = () => {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#shop").offset().top - 90,
        }, 1000);
    }

    const burgerOnClick = () =>{
        setShowMobileNav(!showMobileNav);
    }

    const windowResizeFeature = () =>{
        const windowWidth = window.innerWidth;
        if(windowWidth > 1023){
            setIsThatMobile(true);
        }else{
            setIsThatMobile(false);
        }
    }

    const windowScrollFeature = () =>{
        const scrollHeight = window.scrollY;
        if(scrollHeight === 0){
            setIsScrollZero(true);
        }else{
            setIsScrollZero(false);
        }
    }

    //ClassNames classes
    const mobileNavClasses = cx({
        "navMobile": true,
        "navMobile--show": showMobileNav,
      });

      const mobileDekstopClasses = cx({
        "nav": true,
        "nav--onZeroScroll": isScrollZero,
      });

    return (
        <>
            <nav className={mobileDekstopClasses}>
                <ul className="nav__ul">
                    {isThatMobile ?
                    <>
                     <li className="nav__li"><NavLink to="/" className="nav__link">Home</NavLink></li>
                    <li className="nav__li"><NavLink to="/" className="nav__link">About a brand</NavLink></li>
                    <li className="nav__li nav__liShop" onClick={()=>scrollToShop()}><p className="nav__link">Shop</p></li>
                    <li className="nav__li"><NavLink to="/" className="nav__link"><img className="nav__logo" src={logo} alt=""/></NavLink></li>
                    <li className="nav__li"><NavLink to="/sign-in" className="nav__link">Your Account</NavLink></li>
                    <li className="nav__li"><NavLink to="/"  className="nav__link">Basket</NavLink></li>
                    <li className="nav__li"><NavLink to="/" className="nav__link">Contact</NavLink></li>
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
                <li className="navMobile__li"><NavLink to="/" className="navMobile__link">Home</NavLink></li>
                <li className="navMobile__li"><a href="/" className="navMobile__link">About a brand</a></li>
                <li className="navMobile__li"><NavLink to="/shop" className="navMobile__link">Shop</NavLink></li>
                <li className="navMobile__li"><NavLink to="/" className="navMobile__link"><img className="navMobile__logo" src={logo} alt=""/></NavLink></li>
                <li className="navMobile__li"><NavLink to="/sign-in" className="navMobile__link">Your Account</NavLink></li>
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
