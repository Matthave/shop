import React, {useState, useEffect} from 'react';
import { NavLink} from "react-router-dom";



function Register() {
    const [inputLogin, setInputLogin] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputLastname, setInputLastname] = useState("");
    const [inputEmail, setInputEmail] = useState("");

    const [canBeRegister, setCanBeRegister] = useState(false);

    useEffect(() => {
        window.addEventListener("keyup", (e)=> tabInputControl(e))
    },);

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

        if(name === "login"){
            setInputLogin(value);
        }else if (name === "password"){
            setInputPassword(value);
        }else if (name === "name"){
            setInputName(value);
        }else if (name === "lastname"){
            setInputLastname(value);
        }else if (name === "email"){
            setInputEmail(value);
        }

      }

      const inputsOnClick = (whichInput) => {
        const clickedPlaceholder  = document.querySelector(`.${whichInput}`);
        const everyPlaceholder = [...document.querySelectorAll(".register__inputPlaceholder")];


        everyPlaceholder.forEach((ele)=>{
            const eleInputValue = ele.parentNode.children[0].value;
            if(eleInputValue === ""){
                ele.classList.remove("register__inputPlaceholder--topPosition");
            }
        })

        if(whichInput){
            clickedPlaceholder.classList.add("register__inputPlaceholder--topPosition");
        }
    }

    const sendRegisterFormClick = () => {
        const result = {
            inputLogin:inputLogin.toLocaleLowerCase(),
            inputPassword,
            inputName:inputName.toLocaleLowerCase(),
            inputLastname:inputLastname.toLocaleLowerCase(),
            inputEmail:inputEmail.toLocaleLowerCase()
        };

        //Validation
        const errorMessage = document.querySelector(".register__error");
        const allInputs = [...document.querySelectorAll(".register__input")];
        const emailPatter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //Clear error border of all inputs
        allInputs.forEach((input)=>{
            input.classList.remove("register__input--errorEffect");
        })

        if(  result.inputLogin.length === 0 && result.inputPassword.length === 0 && result.inputName.length === 0 && result.inputLastname.length === 0 && result.inputEmail.length === 0){
            allInputs.forEach((input)=>{
                input.classList.add("register__input--errorEffect");
            });
            return errorMessage.textContent = "All field must be completed";
        } else if (result.inputPassword.length < 8){
            const passwordInput = document.getElementsByName("password");
             passwordInput[0].classList.add("register__input--errorEffect");
            return errorMessage.textContent = "Password is too short. Must be at least 8 characters long.";
        } else if (!emailPatter.test(result.inputEmail.toLowerCase())){
            const emailInput = document.getElementsByName("email");
            emailInput[0].classList.add("register__input--errorEffect");
            return errorMessage.textContent = "Invalid email format, try to use e.g example@example.com ";
        }else if (result.inputName.length < 2){
            const nameInput = document.getElementsByName("name");
            nameInput[0].classList.add("register__input--errorEffect");
            return errorMessage.textContent = "Name is too short. Must be at least 2 characters long.";
        }else if (result.inputLastname.length < 2){
            const lastnameInput = document.getElementsByName("lastname");
            lastnameInput[0].classList.add("register__input--errorEffect");
            return errorMessage.textContent = "Lastname is too short. Must be at least 2 characters long.";
        }

        //GET ALL USERS 
        fetch("https://frozen-meadow-90134.herokuapp.com/api/users/", {
            headers: {
              "Accept": "application/json",
              "Authorization": "Token b11f01192e01e415d7a62cbff8293bc14a604df3",
              "X-Csrftoken": "RvgTohAOP8A1rTRIUTjLR8q5qo689sdVV3rIiMoeWxXpB7BUs5T009vRhIZpz25M"
            }
          }).then(response => response.json())
            .then(data => {
            checkRegisterUsers(data,result);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
    }

            

       const  checkRegisterUsers = (allUsers,result) => {
            const allUsersCopy = [...allUsers];
            const isLoginAvailable = allUsersCopy.filter(user => user.username === result.inputLogin);
            const isEmailAvailable = allUsersCopy.filter(user => user.email === result.inputEmail);
            const errorMessage = document.querySelector(".register__error");
            const allInputs = [...document.querySelectorAll(".register__input")];

            if(isLoginAvailable.length > 0){
              return errorMessage.textContent = "This login is taken. Please choose another one.";
            }
            if(isEmailAvailable.length > 0){
               return errorMessage.textContent = "This email is already assigned to another account!";
            }

            errorMessage.textContent = "";
            allInputs.forEach((input)=>{
                input.classList.remove("register__input--errorEffect");
                input.textContent = "";
            });

            setCanBeRegister(true);

            //POST NEW USER
                    fetch("https://frozen-meadow-90134.herokuapp.com/api/users/", {
                    body:JSON.stringify({          
                        email: result.inputEmail,
                        username: result.inputLogin,
                        password: result.inputPassword,
                        first_name: result.inputName,
                        last_name: result.inputLastname
                        }),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": "Token b11f01192e01e415d7a62cbff8293bc14a604df3",
                        "X-Csrftoken": "RvgTohAOP8A1rTRIUTjLR8q5qo689sdVV3rIiMoeWxXpB7BUs5T009vRhIZpz25M"
                    },
                    method: "POST"
                    })               
                       .then(response => response.json())
                      .then(data => {
                        console.log('Success:', data);
                      })
                      .catch((error) => {
                        console.error('Error:', error);
                      });
        }

    
    return (
        <section className="register">
            <div className="register__form">
                <p className="register__title">Create Account</p>
                <div className="register__inputWrap">
                    <div className="register__singleInputWrap" onClick={()=>inputsOnClick("loginPlaceholder")}>
                        <input type="text" name="login" autoComplete="off" className="register__input" onChange={inputsOnChange} value={inputLogin}/>
                        <p className="register__inputPlaceholder loginPlaceholder">Login</p>
                    </div>

                    <div className="register__singleInputWrap" onClick={()=>inputsOnClick("passwordPlaceholder")}>
                        <input type="password" name="password" autoComplete="off" className="register__input" onChange={inputsOnChange} value={inputPassword}/>
                        <p className="register__inputPlaceholder passwordPlaceholder">Password</p>
                    </div>

                    <div className="register__singleInputWrap" onClick={()=>inputsOnClick("namePlaceholder")}>
                        <input type="text" name="name" autoComplete="off" className="register__input" onChange={inputsOnChange} value={inputName}/>
                        <p className="register__inputPlaceholder namePlaceholder">Name</p>
                    </div>
                   
                    <div className="register__singleInputWrap" onClick={()=>inputsOnClick("lastnamePlaceholder")}>
                        <input type="text" name="lastname" autoComplete="off" className="register__input" onChange={inputsOnChange} value={inputLastname}/>
                        <p className="register__inputPlaceholder lastnamePlaceholder">Lastname</p>
                    </div>

                    <div className="register__singleInputWrap register__lastInput" onClick={()=>inputsOnClick("emailPlaceholder")}>
                        <input type="email" name="email" autoComplete="off" className="register__input" onChange={inputsOnChange} value={inputEmail}/>
                        <p className="register__inputPlaceholder emailPlaceholder">E-mail address</p>
                    </div>
                  
                        <p className="register__error"></p>
                        {canBeRegister ? 
                        <p className="register__success">Successful!</p>
                        :
                        <button className="register__btn" onClick={sendRegisterFormClick}>Register</button>
                        }

                </div>
                <p className="register__footer">Do You have account already?<br/>
                Sign in to your account by <NavLink to="/sign-in" className="register__redirect">click here!</NavLink>
                </p>
            </div>
        </section>
    )
}

export default Register
