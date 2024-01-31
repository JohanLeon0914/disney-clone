import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarousel from "@/components/MoviesCarousel";
import { Button } from "@/components/ui/button";
import { getPopularMovies, getTopRateMovies, getUpcomingMovies } from "@/lib/getMovies";
import Image from "next/image";

export default async function Home() {

  const upcomingMovies = await getUpcomingMovies();
  const topRateMovies = await getTopRateMovies();
  const popularMovies = await getPopularMovies();

  return (
    <main className="">
      <CarouselBannerWrapper />

      <div className="flex flex-col space-y-2 xl:-mt-48">
        <MoviesCarousel title="Upcoming" movies={upcomingMovies} />
        <MoviesCarousel title="Top rated" movies={topRateMovies} />
        <MoviesCarousel title="Popular" movies={popularMovies} />
      </div>
    </main>
  );
}
