import AISuggestion from "@/components/AISuggestion";
import MoviesCarousel from "@/components/MoviesCarousel";
import { getPopularMovies, getSearchMovies } from "@/lib/getMovies";
import { notFound } from "next/navigation";

type Props = {
  params: {
    term: string;
  };
};

async function SearchPage({ params: { term } }: Props) {
  if (!term) notFound();

  const termToUse = decodeURI(term);

  //API call to get the searched movies
  const movies = await getSearchMovies(term);

  //API call to get the popular movies
  const popularMovies = await getPopularMovies();

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4 mt-32 xl:mt-42">

          <AISuggestion term={termToUse} />

          <h1 className="text-6xl font-bold px-10">Results for {termToUse}</h1>
          <MoviesCarousel title="Movies" movies={movies} isVertival />
          <MoviesCarousel title="You may also like" movies={popularMovies} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
