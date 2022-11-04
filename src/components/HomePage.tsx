import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import MovieContainer from "./views/MovieContainer";
import { getMovies } from "./features/movieSlice";
import { AutoComplete } from "./views/CustomInput";
import { Movie } from "../redux/types/ActionTypes";
export interface HomePageProps {}
const HomePage = () => {
  const dispatch = useAppDispatch();
  const movieList = useAppSelector(({ movieList }) => movieList.movies);
  const [moviesFound, setMoviesFound] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(name,value);
    if (value) {
      // dispatch(searchActors(value));
    } else {
      // dispatch(clearActorsList());
    }
  };

  const selectAutocomplete = (data: Movie) => {
    // setActor("");
    // setSelectedActors([...selectedActors, data]);
    // setActorList([]);
    // dispatch(clearActorsList());
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
              {/* <input
                type="text"
                className="search-input input-lg"
                placeholder="Enter keywords ..."
              /> */}
                <AutoComplete
                  className="search-input input-lg autocomplete"
                  name="cast"
                  changeHandler={changeHandler}
                  data={moviesFound}
                  placeHolder="Enter keywords ..."

                  // select={selectAutocomplete}
                  // value={actor}
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
