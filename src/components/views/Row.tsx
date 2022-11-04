import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Actor, Movies } from "../../redux/types/ActionTypes";

interface RowProps {
  data: Movies | Actor;
  headers: {
    title: string;
    key: string;
  }[];
  changeModal: (type: string, id?: string) => void;
}

const tableRow = ({ data, headers, changeModal }: RowProps) => {
  return (
    <tr>
      {headers.map((header, i) => {
        if (i < 3) {
          return (
            <td className={i > 0 ? "centered" : ""} key={i}>
              {data[header.key as keyof typeof data]}
            </td>
          );
        } else {
          return (
            <td className="centered" key={i}>
              <button
                type="button"
                className="btn btn-success mx-1"
                onClick={() => changeModal("editMovie", data.id)}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => changeModal("deleteMovie", data.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </td>
          );
        }
      })}
    </tr>
  );
};
export default tableRow;
