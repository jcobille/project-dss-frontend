import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faCaretDown,
  faRightFromBracket,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../popup/Modal";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AutoComplete, CustomInput } from "./CustomInput";
import { getCookie, logout } from "../utils/cookie";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Movie, Movies, User } from "../../redux/types/ActionTypes";
import {
  clearCurrentUser,
  currentAuthUser,
} from "../features/currentUserSlice";
import { searchMovies } from "../features/movieSlice";
const NavTabs = () => {
  const location = useLocation();
  const userToken = getCookie();
  const dispatch = useAppDispatch();
  const [dropdown, setDropdown] = useState(false);
  const [moviesFound, setMoviesFound] = useState<Movie[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const user = useAppSelector<User>(
    (state) => state.currentUser.details as User
  );
  const [modal, setModal] = useState({
    type: "",
    isOpen: false,
  });

  const openCloseModal = (type: string) => {
    setModal({
      type: type,
      isOpen: !modal.isOpen,
    });
  };

  const changeModal = (type: string) => {
    setModal({ ...modal, type: type });
  };

  useEffect(() => {
    if (userToken) {
      dispatch(currentAuthUser());
    }
  }, [userToken, dispatch]);

  const changeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value) {
      let list = await dispatch(searchMovies(value));
      let movies = list.payload as Movies[];
      setMoviesFound(movies);
      setSearchValue(value);
    } else {
      setMoviesFound([]);
    }
  };

  const selectAutocomplete = ({ id }: Movie) => {
    navigate(`/movie/details/${id}`);
    setMoviesFound([]);
    setSearchValue("");
  };

  const userButtonHandle = () => {
    setDropdown(!dropdown);
  };

  const userLogout = () => {
    logout();
    dispatch(clearCurrentUser());
  };

  useEffect(() => {
    setMoviesFound([]);
    setSearchValue("");
  }, [location.pathname]);
  return (
    <div>
      <div className={"navtab " + (location.pathname === "/" ? "home" : "")}>
        <div className="section p-4">
          <Link to="/">
            <span className="link align-left">MovieViewer</span>
          </Link>
          <div className="align-right">
            <div className="text-center">
              <AutoComplete
                className="search-input input-md mx-2"
                name="search"
                hidden={location.pathname === "/"}
                changeHandler={changeHandler}
                data={moviesFound}
                placeHolder="Enter keywords ..."
                selectMovie={selectAutocomplete}
                type="Movie"
                value={searchValue}
              />
              {!userToken ? (
                <button
                  className="ml-3 bordered-button btn-md"
                  onClick={() => openCloseModal("login")}
                >
                  <FontAwesomeIcon icon={faUserCircle} /> Member Login
                </button>
              ) : (
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.firstName}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      {user.role === "Admin" ? (
                        <Link to="/admin/movies" className="dropdown-item">
                          <FontAwesomeIcon icon={faUserSecret} size="sm" />
                          <span> Admin Page</span>
                        </Link>
                      ) : (
                        ""
                      )}
                    </li>
                    <li>
                      <Link
                        to="/"
                        onClick={userLogout}
                        className="dropdown-item"
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} size="sm" />
                        <span> Logout</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        modal={modal}
        closeModal={openCloseModal}
        changeModal={changeModal}
      />
    </div>
  );
};

export default NavTabs;
