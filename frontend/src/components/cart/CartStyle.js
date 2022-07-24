import React, { useState, useEffect,useContext } from "react";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { AuthContext } from "../../context/auth-context";
import CartItem from './cartItem';
import { Link } from "react-router-dom";


import "./cartStyle.css";
const CartStyle = (props) => {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsAmount, setItemsAmount] = useState(0);
  const [change, setChange] = useState({ change: 0 });

  const auth = useContext(AuthContext);
  const userId = auth.userId;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/shop/cart`,
          "POST",
          JSON.stringify({
            userId: userId,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setLoadedProducts(responseData.products);
        setChange(Math.random());
      } catch (err) {}
    };
    fetchProducts();
  }, [sendRequest, userId, change.change]);
   
  useEffect(() => {
    const e = document.getElementById("shipment");
    const val = e.options[e.selectedIndex].value;
    setItemsAmount(0);
    setTotalPrice(0);
    if (loadedProducts.length > 0) {
      for (let i = 0; i < loadedProducts.length; i++) {
        setItemsAmount((prev) => prev + loadedProducts[i].quantity);
        setTotalPrice(
          (prev) => prev + loadedProducts[i].price * loadedProducts[i].quantity
        );
      }
    }
    setTotalPrice((prev) => prev + parseInt(val));
    props.onCartAmount(itemsAmount);
  }, [loadedProducts, change.change, props, itemsAmount]);

const passData = (data) => {
  setChange({change:data});
  };
 

  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <div className="shopCard">
        <div className="row">
          <div className="col-md-8 cart">
            <div className="shopTitle">
              <div className="row">
                <div className="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {itemsAmount} items
                </div>
              </div>
            </div>
            {!isLoading &&
              loadedProducts &&
              loadedProducts.map((product) => (
                <CartItem
                  product={product}
                  key={product.id}
                  id={product.id}
                  setChange={(i) => setChange({ change: i })}
                  passData={passData}
                />
              ))}
            <Link to="/shop">
              <div
                className="back-to-shop"
                style={{ cursor: "pointer", color: "black" }}
              >
                {" "}
                &larr; <span className="text-muted">Back to shop</span>
              </div>
            </Link>
          </div>

          <div className="col-md-4 summary">
            <div>
              <h5 className="h5">
                <b>Summary</b>
              </h5>
            </div>
            <hr className="hr" />
            <div className="row">
              <div className="col" style={{ paddingLeft: 0 }}>
                ITEMS {itemsAmount}
              </div>
              <div className="col text-right">
                &euro; {totalPrice.toFixed(2)}
              </div>
            </div>
            <form className="ship-form">
              <p>SHIPPING</p>
              <select
                className="select"
                id="shipment"
                onChange={() => setChange({ change: Math.random() })}
              >
                <option className="text-muted" value="5">
                  Standard-Delivery- &euro;5.00
                </option>
                <option className="text-muted" value="6">
                  Express-Delivery- &euro;6.00
                </option>
              </select>
              <p>GIVE CODE</p>
              <input
                className="input"
                id="code"
                placeholder="Enter your code"
              />
            </form>
            <div
              className="row"
              style={{
                borderTop: "1px solid rgba(0,0,0,.1)",
                padding: "2vh 0",
              }}
            >
              <div className="col">TOTAL PRICE</div>
              <div className="col text-right">
                &euro; {totalPrice.toFixed(2)}
              </div>
            </div>
            <Link to="/checkout">
              <button className="sbtn">CHECKOUT</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default CartStyle;
