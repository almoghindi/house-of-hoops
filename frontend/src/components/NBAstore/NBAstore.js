import React, { useState, useEffect } from "react";
import ProductsList from "./ProductsList";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { Link, useParams } from "react-router-dom";
import "./NBAStore.css";
const NBAstore = () => {
  const [loadedProducts, setLoadedProducts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [page, setPage] = useState(1);
  let links = [];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/shop`
        );

        setLoadedProducts(responseData.products);
      } catch (err) {}
    };
    fetchProducts();
  }, [sendRequest, page]);

  if (loadedProducts) {
    for (let i = 1; i < Math.ceil(loadedProducts.length / 4) + 1; i++) {
      links.push(
        <Link to={`/shop?page=${i}`} onClick={()=>setPage(i)} key={i}>
          <span>{i}</span>
        </Link>
      );
    }
  }
  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedProducts && <ProductsList items={loadedProducts} min={page*4-4} max={page*4} />}

      {!isLoading && loadedProducts && (
        <section className="pagination">{links}</section>
      )}
    </>
  );
};

export default NBAstore;
