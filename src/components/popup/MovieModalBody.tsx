import { faClose, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Actor, Movie, Movies } from "../../redux/types/ActionTypes";
import { clearActorsList, searchActors } from "../features/actorSlice";
import { createMovie, deleteMovie, editMovie } from "../features/movieSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  AutoComplete,
  CustomInput,
  CustomNumberInput,
  CustomTextArea,
} from "../views/CustomInput";

interface BodyProps {
  movieId?: string;
  type: string;
  changeModal: (type: string) => void;
  closeModal: (type: string) => void;
  isOpen: boolean;
}
interface MovieEdit {
  id: string;
  image: string;
  cost: string;
  description: string;
}
export const MovieModalBody = ({
  movieId,
  type,
  changeModal,
  closeModal,
  isOpen,
}: BodyProps) => {
  const [formData, setFormData] = useState<Movies>({
    title: "",
    description: "",
    released_date: "",
    duration: "",
    image: "",
    cost: "",
  });

  const [actor, setActor] = useState("");
  const [error, setError] = useState("");
  const [actorList, setActorList] = useState<Actor[]>([]);
  const [selectedActors, setSelectedActors] = useState<Actor[]>([]);
  const actors = useAppSelector((state) => state.actorList.actors as Actor[]);
  const movies = useAppSelector((state) => state.movieList.movies);
  const dispatch = useAppDispatch();

  let title = "Create";
  if (type === "editMovie") {
    title = "Edit";
  } else if (type === "deleteMovie") {
    title = "Delete";
  }

  const submitHandler = () => {
    if (type === "addMovie") {
      let data = {
        ...formData,
        duration: formData.duration,
        cost: formData.cost,
      } as Movie;
      handleAdd(data);
    } else if (type === "editMovie") {
      if (movieId) {
        let data: MovieEdit = {
          id: movieId,
          image: formData.image,
          cost: formData.cost,
          description: formData.description,
        };

        handleEdit(data);
      }
    } else {
      if (movieId) {
        handleDelete(movieId);
      }
    }
  };

  const handleAdd = (data: Movie) => {
    setError("");
    if (!data.title) {
      setError("Title is empty");
      return;
    } else if (!data.released_date) {
      setError("Released date is empty");
      return;
    } else if (!data.duration) {
      setError("Duration is empty");
      return;
    } else if (!data.image) {
      setError("Image is empty");
      return;
    } else if (!data.cost) {
      setError("Cost is empty");
      return;
    } else if (!data.released_date) {
      setError("Released date is empty");
      return;
    } else if (selectedActors.length === 0) {
      setError("Select atleast 1 cast");
      return;
    } else if (!data.description) {
      setError("Description is empty");
      return;
    }

    dispatch(createMovie({ ...data, actors: selectedActors }));
    closeModal(type);
  };
  const handleEdit = (data: MovieEdit) => {
    setError("");
    if (!data.image) {
      setError("Image is empty");
      return;
    } else if (!data.cost) {
      setError("Cost is empty");
      return;
    } else if (!data.description) {
      setError("Description is empty");
      return;
    }

    dispatch(editMovie({ ...data, actors: selectedActors }));
    closeModal(type);
  };
  const handleDelete = (id: string) => {
    dispatch(deleteMovie(id));
    closeModal(type);
  };
  const changeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "cast") {
      if (value) {
        dispatch(searchActors(value));
      } else {
        dispatch(clearActorsList());
      }
      setActor(value);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const selectAutocomplete = (data: Actor) => {
    setActor("");
    setSelectedActors([...selectedActors, data]);
    setActorList([]);
    dispatch(clearActorsList());
  };

  const removeActor = (id: string) => {
    let actors = selectedActors;
    let newActorList = actors.filter((actor) => actor.id !== id);
    setSelectedActors(newActorList);
  };
  useEffect(() => {
    if (actors.length > 0) {
      const data: Actor[] = [];
      actors.map((actor) => {
        if (!selectedActors.find((selected) => selected.id === actor.id)) {
          if (actor.id) {
            data.push(actor);
          }
        }
      });
      setActorList(data);
    } else {
      setActorList([]);
    }
  }, [actors, setActorList, movies, dispatch]);
  useEffect(() => {
    let movie = movies.find((movie) => movie.id === movieId);
    if (movie) {
      setFormData(movie);
    }
    if (movie?.actors) {
      setSelectedActors(movie.actors);
    }
  }, [movieId]);
  useEffect(() => {
    dispatch(clearActorsList());
  }, [isOpen]);
  return (
    <div>
      <div className="custom-modal-header">
        <div className="title">{title} Movie</div>
      </div>
      <div
        className={
          "custom-modal-body " + (type === "deleteMovie" ? "div-hidden" : "")
        }
      >
        {error ? <div className="error text-center">{error}</div> : ""}
        <div>
          <div
            className={"row my-1 " + (type === "addMovie" ? "" : "div-hidden")}
          >
            <div className="col-3 text-center">
              <label>Movie Title</label>
            </div>
            <div className="col">
              <CustomInput
                type="text"
                className="input"
                name="title"
                changeHandler={changeHandler}
              />
            </div>
          </div>

          <div
            className={"row my-1 " + (type === "addMovie" ? "" : "div-hidden")}
          >
            <div className="col-3 text-center">
              <label>Released Date</label>
            </div>
            <div className="col">
              <CustomInput
                type="text"
                className="input"
                name="released_date"
                changeHandler={changeHandler}
                placeHolder="YYYY-MM-DD"
              />
            </div>
          </div>

          <div
            className={"row my-1 " + (type === "addMovie" ? "" : "div-hidden")}
          >
            <div className="col-3 text-center">
              <label>Duration</label>
            </div>
            <div className="col">
              <CustomNumberInput
                className="input"
                name="duration"
                changeHandler={changeHandler}
                placeHolder="In minutes"
                value={formData.duration}
              />
            </div>
          </div>

          <div className="row my-1">
            <div className="col-3 text-center">
              <label>Image</label>
            </div>
            <div className="col">
              <CustomInput
                type="text"
                className="input"
                name="image"
                changeHandler={changeHandler}
                placeHolder="Link"
                value={formData.image}
              />
            </div>
          </div>

          <div className="row my-1">
            <div className="col-3 text-center">
              <label>Cost</label>
            </div>
            <div className="col">
              <CustomInput
                type="text"
                className="input"
                name="cost"
                changeHandler={changeHandler}
                value={formData.cost}
              />
            </div>
          </div>

          <div className={"row my-1"}>
            <div className="col-3 text-center">
              <label>Cast</label>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-12">
                  <AutoComplete
                    className="input autocomplete"
                    name="cast"
                    changeHandler={changeHandler}
                    data={actorList}
                    selectActor={selectAutocomplete}
                    value={actor}
                    type="Actor"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row my-1 text-start">
            <div className="offset-3 col-9">
              {selectedActors.map((actor, i) => {
                return (
                  <section
                    key={i}
                    className="badge rounded-pill bg-success mx-1"
                  >
                    {actor.firstName} {actor.lastName}&nbsp;
                    <span
                      className="pointer"
                      onClick={() => (actor ? removeActor(actor.id ?? "") : {})}
                    >
                      <FontAwesomeIcon className="ml-3" icon={faClose} />
                    </span>
                  </section>
                );
              })}
            </div>
          </div>

          <div className="row my-1">
            <div className="col-3">
              <label>Description</label>
            </div>
            <div className="col">
              <CustomTextArea
                className="input"
                name="description"
                changeHandler={changeHandler}
                value={formData.description}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={
          "custom-modal-body text-center " +
          (type !== "deleteMovie" ? "div-hidden" : "")
        }
      >
        <div className="form-input">
          <div className="pb-3">
            <FontAwesomeIcon icon={faQuestionCircle} size="4x" />
          </div>
          <span>
            Are you sure you want to <br /> delete this movie?
          </span>
        </div>
      </div>
      <div className="footer py-2">
        <button
          type="submit"
          className="custom-btn full-width-button"
          onClick={submitHandler}
        >
          {title}
        </button>
      </div>
    </div>
  );
};
