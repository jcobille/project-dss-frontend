import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faCaretDown,
  faRightFromBracket,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "../popup/Modal";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CustomInput } from "./CustomInput";
import { getCookie } from "../utils/cookie";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { User } from "../../redux/types/ActionTypes";
import { currentAuthUser } from "../features/currentUserSlice";
const NavTabs = () => {
  const location = useLocation();
  const userToken = getCookie();
  const dispatch = useAppDispatch();
  const [dropdown, setDropdown] = useState(false);
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
      dispatch(currentAuthUser()).then((res) => {});
    }
  }, [userToken, dispatch]);
  const changeHandler = () => {
    return;
  };

  const userButtonHandle = () => {
    setDropdown(!dropdown);
  };
  return (
    <div>
      <div className={"navtab " + (location.pathname === "/" ? "home" : "")}>
        <div className="section p-4">
          <span className="align-left">MovieViewer</span>
          <div className="align-right">
            <div className="text-center">
              <CustomInput
                type={"text"}
                className={"search-input input-md mx-2"}
                placeHolder={"Enter keywords..."}
                hidden={location.pathname === "/"}
                name={"search"}
                changeHandler={changeHandler}
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
                    className="full-width-button user ml-2"
                    onClick={userButtonHandle}
                  >
                    <span className="pr-2">{user.firstName}</span>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </button>
                  <div
                    className={"dropdown-content " + (dropdown ? "show" : "")}
                  >
                    {user.role === "admin" ? (
                      <a href="/admin/dashboard">
                        <FontAwesomeIcon icon={faUserSecret} size="sm" />
                        <span> Admin Page</span>
                      </a>
                    ) : (
                      ""
                    )}
                    <a href="/profile">
                      <FontAwesomeIcon icon={faUserCircle} size="sm" />
                      <span> Profile</span>
                    </a>
                    <a href="/logout">
                      <FontAwesomeIcon icon={faRightFromBracket} size="sm" />
                      <span> Logout</span>
                    </a>
                  </div>
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
