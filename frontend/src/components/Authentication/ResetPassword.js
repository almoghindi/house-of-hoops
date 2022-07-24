import React, { useState, useRef, useEffect } from "react";
import "./ForgetPassword.css";
import logo from "../../public/houseOfHoops.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";

const ResetPassword = () => {
  const { isLoading, sendRequest } = useHttpClient();
  const passwordInputRef = useRef("");
  const cPasswordInputRef = useRef("");
  const [errorText, setErrorText] = useState("");
  const [classError, setClassError] = useState("");
  const [token, setToken] = useState("");
  const userId = useParams().userId;

  let navigate = useNavigate();

  useEffect(() => {
    const isValidCheck = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/checkResetLink`,
          "POST",
          JSON.stringify({
            userId: userId,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setToken(responseData);
      } catch (err) {}
    };
    isValidCheck();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (passwordInputRef.current.value === cPasswordInputRef.current.value) {
      try {
        await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/${userId}/${token.token}`,
          "PUT",
          JSON.stringify({
            password: passwordInputRef.current.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      }
      catch (err) { }
        navigate("/auth", { replace: true });
    }
    else {
      setClassError("error");
      setErrorText("Password arn't equal, please try again")
    }
}
    



  if (token.isValid) {
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
              <h1 className="auth_title text-left">Password Reset</h1>
              <form onSubmit={submitHandler}>
                <div
                  className="alert alert-success bg-soft-primary border-0"
                  role="alert"
                >
                  Enter the new password and confirmation.
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={`form-control ${classError}`}
                    name="password"
                    id="password"
                    placeholder="Password"
                    ref={passwordInputRef}
                    style={{ marginBottom: "8px" }}
                  />
                  <input
                    type="password"
                    className={`form-control ${classError}`}
                    name="cpassword"
                    id="cpassword"
                    placeholder="Confirm Password"
                    ref={cPasswordInputRef}
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
  else {
    return (
      <div style={{textAlign: "center", marginTop:"17rem"}}>
        <h1>Invalid Link !</h1>
        <h2>Please try again</h2>
      </div>
    );
  }
  
};

export default ResetPassword;
