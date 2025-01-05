import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { movieId, comment } = req.body;
    const { data: session } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { error } = await supabase
      .from("comments")
      .insert([{ movie_id: movieId, user_id: user.id, content: comment }]);

    if (error) {
      return res.status(500).json({ error: "Failed to post comment" });
    }

    return res.status(200).json({ success: true });
  }

  res.status(405).json({ error: "Method not allowed" });
}
