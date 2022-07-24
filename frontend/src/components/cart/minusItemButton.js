import React, { useContext } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";

import "./cartStyle.css";

const MinusItemButton = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const cartProductId = props.productId;

 const MinusItemButton = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/shop/removeCartItem`,
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
   <span className="a" style={{ cursor: "pointer" }} onClick={MinusItemButton}>
     <span onClick={buttonClickHandler}>-</span>
   </span>
 );
 }

export default MinusItemButton;