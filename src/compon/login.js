import React, {useState} from "react"
import axios from "axios"


function LoginPage(){
    const [registerUsername, setRegisterUsername] = useState("")
    const [regiserPassword, setRegisterPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

// const register = () => {
//     axios({
// method: "POST",
// data: {
//     username: registerUsername,
//     password: setRegisterPassword
// },
// withCredentials:true,
// // url: "http://localhost:5000/register",
// // url: "/register"
// })
// .then((res) => console.log(res))};

const register = () => {
 const userData = {
     username: registerUsername,
     password: regiserPassword,
     userid: Number(Math.round((Math.random() * (10000 -1)+ 1) ))

 }
 axios.post("http://localhost:5000/users/add", userData, {withCredentials: true})
//  .then(res => console.log(res.data))
.then(alert("Thank you for joining!"))
window.location ="/createSession"
}
//keeps returning that it can not find user with get method
const login = () => {
    let data = {
        username: loginUsername,
        password: loginPassword
        // username: "steven",
        // password: "$2b$10$idxWDp96IB.PFoMwxOg3dOdOt/aDz3RpOb1BmEs9jqZnAaOIOV6Bi"
    }
    axios.post("http://localhost:5000/users/login", data, {withCredentials: true})
    .then((res) => console.log(res))
}

    return(
        <div>
            <h1>Hello! Welcome to tutor helper!</h1>
            <p>Tutor helper allows you to quickly and easily save all of your tutoring sessions. With a few clicks you will be able to log all sessions and quickly send over the invoice for payment.</p>
            <h1>Login</h1>
            <input placeholder="username please" onChange={e => setLoginUsername(e.target.value)} />
            <input placeholder = "password please" onChange={e => setLoginPassword(e.target.value)} />
            <input type="submit" onClick={login}/>
            <br></br>
            <br></br>
            <h1>Create a free account</h1>
            <input placeholder="username please" onChange={e => setRegisterUsername(e.target.value)} />
            <br/>
            <input type="password" placeholder = "password please" onChange={e => setRegisterPassword(e.target.value)} />
            <br/>
            {/* <input placeholder = "first name please" /> */}
        <br/>
            <input type="submit" onClick={register}/>
            <p>Your chosen Username is : {registerUsername}</p>
            <p>Your chosen Password is :{regiserPassword}</p>
        </div>
    )

}

export default LoginPage