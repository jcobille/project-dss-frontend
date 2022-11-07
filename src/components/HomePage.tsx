import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import MovieContainer from "./views/MovieContainer";
import { getMovies, searchMovies } from "./features/movieSlice";
import { AutoComplete } from "./views/CustomInput";
import { Actor, Movie, Movies } from "../redux/types/ActionTypes";
import { useNavigate } from "react-router-dom";
import { searchActors } from "./features/actorSlice";
export interface HomePageProps {}

const HomePage = () => {
  const dispatch = useAppDispatch();
  const movieList = useAppSelector(({ movieList }) => movieList.movies);
  const [data, setData] = useState<Movie[] | Actor[]>([]);
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("Movie");
  const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      let movieFound = await dispatch(searchMovies(value));
      if (movieFound.payload && movieFound.payload.length > 0) {
        let movies = movieFound.payload as Movies[];
        setSearchType("Movie");
        setData(movies);
      } else {
        let actorFound = await dispatch(searchActors(value));
        if (actorFound.payload && actorFound.payload.length > 0) {
          let actors = actorFound.payload as Actor[];
          setSearchType("Actor");
          setData(actors);
        }
      }
    } else {
      setData([]);
    }
  };

  const selectMovieAutocomplete = ({ id }: Movie) => {
    navigate(`/movie/details/${id}`);
  };

  const selectActorAutocomplete = ({ id }: Actor) => {
    navigate(`/actor/details/${id}`);
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
                  data={data}
                  placeHolder="Enter keywords ..."
                  selectMovie={selectMovieAutocomplete}
                  selectActor={selectActorAutocomplete}
                  type={searchType}
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
