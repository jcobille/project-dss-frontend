import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Actor, Movie, User } from "../redux/types/ActionTypes";
import { searchActorById } from "./features/actorSlice";
import { getActorMovies } from "./features/movieSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { formatDate } from "./utils/misc";
import MovieContainer from "./views/MovieContainer";

const ActorPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const details = useAppSelector(({ actorList }) => actorList.actors[0]);
  const movieList = useAppSelector(({ movieList }) => movieList.movies);
  useEffect(() => {
    if (id) {
      dispatch(searchActorById(id));
      dispatch(getActorMovies(id));
    }
  }, [id]);

  return (
    <section>
      <div className="section mt-3">
        <div className="section-container dark">
          <div className="row">
            <div className="col-2 p-3">
              <img
                className="img-div"
                alt={`${details?.firstName} ${details?.lastName}`}
                src={details?.image}
              />
            </div>
            <div className="col">
              <div className="title">{`${details?.firstName} ${details?.lastName}`}</div>
              <div className="row">
                <div className="col-5">
                  <div className="sub-title-1 mt-3">
                    <b>Age</b>: {details?.age}
                  </div>
                  <div className="sub-title-1 mt-1">
                    <b>Gender</b>: {`${details?.gender}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-container dark mt-3">
          <div className="header">
            <div>
              <span className="title">
                {`${details?.firstName} ${details?.lastName}`}'s Movies
              </span>
            </div>
            <MovieContainer data={movieList} limit={32} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActorPage;
