import React from 'react'

function Login() {
    return (
        <section className="login">
            <div className="login__form">
                <p className="login__title">Sign In</p>
                <div className="login__inputWrap">
                    <input type="text" placeholder="Login:" className="login__input"/>
                    <input type="password" placeholder="Password:" className="login__input"/>
                        <button className="login__btn">Log In</button>
                </div>
                <p className="login__footer">You don't have account yet?<br/>
                Register Your account by <a href="/register" className="logn__redirect">click here!</a>
                </p>
            </div>
        </section>
    )
}

export default Login
