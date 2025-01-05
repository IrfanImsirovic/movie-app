"use client";

import { useState } from "react";
import CommentsList from "./CommentsList";
import CommentForm from "./CommentForm";

const CommentsSection = ({ movieId }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCommentAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Trigger a refresh of comments
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      <CommentsList key={refreshKey} movieId={movieId} />
      <h4 className="text-lg font-semibold mt-6">Leave a Comment</h4>
      <CommentForm movieId={movieId} onCommentAdded={handleCommentAdded} />
    </div>
  );
};

export default CommentsSection;
