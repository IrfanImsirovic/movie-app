"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function CommentSection({ movieId }) {
  const supabase = createClientComponentClient();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0); // Store the rating
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // Get the authenticated user
      const { data: userData } = await supabase.auth.getUser();
      setUser(userData.user);

      // Fetch existing comments for the movie
      const { data: fetchedComments, error } = await supabase
        .from("comments")
        .select("*")
        .eq("movie_id", movieId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching comments:", error.message);
      } else {
        setComments(fetchedComments || []);
      }
    }

    fetchData();
  }, [movieId, supabase]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || rating < 1 || rating > 5) {
      console.error("You must leave a comment and a review!");
      alert("You must leave a comment and a review!"); // Show an alert message
      return;
    }

    try {
      // Insert a new comment with user email and rating
      const { data, error } = await supabase
        .from("comments")
        .insert([
          {
            movie_id: movieId,
            user_email: user.email, // Store email instead of user_id
            comment: newComment,
            rating: rating, // Store rating
          },
        ])
        .select();

      if (error) {
        console.error("Error adding comment:", error.message, error.details);
        return;
      }

      // Add the new comment to the list
      setComments([data[0], ...comments]);
      setNewComment(""); // Clear the input
      setRating(0); // Reset the rating
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      {user ? (
        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-950"
          />
          <div className="mt-3">
            <label className="block mb-1 font-medium dark:text-white">
              Rate the movie (1-5 stars):
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-950"
            >
              <option value={0}>Select a rating</option>
              {[1, 2, 3, 4, 5].map((star) => (
                <option key={star} value={star}>
                  {star} Star{star > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleCommentSubmit}
            className="mt-3 px-4 py-2  dark:bg-red-800 bg-red-400 dark:text-white rounded-md hover:bg-red-950 focus:outline-none focus:ring-2 focus:ring-red-950"
          >
            Submit
          </button>
        </div>
      ) : (
        <p className="dark:text-white">
          You must be logged in to leave a comment.
        </p>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 rounded-lg shadow-sm border border-red-950"
          >
            <p className="text-sm dark:text-white">
              <span className="font-semibold">{comment.user_email}</span> -{" "}
              {new Date(comment.created_at).toLocaleString()}
            </p>
            <p className="mt-1 dark:text-white">{comment.comment}</p>
            {comment.rating && (
              <p className="mt-1 text-yellow-600 font-medium">
                Rating: {comment.rating} Star{comment.rating > 1 ? "s" : ""}
              </p>
            )}
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <p className="dark:text-white text-center mt-4">
          No comments yet. Be the first to comment!
        </p>
      )}
    </div>
  );
}
