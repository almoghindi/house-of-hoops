import React from "react";
import ArticleItem from "./ArticleItem";
import { Link } from "react-router-dom";

const ArticlesList = (props) => {
  const articles = props.items;
  const rest = articles;
  return (
    <section className="dark:bg-gray-0 dark:text-gray-100">
      <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
        <Link
          to={`/articles/${articles[0]._id}`}
          className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 dark:bg-gray-100"
        >
          <img
            src={articles[0].firstImg}
            alt=""
            className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 dark:bg-gray-100"
          />
          <div className="p-6 space-y-2 lg:col-span-5">
            <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">
              {articles[0].mainTitle}
            </h3>
            <span className="text-xs dark:text-gray-400">
              {articles[0].date}
            </span>
            <p className="text-m dark:text-gray-600">
              {articles[0].firstDescription}
            </p>
          </div>
        </Link>
        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
          {rest.slice(1).map((article) => {
            return (
              <ArticleItem
                id={article._id}
                key={article._id}
                img={article.firstImg}
                title={article.mainTitle}
                date={article.date}
                description={article.firstDescription}
              />
            );
          })}
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-300 dark:text-gray-800"
          >
            Load more posts...
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArticlesList;
