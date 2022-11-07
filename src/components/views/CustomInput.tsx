import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Actor, Movie } from "../../redux/types/ActionTypes";

interface CustomInputProps {
  type: string;
  name: string;
  className: string;
  placeHolder?: string;
  hidden?: boolean;
  value?: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CustomNumberProps {
  name: string;
  className: string;
  placeHolder?: string;
  hidden?: boolean;
  value?: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CustomTextareaProps {
  name: string;
  className: string;
  placeHolder?: string;
  hidden?: boolean;
  value?: string;
  changeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface CustomSelectProps {
  name: string;
  className: string;
  placeHolder?: string;
  hidden?: boolean;
  value: string;
  changeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface CustomAutocompleteProps {
  name: string;
  className: string;
  placeHolder?: string;
  data?: Actor[] | Movie[];
  value?: string;
  type?: string;
  hidden?: boolean;
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectMovie?: (data: Movie) => void;
  selectActor?: (data: Actor) => void;
}

interface CustomButtonProps {
  dataId?: string;
  icon: IconProp;
  modalType: string;
  className: string;
  changeModal: (type: string, id: string) => void;
  disabled?: boolean;
}

interface CustomRadioButtonProps {
  data: string[];
  name: string;
  dataId?: string;
  value?: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface StarRatingsProps {
  ratings?: number;
  changeHandler?: (rate: number) => void;
}
const CustomInput = ({
  type,
  name,
  className,
  placeHolder,
  hidden,
  changeHandler,
  value,
}: CustomInputProps) => {
  return (
    <div>
      <input
        type={type}
        name={name}
        className={className}
        placeholder={placeHolder}
        hidden={hidden}
        onChange={changeHandler}
        value={value}
      />
    </div>
  );
};

const CustomNumberInput = ({
  name,
  className,
  placeHolder,
  hidden,
  changeHandler,
  value = "",
}: CustomNumberProps) => {
  return (
    <div>
      <input
        type="number"
        name={name}
        className={className}
        placeholder={placeHolder}
        hidden={hidden}
        onChange={changeHandler}
        min="1"
        value={value}
      />
    </div>
  );
};

const CustomTextArea = ({
  name,
  className,
  placeHolder,
  hidden,
  changeHandler,
  value,
}: CustomTextareaProps) => {
  return (
    <textarea
      name={name}
      className={className}
      placeholder={placeHolder}
      hidden={hidden}
      onChange={changeHandler}
      value={value}
    />
  );
};

const CustomSelect = ({
  name,
  className,
  placeHolder,
  hidden,
  changeHandler,
  value,
}: CustomSelectProps) => {
  return (
    <select
      name={name}
      className={className}
      placeholder={placeHolder}
      hidden={hidden}
      onSelect={changeHandler}
      value={value}
    />
  );
};

const AutoComplete = ({
  name,
  className,
  placeHolder,
  data,
  changeHandler,
  selectMovie,
  selectActor,
  value,
  type,
  hidden,
}: CustomAutocompleteProps) => {
  const handleClick = (data: Movie | Actor) => {
    if (data) {
      if (type === "Movie" && selectMovie) {
        selectMovie(data as Movie);
      } else if (type === "Actor" && selectActor) {
        selectActor(data as Actor);
      }
    }
  };
  return (
    <div className="autocomplete">
      <input
        type="text"
        className={className}
        name={name}
        placeholder={placeHolder}
        autoComplete="off"
        onChange={changeHandler}
        value={value}
        hidden={hidden}
      />
      <div className="autocomplete-items" hidden={hidden}>
        {data?.length ? (
          data?.map((val, i) => {
            return (
              <div
                key={i}
                className="text-start"
                onClick={() => handleClick(val)}
              >
                {type === "Actor" &&
                  `${val["firstName" as keyof typeof val]} ${
                    val["lastName" as keyof typeof val]
                  }`}
                {type === "Movie" && `${val["title" as keyof typeof val]}`}
              </div>
            );
          })
        ) : value ? (
          <div className="text-start">No results found</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const CustomButton = ({
  dataId = "",
  icon,
  modalType,
  changeModal,
  className,
  disabled = true,
}: CustomButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => changeModal(modalType, dataId)}
      disabled={!disabled}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

const CustomRadioButton = ({
  data,
  name,
  value,
  dataId,
  changeHandler,
}: CustomRadioButtonProps) => {
  return (
    <div className="text-start">
      {data.map((gender, i) => {
        return (
          <div className="form-check form-check-inline" key={i}>
            <input
              className="form-check-input"
              type="radio"
              name={name}
              checked={gender === value}
              value={gender}
              onChange={changeHandler}
            />
            <label className="form-check-label">{gender}</label>
          </div>
        );
      })}
    </div>
  );
};

const StarRatings = ({ ratings, changeHandler }: StarRatingsProps) => {
  return (
    <span>
      {[...Array(5)].map((_, i) => {
        if (ratings && ratings > i) {
          return (
            <span
              key={i}
              className={changeHandler ? "pointer" : ""}
              onMouseEnter={() => {
                if (changeHandler) changeHandler(i);
              }}
            >
              <FontAwesomeIcon icon={faStar} color="yellow" />
            </span>
          );
        } else {
          return (
            <span
              key={i}
              className={changeHandler ? "pointer" : ""}
              onMouseEnter={() => {
                if (changeHandler) changeHandler(i);
              }}
            >
              <FontAwesomeIcon icon={faStar} key={i} />
            </span>
          );
        }
      })}
    </span>
  );
};

export {
  CustomInput,
  CustomTextArea,
  CustomSelect,
  CustomNumberInput,
  AutoComplete,
  CustomButton,
  CustomRadioButton,
  StarRatings,
};
