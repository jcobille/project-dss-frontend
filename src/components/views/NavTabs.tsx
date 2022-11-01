import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle,faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Modal from "../popup/Modal";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomInput from "./CustomInput";
import { getCookie } from "../utils/cookie";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { User } from "../../redux/types/ActionTypes";
const NavTabs = () => {
  const location = useLocation();
  const userToken = getCookie();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => console.log(state));
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

  const isConfirm = () => {
    return [];
  };
  const changeModal = (type: string) => {
    setModal({ ...modal, type: type });
  };

  useEffect(() => {
    if (userToken) {
      // dispatch(startSetCurrentAuthUser());
    }
  }, [userToken]);
  const changeHandler = () => {
    return;
  };
  return (
    <div>
      <div className="navtab">
        <div className="section p-4">
          <span className="align-left">MovieViewer</span>
          <div className="align-right">
            <div className="text-center">
              <CustomInput
                type={"text"}
                className={"search-input input-md"}
                placeHolder={"Enter keywords..."}
                hidden={location.pathname === "/"}
                name={"search"}
                changeHandler={changeHandler}
                value=""
              />
              {!userToken ? (
                <button
                  className={
                    "ml-3 " +
                    (location.pathname === "/"
                      ? "bordered-button btn-md"
                      : "btn-link")
                  }
                  onClick={() => openCloseModal("login")}
                >
                  <FontAwesomeIcon icon={faUserCircle} /> Member Login
                </button>
              ) : (
                <button className="btn-login user ml-2">
                  {/* <span className="pr-2">{user.name}</span> */}
                  <FontAwesomeIcon icon={faCaretDown}/>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        modal={modal}
        closeModal={openCloseModal}
        isConfirm={isConfirm}
        handleChanges={changeHandler}
        changeModal={changeModal}
      />
    </div>
  );
};

export default NavTabs;
