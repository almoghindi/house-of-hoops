import React,{ useState, useRef } from "react";
import "./ForgetPassword.css";
import logo from "../../public/houseOfHoops.svg";
import { Link } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";

const ForgetPassword = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const emailInputRef = useRef("");
  const [errorText, setErrorText] = useState("");
  const [classError, setClassError] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/users/forgetPassword`,
        "POST",
        JSON.stringify({
          email: emailInputRef.current.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      if (responseData.error) {
        setErrorText(responseData.error);
        setClassError("error");
      }
    } catch (err) {}
  };

  return (
    <div className="auth_class">
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6 welcome_auth">
            <div className="auth_welcome">
              Let's be a part from the biggest NBA community{" "}
              <span>
                <a href="/">"House of Hoops"</a>
              </span>
            </div>
          </div>
          <div className="col-md-6 login-form">
            <div className="login_form_in">
              <div className="auth_branding">
                <a className="auth_branding_in" href="/">
                  <img src={logo} alt="House of Hoops" />
                </a>
              </div>
              <h1 className="auth_title text-left">Forget Password ?</h1>
              <form onSubmit={submitHandler}>
                <div
                  className="alert alert-success bg-soft-primary border-0"
                  role="alert"
                >
                  Enter your email address and we'll send you an email with
                  instructions to reset your password.
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={`form-control ${classError}`}
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    ref={emailInputRef}
                  />
                  <p className="error-text">{errorText}</p>
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Reset Password
                  </button>
                </div>
                <div className="form-group other_auth_links">
                  <Link to="/auth">
                    <span className="">Login</span>
                  </Link>
                  <Link to="/auth">
                    <span className="">Register</span>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;;