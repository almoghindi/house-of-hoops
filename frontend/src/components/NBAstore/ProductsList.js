import React from "react";
import StoreCard from "../UIElements/StoreCard";
import { CardGroup } from "react-bootstrap";

const ProductList = (props) => {
  return (
    <CardGroup className="container" style={{ "--bs-gutter-x": 0 }}>
      {props.items.slice(props.min, props.max).map((item) => (
        <StoreCard
          id={item._id}
          key={item._id}
          title={item.title}
          description={item.description}
          img={item.imageUrl[0]}
          price={item.price}
        />
      ))}
    </CardGroup>
  );
};

export default ProductList;
