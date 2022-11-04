import { Actor } from "../../redux/types/ActionTypes";

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
  data?: Actor[];
  value?: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  select: (actor: Actor) => void;
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
  const handleClick = (data: Actor) => {
    select(data);
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
                {`${val.firstName} ${val.lastName}`}
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

export {
  CustomInput,
  CustomTextArea,
  CustomSelect,
  CustomNumberInput,
  AutoComplete,
};
