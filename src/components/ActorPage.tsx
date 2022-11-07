import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
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
  const actor = useAppSelector(({ actorList }) => actorList.selectedActor);
  const movieList = useAppSelector(({ movieList }) => movieList.movies);
  const [actorDetails, setActorDetails] = useState<Actor>();
  useEffect(() => {
    if (id) {
      dispatch(searchActorById(id));
      dispatch(getActorMovies(id));
    }
  }, [id]);
  useEffect(() => {
    if (actor.id) {
      setActorDetails(actor);
    }
  }, [actor]);
  return (
    <section>
      <div className="section mt-3">
        <div className="section-container dark">
          <div className="row">
            <div className="col-2 p-3">
              <img
                className="img-div"
                alt={`${actorDetails?.firstName} ${actorDetails?.lastName}`}
                src={actorDetails?.image}
              />
            </div>
            <div className="col">
              <div className="title">{`${actorDetails?.firstName} ${actorDetails?.lastName}`}</div>
              <div className="row">
                <div className="col-5">
                  <div className="sub-title-1 mt-3">
                    <b>Age</b>: {actorDetails?.age}
                  </div>
                  <div className="sub-title-1 mt-1">
                    <b>Gender</b>: {`${actorDetails?.gender}`}
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
                {`${actorDetails?.firstName} ${actorDetails?.lastName}`}'s
                Movies
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
