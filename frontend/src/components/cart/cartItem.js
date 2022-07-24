import React, { useState, useEffect, useContext } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import PlusItemButton from "./plusItemButton";
import MinusItemButton from "./minusItemButton";

import "./cartStyle.css";


const CartItem = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const product = props.product;
  const productId = props.product.id;

  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const [childData, setChildData] = useState({});

  const deleteCartItem = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/shop`,
        "DELETE",
        JSON.stringify({
          userId: userId,
          cartProductId: productId,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {}
  }; 

const passData = (data) => {
  setChildData(data);
  };
 const buttonClickHandler = () => {
   props.passData(Math.random());
 };
  return (
    <div className="row border-top border-bottom">
      <div className="row main align-items-center">
        <div className="col">
          <img className="img img-fluid" src={product.imageUrl} alt="" />
        </div>
        <div className="col">
          <div className="row text-muted">{product.title}</div>
          <div className="row">Size : {product.size}</div>
        </div>
        <div className="col">
          <span onClick={buttonClickHandler}>
            <MinusItemButton productId={productId} passData={passData} />
          </span>
          <a className="a border">{product.quantity}</a>
          <span onClick={buttonClickHandler}>
            <PlusItemButton productId={productId} passData={passData} />
          </span>
        </div>
        <div className="col">
          &euro; {product.price}{" "}
          <span
            className="close"
            onClick={() => props.setChange(Math.random())}
            style={{ cursor: "pointer" }}
          >
            <div onClick={deleteCartItem} style={{ marginTop: "7px" }}>
              &#10005;
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
