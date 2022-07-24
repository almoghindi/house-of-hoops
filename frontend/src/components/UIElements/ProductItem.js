import React, { useState,useContext } from "react";
import "./ProductItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useHttpClient } from "../hooks/http-hook";
import { AuthContext } from "../../context/auth-context";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function ProductItem(props) {
  const [img, setImg] = useState(props.imageUrl[0]);
  const [size, setSize] = useState(null);

  const sizes = props.sizes;
  const colors = props.colors;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  const addToCart = async () => {
    if (size === null) {
      return ;
    }
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/shop`,
        "POST",
        JSON.stringify({
          userId: auth.userId,
          productId: props.id,
          size: size,
          imageUrl: props.imageUrl[0],
          title: props.title,
          price:props.price
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      handleShow();
    }
  }

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="card">
          <div className="row g-0">
            <div className="col-md-6 border-end">
              <div className="d-flex flex-column justify-content-center">
                <div className="main_image">
                  <img src={img} id="main_product_image" width="350" alt="" />
                </div>
                <div className="thumbnail_images">
                  <ul id="thumbnail">
                    <li>
                      <img
                        onClick={() => {
                          setImg(props.imageUrl[0]);
                        }}
                        src={props.imageUrl[0]}
                        width="70"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        onClick={() => {
                          setImg(props.imageUrl[1]);
                        }}
                        src={props.imageUrl[1]}
                        width="70"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        onClick={() => {
                          setImg(props.imageUrl[2]);
                        }}
                        src={props.imageUrl[2]}
                        width="70"
                        alt=""
                      />
                    </li>
                    <li>
                      <img
                        onClick={() => {
                          setImg(props.imageUrl[3]);
                        }}
                        src={props.imageUrl[3]}
                        width="70"
                        alt=""
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 right-side">
                <div className="d-flex justify-content-between align-items-center">
                  <h2>{props.title}</h2>
                  <FontAwesomeIcon icon={faHeart} style={{ color: "red" }} />
                </div>
                <div className="mt-2 pr-3 content">
                  <p>{props.description}</p>
                </div>
                <h3>{props.price}$</h3>

                <div className="mt-5">
                  <span className="fw-bold">Color</span>
                  <div className="colors">
                    <ul id="marker">
                      {colors.map((color) => {
                        return (
                          <li
                            key={color}
                            style={{ backgroundColor: color }}
                          ></li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="mt-5">
                  <span className="fw-bold">Choose Size</span>
                  <div className="size row ">
                    {sizes.map((size) => {
                      return (
                        <button
                          key={size}
                          type="button"
                          className="btn btn-light col-lg-3 m-2"
                          style={{ maxWidth: "150px" }}
                          onClick={() => {
                            setSize(size);
                          }}
                        >
                          EU {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="buttons d-flex flex-row mt-5 gap-3">
                  <button className="btn btn-outline-dark">Buy Now</button>
                  <button className="btn btn-dark" onClick={addToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error Occurred</Modal.Title>
        </Modal.Header>
        <Modal.Body>You must Login first in order to add item to the cart !</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to="/auth">
            <Button variant="primary" onClick={handleClose}>
              Login
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
      ;
    </>
  );
}
