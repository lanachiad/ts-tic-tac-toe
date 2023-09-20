import React from "react";
import axios from "axios";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail(e.target[0].value);
  };

  const validateEmail = (string) => {
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
          // display err message
        }
      });
  };

  return (
    <div className="Login">
        <h2>Login with your email to play</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your email"
          name="email"
          required
        />
        <button type="submit">Let's Play</button>
      </form>
    </div>
  );
}

export default Login;
