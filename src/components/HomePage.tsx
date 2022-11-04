import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import MovieContainer from "./views/MovieContainer";
import { getMovies } from "./features/movieSlice";
export interface HomePageProps {}
const HomePage = () => {
  const dispatch = useAppDispatch();
  const movieList = useAppSelector(({ movieList }) => movieList.movies);
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);
  return (
    <section>
      <div className="section">
        <div className="content">
          <span className="title text-center">
            Find Movies, TV shows and more
          </span>
          <div className="search-div">
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  className="search-input input-lg"
                  placeholder="Enter keywords ..."
                />
              </div>
              <div className="col-1">
                <button className="circle-button">
                  <FontAwesomeIcon icon={faArrowRight} size="xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <MovieContainer data={movieList} limit={32} />
      </div>
    </section>
  );
};

export default HomePage;
