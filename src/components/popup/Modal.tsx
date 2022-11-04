import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Body from "./Body";
import { MovieModalBody } from "./MovieModalBody";
import { ActorModalBody } from "./ActorModalBody";
import { UserModalBody } from "./UserModalBody";

Modal.setAppElement("#root");
interface ModalProps {
  modal: { id?: string; type: string; isOpen: boolean };
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
        {(modal.type === "login" || modal.type === "register") && (
          <Body
            type={modal.type}
            changeModal={changeModal}
            closeModal={closeModal}
          />
        )}

        {(modal.type === "addMovie" ||
          modal.type === "editMovie" ||
          modal.type === "deleteMovie") && (
          <MovieModalBody
            movieId={modal.id}
            type={modal.type}
            changeModal={changeModal}
            closeModal={closeModal}
            isOpen={modal.isOpen}
          />
        )}

        {(modal.type === "addActor" ||
          modal.type === "editActor" ||
          modal.type === "deleteActor") && (
          <ActorModalBody
            actorId={modal.id}
            type={modal.type}
            changeModal={changeModal}
            closeModal={closeModal}
            isOpen={modal.isOpen}
          />
        )}

        {(modal.type === "addUser" ||
          modal.type === "editUser" ||
          modal.type === "deleteUser") && (
          <UserModalBody
            userId={modal.id}
            type={modal.type}
            changeModal={changeModal}
            closeModal={closeModal}
            isOpen={modal.isOpen}
          />
        )}
      </Modal>
    </div>
  );
};

export default App;
