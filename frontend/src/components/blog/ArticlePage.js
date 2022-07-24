import React, { useState, useEffect } from "react";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { useParams } from "react-router-dom";
import Article from "./Article";

const ArticlePage = () => {
  const [loadedArticle, setLoadedArticle] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const articleId = useParams().articleId;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/articles/${articleId}`
        );
        clearError();
        setLoadedArticle(responseData.article);
      } catch (err) {}      
    };
    fetchArticle();
  }, [sendRequest, articleId]);

  return (
    <>
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedArticle && <Article article={loadedArticle} />}
      {!isLoading && loadedArticle && error && (
        <div style={{ textAlign: "center", marginTop: "17rem" }}>
          <h1>Invalid Article !</h1>
        </div>
      )}
    </>
  );
};
export default ArticlePage;
