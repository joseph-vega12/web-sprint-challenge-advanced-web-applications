import React, { useState} from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initalForm = {
  username: "",
  password: "",
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage rout
  const history = useHistory();
  const [formValue, setFormValue] = useState(initalForm);
  // console.log(formValue);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    })
  }

  const login = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", formValue)
    .then(res => {
      localStorage.setItem("token", res.data.payload);
      history.push("/bubbles")
    })
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <Link to="/">Login</Link>
      <Link to="/bubbles">Bubbles</Link>
      <p>Build a login page here</p>
      <form onSubmit={login}>
        <label>
          username:
          <input type="text" name="username" onChange={handleChange}/>
        </label>
        <label>
          password:
          <input type="password" name="password" onChange={handleChange}/>
        </label>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
