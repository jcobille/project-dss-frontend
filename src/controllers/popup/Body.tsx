interface BodyProps {
  type: string;
  isConfirm: () => void;
  changeModal: (type: string) => void;
  handleChanges: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const Body = ({ type, changeModal, isConfirm, handleChanges }: BodyProps) => {
  if (type === "login") {
    return (
      <div>
        <div className="modal-header">
          <div className="title">Welcome Back!</div>
        </div>

        <div className="modal-body">
          <div className="form-input text-start">
            <label className="form-label">EMAIL</label>
            <input type="text" className="input" />
          </div>
          <div className="form-input text-start">
            <label className="form-label">PASSWORD</label>
            <div>
              <input type="password" className="input" />
            </div>
          </div>
          <div className="form-input text-start">
            <button className="btn btn-login" onClick={isConfirm}>
              Login
            </button>
          </div>
        </div>
        <div className="modal-footer">
          Don't have an account?&nbsp;
          <button className="btn-link" onClick={() => changeModal("register")}>
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
              <input type="text" className="input" />
            </div>

            <div>
              <label className="form-label">EMAIL</label>
              <input type="text" className="input" />
            </div>

            <div>
              <label className="form-label">PASSWORD</label>
              <input type="password" className="input" />
            </div>

            <div>
              <label className="form-label">CONFIRM PASSWORD</label>
              <input type="password" className="input" />
            </div>
          </div>
          <div className="form-input text-start">
            <button className="btn btn-login" onClick={isConfirm}>
              Register
            </button>
          </div>
        </div>
        <div className="modal-footer">
          Have an account?&nbsp;
          <button className="btn-link" onClick={() => changeModal("login")}>
            Login
          </button>
        </div>
      </div>
    );
  }
};

export default Body;
