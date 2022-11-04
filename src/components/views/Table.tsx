import { Actor, Movie } from "../../redux/types/ActionTypes";
import TableRow from "./Row";

interface TableProps {
  data: Movie[] | Actor[];
  headers: {
    title: string;
    key: string;
  }[];
  minRow: number;
  tableType: string;
  changeModal: (type: string) => void;
}
const Table = ({
  data,
  headers,
  tableType,
  minRow,
  changeModal,
}: TableProps) => {
  const length = data.length < minRow ? minRow : data.length;

  return (
    <>
      <table className="table table-dark">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                scope="col"
                className={index > 0 ? "centered" : ""}
                key={index}
              >
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(length)].map((_, i) => {
            if (data[i]) {
              return (
                <TableRow
                  key={i}
                  data={data[i]}
                  headers={headers}
                  changeModal={changeModal}
                />
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
};
export default Table;
