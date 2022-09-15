import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

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
      <Container className="m-5 p-2">
        <h1 className="text-center">Show All Products</h1>
        <hr />
        <Row xs={1} md={3} className="g-4 justify-content-center">
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
