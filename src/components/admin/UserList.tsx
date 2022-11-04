import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Movie } from "../../redux/types/ActionTypes";
import { getMovies } from "../features/movieSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Table from "../views/Table";
import { AdminNavTabs } from "./AdminNavTabs";
import Modal from "../popup/Modal";

export const UserList = () => {
  const tableHeader = [
    { title: "Movie Title", key: "title" },
    { title: "Description", key: "description" },
    { title: "Released Date", key: "released_date" },
    { title: "", key: "id" },
  ];
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
    setModal({ ...modal, type: type, isOpen: true });
  };

//   const UserList = useAppSelector(
//     (state) => state.UserList.movies as Movie[]
//   );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);
  return (
    <section>
      <div className="section mt-3">
        <AdminNavTabs />
        <div className="section-container dark">
          <div className="header">
            <div>
              <span className="title">Actors List</span>
              <button className="btn-float-end" onClick={() => openCloseModal("addMovie")}>
                <FontAwesomeIcon className="pr-3" icon={faPlus} />
                <span> Add Actor</span>
              </button>
            </div>
          </div>
          <div className="mt-2"></div>
          {/* <Table
            headers={tableHeader}
            data={UserList}
            minRow={15}
            tableType="movies"
            changeModal={changeModal}
          /> */}
        </div>
      </div>
      <Modal
        modal={modal}
        closeModal={openCloseModal}
        changeModal={changeModal}
      />
    </section>
  );
};
