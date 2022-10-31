import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Movie } from "../../redux/types/ActionTypes";
import { getYear } from "../utils/misc";
import { useNavigate } from "react-router-dom";

interface MovieCellProps {
  data: Movie;
}

const MovieCell = ({ data }: MovieCellProps) => {
  const navigate = useNavigate();
  const openMovieDetails = (id: string) => {
    navigate(`/movie/details/${id}`);
  }

  return (
    <div className="container">
      <div className="img-container text-center" onClick={() => openMovieDetails(data.id)}>
        <img className="img" alt="Avatar" src={data.image} />
        <div className="overlay">
          <button className="circle-button play-btn">
            <FontAwesomeIcon icon={faPlay} size="xl" />
          </button>
        </div>
      </div>
      <div className="sub-container">
        <div className="title-1">{data.title}</div>
        <div className="sub-title">
          {getYear(data.released_date)} | {data.duration + "m"}
        </div>
      </div>
    </div>
  );
};

export default MovieCell;
