export const dynamic = "force-dynamic"; // ensures dynamic rendering
import Results from "../../components/Results";
import Card from "../../components/Card"; // Import the Card component

const API_KEY = process.env.API_KEY;

export default async function SearchPage({ params }) {
  const searchTerm = params?.searchTerm || ""; // Handle optional chaining for `params`

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&language=en-US&include_adult=false`,
    { next: { revalidate: 10000 } } // Add revalidate option for consistency
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const results = data.results;

  return (
    <div>
      {results && results.length === 0 ? (
        <h1 className="text-center pt-6">No results found</h1>
      ) : (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results?.map((result) => (
            <Card key={result.id} result={result} />
          ))}
        </div>
      )}
    </div>
  );
}
