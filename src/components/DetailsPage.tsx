import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie, Review } from "../redux/types/ActionTypes";
import { getMovieDetails } from "./features/movieSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { formatDate } from "./utils/misc";

const DetailsPage = () => {
  const { id } = useParams();
  const [ratings, setRatings] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const dispatch = useAppDispatch();
  const details = useAppSelector<Movie>(
    ({ movieList }) => movieList.details as Movie
  );

  useEffect(() => {
    if (id) {
      if (Object.keys(details).length === 0 || details.id !== id) {
        dispatch(getMovieDetails(id));
      }
    }
    if (Object.keys(details).length > 0) {
      ratingsCount();
    }
  }, [id, details, dispatch]);

  const ratingsCount = () => {
    let ratings = 0;
    if (details.reviews) {
      details.reviews.forEach((review: Review) => {
        ratings += review.reviewScore;
      });

      setRatings(ratings / details.reviews.length);
      setReviews(details.reviews);
    }
  };
  return (
    <section>
      <div className="section mt-3">
        <div className="section-container dark">
          <div className="row">
            <div className="col-2 p-3">
              <img
                className="img-div"
                alt={details?.title}
                src={details?.image}
              />
              <div className="sub-container">
                <div className="sub-title">
                  <span>
                    <b>Ratings:</b>{" "}
                  </span>
                  {[...Array(5)].map((_, i) => {
                    if (ratings > i) {
                      return (
                        <FontAwesomeIcon icon={faStar} color="yellow" key={i} />
                      );
                    } else {
                      return <FontAwesomeIcon icon={faStar} key={i} />;
                    }
                  })}
                  <span> / {reviews?.length} voted</span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="title">{details?.title}</div>
              <p className="sub-title-1">{details?.description}</p>
              <div className="row">
                <div className="col-5">
                  <div className="sub-title-1 mt-3">
                    <b>Released</b>: {formatDate(details?.released_date)}
                  </div>
                  <div className="sub-title-1 mt-1">
                    <b>Duration</b>: {`${details?.duration}m`}
                  </div>
                  <div className="sub-title-1 mt-1">
                    <b>Casts</b>:&nbsp;
                    {details?.actors?.map((actor, index) => {
                      if (details.actors) {
                        return (
                          <span key={index} className="btn-user">
                            {`${actor.firstName} ${actor.lastName}`}
                            {index < details.actors.length - 1 ? ", " : ""}
                          </span>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-container dark mt-3">
          <div className="title-1">Comments</div>
        </div>
      </div>
    </section>
  );
};

export default DetailsPage;
