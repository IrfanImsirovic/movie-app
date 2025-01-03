import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function Card({ result }) {
  return (
    <div className="cursor-pointer sm:p-3 sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200 group">
      <Link href={`/movie/${result.id}`}>
        <div className="p-2">
          <h2 className="truncate text-lg font-bold mb-2">
            {result.title || result.name}
          </h2>
        </div>
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            result.backdrop_path || result.poster_path
          }`}
          width={500}
          height={300}
          className="sm:rounded-t-lg group-hover:opacity-80 transition-opacity duration-200"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
          placeholder="blur"
          blurDataURL="/rolling.svg"
          alt="image is not available"
        ></Image>
        <div className="p-2">
          <p className="line-clamp-2 text-md">{result.overview}</p>
          <p className="flex items-center">
            {result.release_date || result.first_air_date}
            <FaHeart className="h-5 mr-1 ml-3" />{" "}
            {result.vote_average.toFixed(1)}
          </p>
        </div>
      </Link>
    </div>
  );
}
