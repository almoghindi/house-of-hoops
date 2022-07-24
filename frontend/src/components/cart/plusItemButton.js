import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

import "./cartStyle.css";

const PlusItemButton = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const cartProductId = props.productId;

 const plusCartItem = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/shop/addCartItem`,
        "POST",
        JSON.stringify({
          userId: auth.userId,
          cartProductId: cartProductId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  };
  const buttonClickHandler = () => {
    props.passData(Math.random());
  };
 return (
   <span className="a" style={{cursor: "pointer"}} onClick={plusCartItem}>
            <span onClick={buttonClickHandler}>+</span>
   </span>
 );
 }

export default PlusItemButton;