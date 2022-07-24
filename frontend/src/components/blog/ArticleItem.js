import React from "react";
import { Link } from "react-router-dom";

const ArticleItem = (props) => {
  return (
    <Link
      rel="noopener noreferrer"
      to={`/articles/${props.id}`}
      className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-100 hidden sm:block"
    >
      <img
        role="presentation"
        className="object-cover w-full rounded h-44 dark:bg-gray-500"
        src={props.img}
        alt=""
      />
      <div className="p-6 space-y-2">
        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
          {props.title}
        </h3>
        <span className="text-xs dark:text-gray-400">{props.date}</span>
        <p className="text-m dark:text-gray-600">{props.description}</p>
      </div>
    </Link>
  );
};
export default ArticleItem;
