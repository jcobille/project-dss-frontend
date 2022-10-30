import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import NavTabs from "./views/NavTabs";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { startSetMovies } from "../redux/action/MovieActions";
import MovieContainer from "./views/MovieContainer";
export interface HomePageProps {}
const HomePage = () => {
  const dispatch = useAppDispatch();
  const movieList = useAppSelector((state) => state.movieList);

  useEffect(() => {
    dispatch(startSetMovies());
  }, [dispatch]);
  return (
    <section>
      <NavTabs />
      <div className="section">
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
      <MovieContainer data={movieList} limit={16} />
    </section>
  );
};

export default HomePage;
