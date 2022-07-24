import React, { useState, useEffect } from "react";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import ArticlesList from "./articleList";

const Home = () => {
  const [loadedArticles, setLoadedArticles] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/articles`
        );

        setLoadedArticles(responseData.articles);
      } catch (err) {}
    };
    fetchArticles();
  }, [sendRequest]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedArticles && <ArticlesList items={loadedArticles} />}
    </>
  );
};

export default Home;
