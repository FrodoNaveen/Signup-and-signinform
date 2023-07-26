import React  from "react";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom"


export default function Signup(){

    const [dataBase, setDataBase] = useState([]);

    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
      
    });
    

    useEffect(() => {
      const dataFromLs = JSON.parse(localStorage.getItem("myData")) || [];
      setDataBase(dataFromLs);
    }, []);

    function changeData(event) {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          [event.target.name]: event.target.value,
        };
      });
    }

    

    function setData() {
      
       function checkEmail() {
         for (let i = 0; i <= dataBase.length; i++) {
          if (dataBase[i].email === formData.email) {
            return true;
          }
        }
      }
      let db = [...dataBase];
      db.push(formData);
      let newDataBase = JSON.stringify(db);

      const signUpSuccess = ()=>{
        alert("Database created")
        localStorage.setItem('myData',newDataBase)
      }

      

      return checkEmail() === true
        ? alert("email already exists")
        : signUpSuccess()

     }

    return (
      <form
        onSubmit={(e) => {
            e.preventDefault()
          setData();
        }}
      >
        <input
          type="text"
          placeholder="firstname"
          value={formData.firstName}
          name="firstName"
          onChange={changeData}
          autoComplete="off"
          required
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Lastname"
          value={formData.lastName}
          name="lastName"
          onChange={changeData}
          autoComplete="off"
          required
        />{" "}
        <br />
        <br />
        <input
          type="text"
          placeholder="email"
          value={formData.email}
          name="email"
          onChange={changeData}
          autoComplete="off"
          required
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="password"
          value={formData.password}
          name="password"
          onChange={changeData}
          required
          minLength="7"
        />
        <br />
        <br />
        <button>Signup</button>
        
        <br />
        <br />
        <Link to="/login">
          <button>Already an user? Log in</button>
        </Link>
      </form>
    );
}