import React,{ useState } from "react";
import axios from "axios";
//hooks
import { useCookies } from "react-cookie"; 
import { useNavigate } from "react-router-dom";


export const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};


//----------------------------------------------------------------------------------------------------------------------

const Login = () => {

  const [_, setCookies] = useCookies(["access_token"]); //"access_token"=cookie name //we only have access to setCookies fun 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      //await axios.method{} -> object for the body of the req
      const result = await axios.post("http://localhost:7000/auth/login", {
        "username":username,
        "password":password,
      });


      // setCookies("access_token", result.data.token);//we are setting `result.data.token` value in access_token
      // window.localStorage.setItem("userID", result.data.userID);///we are storing userId in localStorage for quick access
  

      if (result.ok) {
        console.log(result);
        setUsername("");
        setPassword("");
        navigate("/");
      }

      navigate("/");

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>


        <button type="submit" className="btn btn-success">
        Login
        </button>

      </form>
    </div>

    </>
  );
};



//----------------------------------------------------------------------------------------------------------------------


const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [_, setCookies] = useCookies(["access_token"]);  //"access_token"=cookie name //we only have access to setCookies fun 
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result= await axios.post("http://localhost:7000/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
      
      if (result.status==201 ) {
        console.log(result);
        setUsername("");
        setPassword("");
      }

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)} //to grab input value
          />
        </div>


        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
        Register
        </button>

      </form>
    </div>

    </>
  );
};

//--------------------------------------------------------------------------------


