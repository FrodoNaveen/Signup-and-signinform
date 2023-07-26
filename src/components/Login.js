import React from "react"
import {useNavigate} from "react-router-dom"
import { useEffect } from "react";
import Cookies from "js-cookie"


export default function Login(){

    const navigate = useNavigate()

  const [login, setLogIn] = React.useState({
       email: "",
       password: ""
     });

     function onChangedata(event) {
       setLogIn((prevLogin) => {
         return {
           ...prevLogin,
           [event.target.name]: event.target.value
         };
       });
     }

     useEffect(() => {
       const isLoggedIn = Cookies.get('email');
       isLoggedIn ? navigate("/search") : navigate("/login");
     },[navigate]);

     
      function getData(event) {
        event.preventDefault();

        let data = JSON.parse(localStorage.getItem("myData"));

        function checkData() {
            
          for (let i = 0; i < data.length; i++) {
            if (
              data[i].email === login.email &&
              data[i].password === login.password
            ) {
              return true;
            }
          }
        }

        const loginSuccessFn = () => {
            Cookies.set('email', login.email)
            navigate("/search");
        }

      

        return checkData() === true
          ? loginSuccessFn()
          : alert("email and password does not match");
}

    return (
      <div>
        <form onSubmit={getData}>
          <input
            type="text"
            placeholder="email"
            onChange={onChangedata}
            value={login.email}
            name="email"
            required
            autoComplete="off"
          ></input>
          <br></br>
          <br></br>
          <input
            type="password"
            placeholder="password"
            onChange={onChangedata}
            value={login.password}
            name="password"
            minLength="7"
            required
          ></input>
          <br></br>
          <br></br>
           <button>Login</button>
        </form>
        <br></br>
      </div>
    );
}