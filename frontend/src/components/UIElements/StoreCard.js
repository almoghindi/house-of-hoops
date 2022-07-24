import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const StoreCard = (props) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 ">
      <Link to={`/shop/${props.id}`}>
        <Card className="text-center m-4" style={{ cursor: "pointer" }}>
          <Card.Img variant="top" src={props.img} />
          <Card.Body>
            <Card.Title className="text-dark mt-1">{props.title}</Card.Title>
            <Card.Text className="text-secondary">
              {props.description}
            </Card.Text>
            <Card.Text className="text-body">{props.price}$</Card.Text>
            <Button variant="dark">MORE DETAILS</Button>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
};

export default StoreCard;
