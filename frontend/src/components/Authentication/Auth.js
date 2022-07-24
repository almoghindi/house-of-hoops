import React, { useState, useRef, useContext } from "react";
import classes from "./Auth.module.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useHttpClient } from "../hooks/http-hook";
import { useForm } from "../hooks/form-hook";
import { AuthContext } from "../../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

import LoadingSpinner from "../UIElements/LoadingSpinner";

const Auth = () => {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [err, setErr] = useState("");
  let navigate = useNavigate();

  const nameInputRef = useRef("");
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    const form = document.getElementById("form");
    form.reset();
    setIsLoginMode((prevMode) => !prevMode);
    setErr("");
  };

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (!isLoginMode) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/login`,
          "POST",
          JSON.stringify({
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        navigate("/", { replace: true });
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        setErr("Cant login, please try again");
      }
    } else {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
          "POST",
          JSON.stringify({
            name: nameInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        navigate("/", { replace: true });
        auth.login(responseData.userId, responseData.token);
      } catch (err) {
        setErr("Cant sign Up, please try again");
      }
    }
  };

  if (isLoginMode === false) {
    return (
      <>
        <div className={classes.AuthFormContainer}>
          {isLoading && <LoadingSpinner asOverlay />}
          <form
            className={classes.AuthForm}
            onSubmit={authSubmitHandler}
            id="form"
          >
            <div className={classes.AuthFormContent}>
              <h3 className={classes.AuthFormTitle}>Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span
                  className="link-primary"
                  onClick={switchModeHandler}
                  type="reset"
                >
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  id="email"
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  ref={emailInputRef}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  ref={passwordInputRef}
                />
              </div>
              <p style={{ color: "red" }}>{err}</p>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className={`btn ${classes.btnPrimary}`}>
                  Submit
                </button>
              </div>
              <p className="text-center mt-2">
                Forgot{" "}
                <Link to="/resetPassword">
                <span className="pass">
                  password?
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={classes.AuthFormContainer}>
          {isLoading && <LoadingSpinner asOverlay />}
          <form
            className={classes.AuthForm}
            onSubmit={authSubmitHandler}
            id="form"
          >
            <div className={classes.AuthFormContent}>
              <h3 className={classes.AuthFormTitle}>Sign Up</h3>
              <div className="text-center">
                Already registered?{" "}
                <span
                  className="link-primary"
                  onClick={switchModeHandler}
                  style={{ cursor: "pointer" }}
                >
                  Sign In
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Full Name</label>
                <input
                  id="name"
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g Jane Doe"
                  ref={nameInputRef}
                />
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  id="email"
                  type="email"
                  className="form-control mt-1"
                  placeholder="Email Address"
                  ref={emailInputRef}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control mt-1"
                  placeholder="Password"
                  ref={passwordInputRef}
                />
              </div>
              <div className="form-group mt-3">
                <label>Confirm Password</label>
                <input
                  id="confrimpassword"
                  type="password"
                  className="form-control mt-1"
                  placeholder="Confirm Password"
                />
              </div>
              <p style={{ color: "red" }}>{err}</p>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className={`btn ${classes.btnPrimary}`}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
};

export default Auth;
