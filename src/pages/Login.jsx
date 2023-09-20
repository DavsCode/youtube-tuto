import { useRef, useState } from "react";
import "../assets/css/login.css";

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    if (emailRef?.current) {
      emailRef.current.value = "";
    }
    if (passRef?.current) {
      passRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const creds = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    console.log("login", creds);

    clearInputs();
    setLoading(false);
  };
  return (
    <div className="login">
      <div className="wrapper">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          {error && <span className="error-msg">{error}</span>}
          <input required ref={emailRef} type="email" placeholder="Email" />
          <input
            required
            ref={passRef}
            type="password"
            placeholder="Password"
          />
          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "Login"}
          </button>
          <span className="link">
            <a href="/register">No account? Register here.</a>
          </span>
        </form>
      </div>
    </div>
  );
}
