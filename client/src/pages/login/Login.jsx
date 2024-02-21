import { useContext, useRef, useState } from "react";
import "./login.css";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

export default function Login() {
  const { state } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState("");
  const userRef = useRef(null);
  const passRef = useRef(null);

  const handleClear = () => {
    if (passRef.current) {
      passRef.current.value = "";
    }
    if (userRef.current) {
      userRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = userRef.current?.value;
    const password = passRef.current?.value;

    if (!username || !password) {
      setErrorMessage("Username and password are required.");
      return;
    }
    console.log("Sign in...", { username, password });

    handleClear();
  };
  return (
    <div className="login">
      <div className={`wrapper ${state?.theme}`}>
        <h2 className="heading">Login</h2>
        {errorMessage && <span className="error-msg">{errorMessage}</span>}
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" ref={userRef} placeholder="Username" required />
          <input
            type="password"
            ref={passRef}
            placeholder="Password"
            required
          />
          <span className="login-terms">
            By logging in you are agreeing to our Terms of Services and Privacy
            Policy.
          </span>
          <button type="submit">Login</button>
          <div className="action">
            No Account? Sign up <Link to="/register">here.</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
