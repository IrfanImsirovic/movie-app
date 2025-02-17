import Image from "next/image";
import CommentSection from "../../components/CommentSection"; // Adjust path based on your project structure

async function getMovie(movieId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`
  );
  return res.json();
}

export default async function MoviePage({ params }) {
  const movieId = params.id; // Extract movieId from params
  const movie = await getMovie(movieId); // Fetch movie data on the server

  return (
    <div className="w-full">
      <div className="p-4 md:pt-8 flex flex-col md:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6">
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          width={500}
          height={300}
          className="rounded-lg"
          style={{
            maxWidth: "100%",
            height: "100%",
          }}
          placeholder="blur"
          blurDataURL="/spinner.svg"
          alt="Movie poster"
        />
        <div className="p-2">
          <h2 className="text-lg mb-3 font-bold">
            {movie.title || movie.name}
          </h2>
          <p className="text-lg mb-3">
            <span className="font-semibold mr-1">Overview:</span>
            {movie.overview || "No overview available."}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Date Released:</span>
            {movie.release_date ||
              movie.first_air_date ||
              "Unknown release date"}
          </p>
          <p className="mb-3">
            <span className="font-semibold mr-1">Rating:</span>
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </p>
        </div>
      </div>

      {/* Add CommentSection */}
      <CommentSection movieId={movieId} />
    </div>
  );
}
