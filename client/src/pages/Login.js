import React, {useRef} from "react";

import { useLogin } from "../utils/auth";

function Login() {

  const emailInput = useRef();
  const passwordInput = useRef();

  const login = useLogin();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const password = passwordInput.current.value;


    // Auto Login after registration
    await login({ email, password });

    window.location.href = "./";
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="email" ref={emailInput} />
        <input
          type="password"
          name="password"
          placeholder="password"
          ref={passwordInput}
        />
        <button>Login</button>
   
      </form>
    </div>
  );
}

export default Login;
