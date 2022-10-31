interface CustomInputProps {
  type: string;
  name: string;
  className: string;
  placeHolder?: string;
  hidden?: boolean;
  value: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
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

export default CustomInput;
