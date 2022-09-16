import React, { useEffect, useState } from "react";
import { Card, Button, Container, Modal, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DetailProduct = () => {
  const { id } = useParams();

  // State for Product
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  // State for Review
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewDescription, setReviewDescription] = useState("");

  useEffect(() => {
    const getSingleProduct = async () => {
      const { data } = await axios.get(`/product/getProductReviews/${id}`);
      console.log(data);

      // Product Information
      setTitle(data.title);
      setPrice(data.price);
      setDescription(data.description);

      // Reviews Information
      setReviews(data.reviews);
    };
    getSingleProduct();
  }, [id]);

  // Handling delete
  const handleDelete = async (id) => {
    await axios.delete(`/product/${id}`);
    alert(`Product ${title} has been deleted`);
    window.location.replace("/");
  };

  // Modal Reviews Pop up
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handling Review
  const addReviewHandler = async (e) => {
    e.preventDefault();

    let review = {
      product_id: id,
      rating: rating,
      description: reviewDescription,
    };
    console.log(review);
    await axios.post(`/product/addReview/${id}`, review);
    alert(`Thankyou for your review`);
    window.location.replace(`/products/${id}`);
  };

  return (
    <>
      <Container className="m-7 p-5">
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
            <Button onClick={() => handleDelete(id)} className="btn-dark">
              Delete
            </Button>
          </Card.Body>
        </Card>
        <h2 className="mt-5">Review from customers: </h2>
        <hr />
        {/* Review modal pop up */}
        <Button
          variant="outline-dark m-1"
          onClick={handleShow}
          style={{ float: "right" }}
        >
          Add Review
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Review {title}</Modal.Title>
          </Modal.Header>
          <Form>
            <Modal.Body>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Your name</Form.Label>
                <Form.Control
                  type="text"
                  // value={name}
                  // onChange={(e) => setName(e.target.value)}
                  autoFocus
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Rating ☆</Form.Label>
                <Form.Control
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Your Review</Form.Label>
                <Form.Control
                  as="textarea"
                  value={reviewDescription}
                  onChange={(e) => setReviewDescription(e.target.value)}
                  rows={3}
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="dark" onClick={addReviewHandler}>
                  Add Review
                </Button>
              </Modal.Footer>
            </Modal.Body>
          </Form>
        </Modal>
        <br />
        <br />
        {reviews.length > 0 ? (
          reviews.map((reviews, i) => {
            return (
              <div className="m-2 p-2">
                <Card>
                  <Card.Body>
                    <h3 key={reviews.id}>User {i + 1}</h3>
                    <h5>Rating: {reviews.rating}☆</h5>
                    <h5>{reviews.description}</h5>
                    <br />
                  </Card.Body>
                </Card>
              </div>
            );
          })
        ) : (
          <h2>This product doesn't have any review.</h2>
        )}
      </Container>
    </>
  );
};

export default DetailProduct;
