import { getDiscoverMovies } from "@/lib/getMovies";
import CarouselBanner from "./CarouselBanner";

type Props = {
  id?: string;
  keyword?: string;
}

async function CarouselBannerWrapper({id, keyword}: Props) {
  
  const movies = await getDiscoverMovies(id, keyword);
  
  return <CarouselBanner movies={movies}/>
}

export default CarouselBannerWrapper