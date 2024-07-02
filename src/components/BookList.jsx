import React, { useState, useEffect } from "react";
import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

const BookList = ({ books }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBookAsin, setSelectedBookAsin] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState(books);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [books, searchQuery]);

  const handleBookSelect = (book) => {
    setSelectedBookAsin(book.asin);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={6}>
        <Form.Control
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="mb-3"
        />
        {filteredBooks.map((b) => (
          <SingleBook
            key={b.asin}
            book={b}
            onSelect={() => handleBookSelect(b)}
            selected={selectedBookAsin === b.asin}
          />
        ))}
      </Col>
      <Col xs={6}>
        <CommentArea asin={selectedBookAsin} />
      </Col>
    </Row>
  );
};

export default BookList;
