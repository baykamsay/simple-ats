import React, { useState, useEffect } from "react";
import Router from "next/router";
import cookie from "js-cookie";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    //call api
    fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((r) => {
        return r.json();
      })
      .then(async (data) => {
        if (data && data.error) {
          setLoginError(data.message);
        }
        if (data && data.token) {
          //set cookie
          cookie.set("token", data.token, { expires: 2, secure: true });
          Router.push("/ats");
        }
      });
  }

  useEffect(() => {
    Router.prefetch("/ats");
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <p>Login</p>
      <input
        name="username"
        type="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="Submit" />
      {loginError && <p style={{ color: "red" }}>{loginError}</p>}
    </form>
  );
};

export default Login;
