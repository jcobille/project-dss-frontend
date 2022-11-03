import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Body from "./Body";
import { MovieModalBody } from "./MovieModalBody";

Modal.setAppElement("#root");
interface ModalProps {
  modal: { type: string; isOpen: boolean };
  closeModal: (type: string) => void;
  changeModal: (type: string) => void;
}

const App = ({ modal, closeModal, changeModal }: ModalProps) => {
  return (
    <div>
      <Modal
        isOpen={modal.isOpen}
        className="custom-modal custom-modal-md"
        overlayClassName="overlay-modal"
        closeTimeoutMS={100}
      >
        <button
          className="btn-float-close"
          onClick={() => closeModal(modal.type)}
        >
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </button>
        {modal.type === "login" || modal.type === "register" ? (
          <Body
            type={modal.type}
            changeModal={changeModal}
            closeModal={closeModal}
          />
        ) : (
          <MovieModalBody
            type={modal.type}
            changeModal={changeModal}
            closeModal={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default App;
