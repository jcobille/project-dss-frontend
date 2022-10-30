import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Body from "./Body";

Modal.setAppElement("#root");
interface ModalProps {
  modal: { type: string; isOpen: boolean };
  closeModal: (type: string) => void;
  isConfirm: () => void;
  changeModal: (type: string) => void;
  handleChanges: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const App = ({
  modal,
  closeModal,
  isConfirm,
  handleChanges,
  changeModal,
}: ModalProps) => {
  return (
    <div>
      <Modal
        isOpen={modal.isOpen}
        className="modal modal-md"
        overlayClassName="overlay-modal"
        closeTimeoutMS={100}
      >
        <button
          className="btn-float-close"
          onClick={() => closeModal(modal.type)}
        >
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </button>

        <Body
          type={modal.type}
          changeModal={changeModal}
          isConfirm={isConfirm}
          handleChanges={handleChanges}
        />
      </Modal>
    </div>
  );
};

export default App;
