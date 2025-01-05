"use client";

import { useEffect, useState } from "react";

const CommentsList = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/movies/${movieId}/comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Failed to load comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [movieId]);

  if (loading) return <p>Loading comments...</p>;

  return (
    <div>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="mb-2">
            <p>{comment.content}</p>
            <small>By user {comment.user_id}</small>
          </div>
        ))
      ) : (
        <p>No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default CommentsList;
