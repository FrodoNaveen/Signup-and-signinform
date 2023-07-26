import React from "react"
import {useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import Cookies from "js-cookie";




export default function Search() {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("");
    const [api,setApi] = useState([])

    const searchData = () => {
        fetch(`https://api.coincap.io/v2/assets/?search=${searchTerm}`)
          .then((res) => {console.log('res--- ', res); return res.json()})
          .then((data) => setApi(data.data))
    }

     useEffect(()=>{
        searchData();
    },[])

    
    useEffect(()=>{
        const checkLogIn = Cookies.get('email')
       checkLogIn ? navigate("/search"): navigate('/login')
    },[navigate])


  function changeData(event) {
    console.log('event--- ', event)
    setSearchTerm(event.target.value);
  }

   function getUserName() {
      let data = JSON.parse(localStorage.getItem("myData"));
      let email = Cookies.get("email");
    //   let index = data.map((val) => {
    //     return val.email
    //   }).indexOf(email);

    //   return email
    //     ? `${data[index].firstName} ${data[index].lastName}`
    //     : navigate("/login");

        const userData = data.filter((user) => email === user.email);
        console.log("userData", userData);

        return userData.length > 0
          ? `${userData[0].firstName} ${userData[0].lastName}`
          : navigate("/login");
    }

     function logOut() {
       Cookies.remove("email");
       navigate("/login");
     }

    

const tableData =()=>{
   return (
     <table>
       <thead>
         <tr>
           <th>Rank</th>
           <th>Id</th>
           <th>Name</th>
           <th>Symbol</th>
         </tr>
       </thead>
       <tbody>
         {api.map((values, index) => (
           <tr key={index}>
             <td>{values.rank}</td>
             <td>{values.id}</td>
             <td>{values.symbol}</td>
             <td>{values.name}</td>
           </tr>
         ))}
       </tbody>
     </table>
   );
}

return (
  <div className="search">
    <input
      type="text"
      onChange={changeData}
      value={searchTerm}
      name="search"
      autoComplete="off"
      required
    />
    <button onClick={searchData}>Search</button>
    <button className="logoutbtn" onClick={logOut}>
      Logout
    </button>
    <h6 className="userName">{getUserName()}</h6>
    {tableData()}
    <br></br>
  </div>
);
}
