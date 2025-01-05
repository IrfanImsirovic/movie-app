import { supabase } from "../../../../lib/supabase";

export default async function handler(req, res) {
  const { movieId } = req.query;

  if (req.method === "POST") {
    const { comment } = req.body;

    // Simulating a user session (replace this with actual user authentication)
    const user = { id: "test-user-id" }; // Replace this with actual session handling

    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in to comment." });
    }

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ error: "Comment cannot be empty" });
    }

    const { error } = await supabase
      .from("comments")
      .insert([{ movie_id: movieId, user_id: user.id, content: comment }]);

    if (error) {
      return res.status(500).json({ error: "Failed to post comment" });
    }

    return res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
