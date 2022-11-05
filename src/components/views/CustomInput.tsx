import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Actor, Movie, searchProps } from "../../redux/types/ActionTypes";

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
  data?: searchProps[];
  value?: string;
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  select: (data: searchProps) => void;
}

interface CustomButtonProps {
  dataId?: string;
  icon: IconProp;
  modalType: string;
  className: string;
  changeModal: (type: string, id: string) => void;
}

interface CustomRadioButtonProps {
  data: string[];
  name: string;
  dataId?: string;
  value?: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  select,
  value,
}: CustomAutocompleteProps) => {
  const handleClick = (data: searchProps) => {
    if (data) {
      select(data);
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
      />
      <div className="autocomplete-items">
        {data?.length ? (
          data?.map((val, i) => {
            return (
              <div
                key={i}
                className="text-start"
                onClick={() => handleClick(val)}
              >
                {val.name}
              </div>
            );
          })
        ) : value ? (
          <div className="text-start">Can't find the specified cast</div>
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
}: CustomButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => changeModal(modalType, dataId)}
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

export {
  CustomInput,
  CustomTextArea,
  CustomSelect,
  CustomNumberInput,
  AutoComplete,
  CustomButton,
  CustomRadioButton,
};
