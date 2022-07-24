import React, { useState, useEffect } from "react";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { useParams } from "react-router-dom";
import ProductItem from "../UIElements/ProductItem";

const ProductPage = () => {
  const [loadedProduct, setLoadedProduct] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const productId = useParams().productId;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/shop/${productId}`
        );
        clearError();
        setLoadedProduct(responseData.product);
      } catch (err) {}
    };
    fetchProduct();
  }, [sendRequest, productId]);
  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProduct && (
        <ProductItem
          key={productId}
          id={productId}
          title={loadedProduct.title}
          description={loadedProduct.description}
          colors={loadedProduct.colors}
          sizes={loadedProduct.sizes}
          price={loadedProduct.price}
          imageUrl={loadedProduct.imageUrl}
        />
      )}
      {!isLoading && error && (
        <div style={{ textAlign: "center", marginTop: "17rem" }}>
          <h1>Invalid Product !</h1>
        </div>
      )}
    </>
  );
};

export default ProductPage;
