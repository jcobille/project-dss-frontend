import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Modal from "../popup/Modal";
import { useState } from "react";
const NavTabs = () => {
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

  const handleChanges = () => {};
  return (
    <div>
      <div className="navtab">
        <div className="section p-4">
          <span className="align-left">MovieViewer</span>
          <div className="align-right">
            <div className="text-center">
              <input
                type="text"
                className="search-input input-md"
                placeholder="Enter keywords..."
              />
              <button
                className="btn-link ml-3"
                onClick={() => openCloseModal("login")}
              >
                <FontAwesomeIcon icon={faUser} /> Member Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        modal={modal}
        closeModal={openCloseModal}
        isConfirm={isConfirm}
        handleChanges={handleChanges}
        changeModal={changeModal}
      />
    </div>
  );
};

export default NavTabs;
