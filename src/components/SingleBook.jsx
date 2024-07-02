import React from "react";
import { Card } from "react-bootstrap";

const SingleBook = ({ book, onSelect, selected }) => {
  return (
    <Card
      onClick={() => onSelect(book)}
      style={{ border: selected ? "2px solid red" : "none" }}
      className="mb-3"
    >
      <Card.Img variant="top" src={book.img} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default SingleBook;
