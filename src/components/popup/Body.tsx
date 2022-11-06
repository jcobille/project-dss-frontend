import { useEffect, useState } from "react";
import {
  loginUser,
  clearErrorMessage,
  createUser,
} from "../features/currentUserSlice";
import { useAppDispatch } from "../store/hooks";
import { emailChecker } from "../utils/misc";
import { CustomInput } from "../views/CustomInput";

interface BodyProps {
  type: string;
  changeModal: (type: string) => void;
  closeModal: (type: string) => void;
}

interface LoginProps {
  email: string;
  password: string;
}

interface SignupProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Body = ({ type, changeModal, closeModal }: BodyProps) => {
  const dispatch = useAppDispatch();

  const [formLoginData, setFormLoginData] = useState<LoginProps>({
    email: "",
    password: "",
  });
  const [formRegisterData, setFormRegisterData] = useState<SignupProps>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let name = event.target.name;
    let value = event.target.value;

    if (type === "login") {
      setFormLoginData({ ...formLoginData, [name]: value });
    } else {
      setFormRegisterData({ ...formRegisterData, [name]: value });
    }
  };

  const submitLoginHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!formLoginData.email) {
      setError("Email is required");
    } else if (!formLoginData.password) {
      setError("Password is required");
    } else {
      if (!emailChecker(formLoginData.email)) {
        setError("Email is invalid");
        return;
      }

      dispatch(loginUser(formLoginData))
        .unwrap()
        .then((res) => {
          closeModal(type);
        })
        .catch((error) => setError(error));
    }
  };

  const submitRegisterHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (!formRegisterData.firstName) {
      setError("First name is required");
    } else if (!formRegisterData.lastName) {
      setError("Last name is required");
    } else if (!formRegisterData.email) {
      setError("Email is required");
    } else if (!formRegisterData.password) {
      setError("Password is required");
    } else {
      if (!emailChecker(formRegisterData.email)) {
        setError("Email is invalid");
        return;
      } else if (
        formRegisterData.password !== formRegisterData.confirmPassword
      ) {
        setError("Password didn't match");
        return;
      }

      let userDetails = {
        firstName: formRegisterData.firstName,
        lastName: formRegisterData.lastName,
        email: formRegisterData.email,
        password: formRegisterData.password,
      };
      dispatch(createUser(userDetails))
        .unwrap()
        .then((res) => {
          closeModal(type);
        })
        .catch((error) => setError(error));
    }
  };

  useEffect(() => {
    setError("");
    dispatch(clearErrorMessage());
  }, [type, dispatch]);

  if (type === "login") {
    return (
      <div>
        <div className="custom-modal-header">
          <div className="title">Welcome Back!</div>
        </div>

        <div className="custom-modal-body">
          {error ? <div className="error text-center">{error}</div> : ""}
          <div className="form-input text-start">
            <label className="form-label">EMAIL</label>
            <CustomInput
              type="text"
              className="input"
              name="email"
              changeHandler={changeHandler}
            />

            <label className="form-label">PASSWORD</label>
            <div>
              <CustomInput
                type="password"
                className="input"
                name="password"
                changeHandler={changeHandler}
              />
            </div>
          </div>
          <div className="form-input text-start">
            <button
              type="submit"
              className="custom-btn full-width-button"
              onClick={submitLoginHandler}
            >
              Login
            </button>
          </div>
        </div>
        <div className="custom-modal-footer">
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
        <div className="custom-modal-header">
          <div className="title">Create an Account</div>
        </div>
        <div className="custom-modal-body">
          {error ? <div className="error text-center">{error}</div> : ""}
          <div className="form-input text-start">
            <div>
              <label className="form-label">YOUR NAME</label>
              <CustomInput
                type="text"
                className="input"
                name="name"
                changeHandler={changeHandler}
              />
            </div>

            <div>
              <label className="form-label">EMAIL</label>
              <CustomInput
                type="text"
                className="input"
                name="email"
                changeHandler={changeHandler}
              />
            </div>

            <div>
              <label className="form-label">PASSWORD</label>
              <CustomInput
                type="password"
                className="input"
                name="password"
                changeHandler={changeHandler}
              />
            </div>

            <div>
              <label className="form-label">CONFIRM PASSWORD</label>
              <CustomInput
                type="password"
                className="input"
                changeHandler={changeHandler}
                name="confirmPassword"
              />
            </div>
          </div>
          <div className="form-input text-start">
            <button
              className="custom-btn full-width-button"
              onClick={submitRegisterHandler}
            >
              Register
            </button>
          </div>
        </div>
        <div className="custom-modal-footer">
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
