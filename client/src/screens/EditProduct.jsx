import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getDataById = async () => {
      const { data } = await axios.get(`/product/${id}`);
      setTitle(data.title);
      setPrice(data.price);
      setDescription(data.description);
      console.log(data);
    };
    getDataById();
  }, [id]);

  const updateHandler = async (e) => {
    e.preventDefault();
    // Update by put request
    const data = {
      title: title,
      price: price,
      description: description,
      published: true,
    };

    await axios.put(`/product/${id}`, data);
    alert("Product has been updated successfully");
    window.location.replace("/")
  };

  return (
    <>
      <Container className="m-7 p-5">
        <h1 className="text-center">Update Product</h1>
        <hr />
        <Form onSubmit={updateHandler}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Product
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default EditProduct;
