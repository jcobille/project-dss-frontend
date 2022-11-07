import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Movie, Review, User } from "../redux/types/ActionTypes";
import { getMovieDetails } from "./features/movieSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { formatDate } from "./utils/misc";
import ReviewsContainer from "./views/ReviewsContainer";
import { StarRatings } from "./views/CustomInput";
import { getCookie } from "./utils/cookie";
import CustomModal from "./popup/Modal";
import ReviewInput from "./views/ReviewInput";
import { clearReviews, loadReviews } from "./features/reviewSlice";

const DetailsPage = () => {
  const { id } = useParams();
  const [ratings, setRatings] = useState(0);
  const [reviewFound, setReviewFound] = useState(false);
  const [reviewApproved, setReviewApproved] = useState(false);
  const dispatch = useAppDispatch();
  const user = getCookie();
  const currentUser = useAppSelector<User>(
    ({ currentUser }) => currentUser.details as User
  );
  const details = useAppSelector<Movie>(
    ({ movieList }) => movieList.details as Movie
  );
  const reviews = useAppSelector<Review[]>(
    ({ reviewList }) => reviewList.data as Review[]
  );
  const [modal, setModal] = useState({
    id: "",
    type: "",
    isOpen: false,
  });
  const openCloseModal = (type: string) => {
    setModal({
      id: "",
      type: type,
      isOpen: !modal.isOpen,
    });
  };
  const changeModal = (type: string, id?: string) => {
    if (id) {
      setModal({ ...modal, id: id, type: type, isOpen: true });
    }
  };

  useEffect(() => {
    if (id) {
      if (Object.keys(details).length === 0 || details.id !== id) {
        dispatch(getMovieDetails(id));
      }
    }

    if (Object.keys(details).length > 0) {
      dispatch(clearReviews());
      ratingsCount();
      if (details?.reviews) {
        dispatch(loadReviews(details.reviews));
      }
    }
  }, [id, details, dispatch]);

  useEffect(() => {
    setReviewFound(false);
    reviews.find((review) => {
      if (review.userId === currentUser.id) {
        setReviewFound(true);
        if (review.status === "approved") setReviewApproved(true);
      }
    });
  }, [reviews]);

  const ratingsCount = () => {
    let ratings = 0;
    if (details.reviews) {
      details.reviews.forEach((review: Review) => {
        ratings += review.reviewScore;
      });

      setRatings(ratings / details.reviews.length);
    } else {
      setRatings(ratings);
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
                  <StarRatings ratings={ratings} />
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
                    <b>Duration</b>: {`${details?.duration}m` ?? "N/A"}
                  </div>
                  <div className="sub-title-1 mt-1">
                    <b>Budget</b>: {details?.cost ?? "N/A"}
                  </div>
                  <div className="sub-title-1 mt-1">
                    <b>Casts</b>:&nbsp;
                    {details?.actors?.map((actor, index) => {
                      if (details.actors) {
                        return (
                          <Link
                            to={`/actor/details/${actor.id}`}
                            className="link"
                            key={index}
                          >
                            <span key={index} className="btn-user">
                              {`${actor.firstName} ${actor.lastName}`}
                              {index < details.actors.length - 1 ? ", " : ""}
                            </span>
                          </Link>
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
          <div className="header">
            <div>
              <span className="title">Reviews</span>
            </div>
          </div>
          {!reviewFound && currentUser.id && <ReviewInput />}
          {reviews.map((review, i) => {
            if (currentUser.role !== "Admin") {
              return (
                (review.status === "approved" ||
                  review.userId === currentUser.id) && (
                  <ReviewsContainer data={review} key={i} />
                )
              );
            } else {
              return (
                <ReviewsContainer
                  data={review}
                  key={i}
                  changeModal={changeModal}
                />
              );
            }
          })}
          <div className="my-3 text-center">
            {!user && (
              <div className="pointer" onClick={() => openCloseModal("login")}>
                <FontAwesomeIcon icon={faCirclePlus} />
                <span>&nbsp;Please login to add a review</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <CustomModal
        modal={modal}
        closeModal={openCloseModal}
        changeModal={changeModal}
      />
    </section>
  );
};

export default DetailsPage;
