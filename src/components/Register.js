import React from 'react'

function Register() {
    return (
        <section className="register">
            <div className="register__form">
                <p className="register__title">Create Account</p>
                <div className="register__inputWrap">
                    <input type="text" placeholder="Login:" className="register__input"/>
                    <input type="password" placeholder="Password:" className="register__input"/>
                    <input type="text" placeholder="Name:" className="register__input"/>
                    <input type="email" placeholder="E-mail address:" className="register__input"/>
                    <input type="number" placeholder="Phone:" className="register__input"/>
                        <button className="register__btn">Register</button>
                </div>
                <p className="register__footer">Do You have account already?<br/>
                Sign in to your account by <a href="/sign-in" className="register__redirect">click here!</a>
                </p>
            </div>
        </section>
    )
}

export default Register
