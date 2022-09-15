import React, { useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DetailProduct = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  // const [created, setCreated] = useState("");

  useEffect(() => {
    const getSingleProduct = async () => {
      const { data } = await axios.get(`/product/${id}`);
      console.log(data);

      setTitle(data.title);
      setPrice(data.price);
      setDescription(data.description);
      // setCreated(data.createdAt);
    };
    getSingleProduct();
  }, [id]);

  return (
    <>
      <Container className="m-5 p-2 text-center">
        <h1>Detail Product of {title}</h1>
        <hr />
        <Card
          className="shadow-lg m-2 p-3 bg-light text-dark"
          style={{ width: "20rem", margin: "5px" }}
          border="dark"
        >
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>Name: {title}</Card.Title>
            <Card.Title>Price: ${price}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Link to={`/product/edit/${id}`}>
              <Button className="btn-dark m-1">Edit</Button>
            </Link>
            <Link to={`/product/${id}`}>
              <Button className="btn-dark">Delete</Button>
            </Link>
            {/* <Card.Text>{created}</Card.Text> */}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default DetailProduct;
