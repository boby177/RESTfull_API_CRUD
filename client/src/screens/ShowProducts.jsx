import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Row, Button } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const ShowProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductsData = async () => {
      const { data } = await axios.get("/product/allProducts");
    //   console.log(data);
      setProducts(data);
    };
    getProductsData();
  }, []);

  return (
    <>
      <Container className="m-7 p-5">
        <h1 className="text-center">Welcome to My Shop</h1>
        <Link to={'/addProduct'}>
        <Button variant="outline-dark" size="sm">Add Product</Button>
        </Link>
        <hr />
        <Row sm={1} md={2} lg={3} className="g-4 justify-content-center">
          {products.map((product) => {
            return (
              <Col key={product.id}>
                <ProductCard product={product} />
                <br />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default ShowProducts;
