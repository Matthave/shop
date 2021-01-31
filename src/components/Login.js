import React, {useState, useEffect} from 'react';
import { NavLink} from "react-router-dom";

function Login() {
    useEffect(() => {
        window.addEventListener("keyup", (e)=> tabInputControl(e))
    },)

    const [inputLogin, setInputLogin] = useState("");
    const [inputPassword, setInputPassword] = useState("");

    const [logIn, setLogIn] = useState("");

    const inputsOnClick = (whichInput) => {
        const clickedPlaceholder  = document.querySelector(`.${whichInput}`);
        const everyPlaceholder = [...document.querySelectorAll(".login__inputPlaceholder")];


        everyPlaceholder.forEach((ele)=>{
            const eleInputValue = ele.parentNode.children[0].value;
            if(eleInputValue === ""){
                ele.classList.remove("login__inputPlaceholder--topPosition");
            }
        })

        if(whichInput){
            clickedPlaceholder.classList.add("login__inputPlaceholder--topPosition");
        }
    }

    const tabInputControl = (e) => {
        //Tab Handler for input swap with nice placeholder effect
        if(e.which === 9){
            if(e.target.name){
                inputsOnClick(e.target.parentNode.children[1].classList[1]);
            }
        }
    }


    const inputsOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if(name === "log"){
            setInputLogin(value);
        }else if (name === "pass"){
            setInputPassword(value);
        }
    }

    const sendRegisterFormClick = () => {
        const result = {
            inputLogin:inputLogin.toLowerCase(),
            inputPassword,
        };

        //Validation
        const errorMessage = document.querySelector(".login__error");
        const allInputs = [...document.querySelectorAll(".login__input")];

        //Clear error border of all inputs
        allInputs.forEach((input)=>{
            input.classList.remove("login__input--errorEffect");
        })

        if(  result.inputLogin.length === 0 && result.inputPassword.length === 0){
            allInputs.forEach((input)=>{
                input.classList.add("login__input--errorEffect");
            });
            return errorMessage.textContent = "All field must be completed";
        } else if (result.inputPassword.length < 8){
            const passwordInput = document.getElementsByName("pass");
             passwordInput[0].classList.add("login__input--errorEffect");
            return errorMessage.textContent = "Password is too short. Must be at least 8 characters long.";
        } else if (result.inputPassword.length < 2){
            const logInput = document.getElementsByName("log");
            logInput[0].classList.add("login__input--errorEffect");
            return errorMessage.textContent = "Login is too short. Must be at least 2 characters long.";
        }

        errorMessage.textContent = "LOADING...";
        //POST AUTH
        fetch("https://frozen-meadow-90134.herokuapp.com/api/token/login/", {
            body:JSON.stringify({          
                username: result.inputLogin,
                password: result.inputPassword,
                }),
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
              "Authorization": "Token b11f01192e01e415d7a62cbff8293bc14a604df3",
              "X-Csrftoken": "7WulDjZmLNgW6xYWvdGemQyIjXbl14hdbuFaxONMScDkgLI83pgtvRDuah4CrE94"
            },
            method: "POST"
          })
          .then(response => response.json())
          .then(data => {
            if(data.auth_token){
                setLogIn(true);
                errorMessage.textContent = "";

                const cname = "isLogin";
                const cvalue = true;
                const exdays = 1;
                setCookie(cname,cvalue,exdays)

                function setCookie(cname, cvalue, exdays) {
                    var d = new Date();
                    d.setTime(d.getTime() + (exdays*24*60*60*1000));
                    var expires = "expires="+ d.toUTCString();
                    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
                  }

            }else{
                invalidData()
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }

    const  invalidData = () => {
        const errorMessage = document.querySelector(".login__error");
        const allInputs = [...document.querySelectorAll(".login__input")];

        errorMessage.textContent = "Something went wrog. Invalid login or password.";
        allInputs.forEach((input)=>{
            input.classList.remove("login__input--errorEffect");
            input.textContent = "";
        });
    }

    return (
        <section className="login">
            <div className="login__form">
                <p className="login__title">Sign In</p>
                <div className="login__inputWrap">
                    <div className="login__singleInputWrap" onClick={()=>inputsOnClick("logPlaceholder")}>
                        <input type="text" name="log" autoComplete="off" className="login__input" onChange={(e)=>inputsOnChange(e)} value={inputLogin}/>
                        <p className="login__inputPlaceholder logPlaceholder">Login</p>
                    </div>

                    <div className="login__singleInputWrap login__lastInput" onClick={()=>inputsOnClick("passPlaceholder")}>
                        <input type="password" autoComplete="off" name="pass" className="login__input" autoComplete="new-password" onChange={(e)=>inputsOnChange(e)} value={inputPassword}/>
                        <p className="login__inputPlaceholder passPlaceholder">Password</p>
                    </div>
                    <p className="login__error"></p>
                    {logIn ? 
                     <p className="register__success">You are Log In!</p>
                     :
                     <button className="login__btn" onClick={sendRegisterFormClick}>Log In</button>
                     }
                            
                </div>
                <p className="login__footer">You don't have account yet?<br/>
                Register Your account by <NavLink to="/register" className="logn__redirect">click here!</NavLink>
                </p>
            </div>
        </section>
    )
}

export default Login
