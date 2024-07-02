import React, { useState, useEffect } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = ({ asin }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchComments = async (asin) => {
      setIsLoading(true);
      setIsError(false);
      setComments([]);

      try {
        let response = await fetch(
          `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdkNWM2ZjNhMzhjYjAwMTVmNjNjZjkiLCJpYXQiOjE3MTk0OTM0NzksImV4cCI6MTcyMDcwMzA3OX0.jwbExyPvwD6_oF-ey5jx_c7SW-7ohDWAVwm_wmsbpZQ",
            },
          }
        );

        if (response.ok) {
          let comments = await response.json();
          setComments(comments);
          setIsLoading(false);
          setIsError(false);
        } else {
          let error = await response.text();
          setIsLoading(false);
          setIsError(true);
          setErrorMessage(error);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(error.message);
      }
    };

    if (asin) {
      fetchComments(asin);
    }
  }, [asin]);

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {isError && <Error message={errorMessage} />}
      {!asin && <p>Nessun libro selezionato</p>}
      {asin && !isLoading && !isError && (
        <>
          <AddComment asin={asin} />
          <CommentList commentsToShow={comments} />
        </>
      )}
    </div>
  );
};

export default CommentArea;
