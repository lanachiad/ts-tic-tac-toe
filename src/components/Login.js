import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import "../styles/Login.css";

function Login() {
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    submitEmail(e.target[0].value);
  };

  const submitEmail = (string) => {
    axios
      .post(
        "https://d9u7x85vp9.execute-api.us-east-2.amazonaws.com/production/auth",
        {
          email: string,
        }
      )
      .then((res) => {
        if (res.data.success) {
          // store token in user session storage
          sessionStorage.setItem("token", res.data.token);
          // TODO: add timestamp that we can check after X amount of time to "validate" token
          setTimeout(() => {
            setLoading(false);
            window.location.reload();
          }, "1000");
        }
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_RESPONSE") {
          setErrMsg("Invalid email address. Please try again!");
        }
      });
  };

  return (
    <div className="Login">
      {loading ? <Loading /> : null}
      <h2>Login with your email to play</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          required
        />
        <button type="submit">Let's Play</button>
      </form>

      {errMsg.length > 0 ? <p>{errMsg}</p> : null}
    </div>
  );
}

export default Login;
