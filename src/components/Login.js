import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
          window.location.reload();
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
