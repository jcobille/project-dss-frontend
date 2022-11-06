import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import MovieContainer from "./views/MovieContainer";
import { getMovies, searchMovies } from "./features/movieSlice";
import { AutoComplete } from "./views/CustomInput";
import { Movie, Movies } from "../redux/types/ActionTypes";
import { useNavigate } from "react-router-dom";
export interface HomePageProps {}

const HomePage = () => {
  const dispatch = useAppDispatch();
  const movieList = useAppSelector(({ movieList }) => movieList.movies);
  const [moviesFound, setMoviesFound] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    if (value) {
      let list = await dispatch(searchMovies(value));
      let movies = list.payload as Movies[];
      setMoviesFound(movies);
    } else {
      setMoviesFound([]);
    }
  };

  const selectAutocomplete = ({ id }: Movie) => {
    navigate(`/movie/details/${id}`);
  };

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
                <AutoComplete
                  className="search-input input-lg autocomplete"
                  name="search"
                  changeHandler={changeHandler}
                  data={moviesFound}
                  placeHolder="Enter keywords ..."
                  selectMovie={selectAutocomplete}
                  type="Movie"
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
