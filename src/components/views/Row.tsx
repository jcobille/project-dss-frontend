import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Actor, Movies, User } from "../../redux/types/ActionTypes";
import { CustomButton } from "./CustomInput";

interface RowProps {
  data: Movies | Actor | User;
  headers: {
    title: string;
    key: string;
  }[];
  changeModal: (type: string, id?: string) => void;
  buttonModalTypes: string[];
}

const tableRow = ({
  data,
  headers,
  changeModal,
  buttonModalTypes,
}: RowProps) => {
  return (
    <tr>
      {headers.map((header, i) => {
        if (i < headers.length - 1) {
          if (header.title === "Status") {
            return (
              <td className={i > 0 ? "centered" : ""} key={i}>
                <span
                  className={
                    "badge rounded-pill mx-1 " +
                    (data[header.key as keyof typeof data]
                      ? "bg-success"
                      : "bg-danger")
                  }
                >
                  {data[header.key as keyof typeof data]
                    ? "Active"
                    : "Inactive"}
                </span>
              </td>
            );
          } else {
            return (
              <td className={i > 0 ? "centered" : ""} key={i}>
                {data[header.key as keyof typeof data]}
              </td>
            );
          }
        } else {
          return (
            <td className="centered" key={i}>
              <CustomButton
                className="btn btn-success mx-1"
                modalType={buttonModalTypes[0]}
                dataId={data.id}
                changeModal={changeModal}
                icon={faPen}
              />
              <CustomButton
                className="btn btn-danger"
                modalType={buttonModalTypes[1]}
                dataId={data.id}
                changeModal={changeModal}
                icon={faTrash}
              />
            </td>
          );
        }
      })}
    </tr>
  );
};
export default tableRow;
