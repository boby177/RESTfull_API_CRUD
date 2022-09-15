import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <>
      <Row xs={2} md={2} className="g-4">
        <Col>
          <Card
            className="shadow-lg m-2 p-3 bg-light text-dark"
            style={{ width: "20rem", margin: "5px" }}
            border="dark"
          >
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Title>Price: ${product.price}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Link to={`/products/${product.id}`}>
                <div className="text-center">
                  <Button className="btn-dark">Detail</Button>
                </div>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductCard;
