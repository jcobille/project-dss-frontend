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
  isOpen
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
  } else if (type == "deleteMovie") {
    title = "Delete";
  }

  const submitHandler = () => {
    let selectedActorsId: string[] = [];
    selectedActors.map((actor) => {
      selectedActorsId.push(actor.id);
    });

    if (type === "addMovie") {
      let data = {
        ...formData,
        actorIds: selectedActorsId,
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

    dispatch(createMovie(data));
    closeModal(type);
  };
  const handleEdit = (data: MovieEdit) => {
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

    dispatch(editMovie(data));
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
      const newActorList = actors.filter(
        (actor) => !selectedActors.find((selected) => selected.id === actor.id)
      );
      setActorList(newActorList);
    } else {
      setActorList([]);
    }
  }, [actors]);
  useEffect(() => {
    let movie = movies.find((movie) => movie.id === movieId);
    if (movie) {
      setFormData(movie);
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
        <div className="">
          <div
            className={"row my-1 " + (type === "addMovie" ? "" : "div-hidden")}
          >
            <div className="col-3 text-center">
              <label className="">Movie Title</label>
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
              <label className="">Released Date</label>
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
              <label className="">Duration</label>
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
              <label className="">Image</label>
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
              <label className="">Cost</label>
            </div>
            <div className="col">
              <CustomNumberInput
                className="input"
                name="cost"
                changeHandler={changeHandler}
                value={formData.cost}
              />
            </div>
          </div>

          <div
            className={"row my-1 " + (type === "addMovie" ? "" : "div-hidden")}
          >
            <div className="col-3 text-center">
              <label className="">Cast</label>
            </div>
            <div className="col">
              <div className="row">
                <div className="col-12">
                  <AutoComplete
                    className="input autocomplete"
                    name="cast"
                    changeHandler={changeHandler}
                    data={actorList}
                    select={selectAutocomplete}
                    value={actor}
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
                    {`${actor.firstName} ${actor.lastName}`} &nbsp;
                    <span
                      className="pointer"
                      onClick={() => removeActor(actor.id)}
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
              <label className="">Description</label>
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
