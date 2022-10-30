import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { Movie } from "../../redux/types/ActionTypes";
import { getYear } from "../utils/misc";

interface MovieCellProps {
  data: Movie;
}

const MovieCell = ({ data }: MovieCellProps) => {
  const openMovieDetails = (title: string) => {
    console.log(title);
  }

  return (
    <div className="container">
      <div className="img-container text-center" onClick={() => openMovieDetails(data.title)}>
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
