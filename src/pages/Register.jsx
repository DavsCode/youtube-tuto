import { useRef, useState } from "react";
import "../assets/css/register.css";

export default function Register() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clearInputs = () => {
    if (emailRef?.current) {
      emailRef.current.value = "";
    }
    if (nameRef?.current) {
      nameRef.current.value = "";
    }
    if (passRef?.current) {
      passRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const creds = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    console.log("register", creds);

    clearInputs();
    setLoading(false);
  };

  return (
    <div className="register">
      <div className="wrapper">
        <h2 className="heading">Register</h2>
        <form onSubmit={handleSubmit} className="form">
          {error && <span className="error-msg">{error}</span>}
          <input required ref={nameRef} type="text" placeholder="Username" />
          <input required ref={emailRef} type="email" placeholder="Email" />
          <input
            required
            ref={passRef}
            type="password"
            placeholder="Password"
          />
          <button disabled={loading} type="submit">
            {loading ? "Loading..." : "Register"}
          </button>
          <span className="link">
            <a href="/login">Already an account? Login here.</a>
          </span>
        </form>
      </div>
    </div>
  );
}
