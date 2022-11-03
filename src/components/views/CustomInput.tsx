interface CustomInputProps {
  type: string;
  name: string;
  className: string;
  placeHolder?: string;
  hidden?: boolean;
  value: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface CustomTextareaProps {
  name: string;
  className: string;
  placeHolder?: string;
  hidden?: boolean;
  value: string;
  changeHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CustomInput = ({
  type,
  name,
  value,
  className,
  placeHolder,
  hidden,
  changeHandler
}: CustomInputProps) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      className={className}
      placeholder={placeHolder}
      hidden={hidden}
      onChange={changeHandler}
    />
  );
};

const CustomTextArea = ({
  name,
  value,
  className,
  placeHolder,
  hidden,
  changeHandler
}: CustomTextareaProps) => {
  return (
    <textarea
      name={name}
      value={value}
      className={className}
      placeholder={placeHolder}
      hidden={hidden}
      onChange={changeHandler}
    />
  );
};

export {CustomInput, CustomTextArea};
