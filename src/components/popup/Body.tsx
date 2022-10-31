import { useEffect, useState } from "react";
import { startAuthUser } from "../../redux/action/UserActions";
import { useAppDispatch } from "../../store/hooks";
import { emailChecker } from "../utils/misc";
import CustomInput from "../views/CustomInput";

interface BodyProps {
  type: string;
  isConfirm: () => void;
  changeModal: (type: string) => void;
  handleChanges: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

interface LoginProps {
  email: string;
  password: string;
}

interface SignupProps {
  name: string;
  email: string;
  password: string;
}

const Body = ({ type, changeModal, isConfirm, handleChanges }: BodyProps) => {
  const dispatch = useAppDispatch();
  let defaultData =
    type === "login"
      ? { email: "", password: "" }
      : {
          name: "",
          email: "",
          password: "",
        };

  const [formData, setFormData] = useState<LoginProps | SignupProps>(
    defaultData
  );
  const [error, setError] = useState("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (formData.email === "") {
      setError("Email is required");
    } else if (!formData.password) {
      setError("Password is required");
    } else {
      if (!emailChecker(formData.email)) {
        setError("Email is invalid");
        return;
      }
      // dispatch(startAuthUser(formData));
    }
  };

  useEffect(() => {
    setFormData(defaultData);
  }, [type]);

  if (type === "login") {
    return (
      <div>
        <div className="modal-header">
          <div className="title">Welcome Back!</div>
        </div>

        <div className="modal-body">
          <span>{error}</span>
          <div className="form-input text-start">
            <label className="form-label">EMAIL</label>
            <CustomInput
              type="text"
              className="input"
              name="email"
              value={formData?.email}
              changeHandler={changeHandler}
            />

            <label className="form-label">PASSWORD</label>
            <div>
              <CustomInput
                type="password"
                className="input"
                name="password"
                value={formData?.password}
                changeHandler={changeHandler}
              />
            </div>
          </div>
          <div className="form-input text-start">
            <button
              type="submit"
              className="btn btn-login"
              onClick={submitHandler}
            >
              Login
            </button>
          </div>
        </div>
        <div className="modal-footer">
          Don't have an account?&nbsp;
          <button
            className="btn-link active"
            onClick={() => changeModal("register")}
          >
            Register
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="modal-header">
          <div className="title">Create an Account</div>
        </div>

        <div className="modal-body">
          <div className="form-input text-start">
            <div>
              <label className="form-label">YOUR NAME</label>
              <CustomInput
                type="text"
                className="input"
                name="name"
                changeHandler={changeHandler}
                value=""
              />
            </div>

            <div>
              <label className="form-label">EMAIL</label>
              <CustomInput
                type="text"
                className="input"
                name="email"
                changeHandler={changeHandler}
                value={formData.email}
              />
            </div>

            <div>
              <label className="form-label">PASSWORD</label>
              <CustomInput
                type="password"
                className="input"
                name="password"
                changeHandler={changeHandler}
                value={formData.password}
              />
            </div>

            <div>
              <label className="form-label">CONFIRM PASSWORD</label>
              <CustomInput
                type="password"
                className="input"
                changeHandler={changeHandler}
                name=""
                value=""
              />
            </div>
          </div>
          <div className="form-input text-start">
            <button className="btn btn-login" onClick={submitHandler}>
              Register
            </button>
          </div>
        </div>
        <div className="modal-footer">
          Have an account?&nbsp;
          <button
            className="btn-link active"
            onClick={() => changeModal("login")}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
};

export default Body;
