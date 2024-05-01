import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { registerPatient } from "../../features/auth/authApiSlice";
import { authSelect } from "../../features/auth/authSlice";

import { PulseLoader } from "react-spinners";

const Register = () => {
  const dispatch = useDispatch();
  const { loader } = useSelector(authSelect);

  // manage input fiel
  const { input, handleInputChange, inputReset } = useForm({
    name: "",
    auth: "",
    password: "",
    role: "patient",
  });

  // user register
  const handleUserRegister = (e) => {
    e.preventDefault();
    dispatch(registerPatient({ input, inputReset }));
  };

  return (
    <>
      {/* Page Content */}
      <div className="content top-space">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              {/* Register Content */}
              <div className="account-content">
                <div className="row align-items-center justify-content-center">
                  <div className="col-md-7 col-lg-6 login-left">
                    <img
                      src="https://cdn.punchng.com/wp-content/uploads/2021/06/12202324/blood-b.jpg"
                      className="img-fluid"
                      alt="Doccure Register"
                    />
                  </div>
                  <div className="col-md-12 col-lg-6 login-right">
                    <div className="login-header">
                      <h3>User Register</h3>
                    </div>
                    {/* Register Form */}
                    <form onSubmit={handleUserRegister}>
                      <div className="mb-3 form-focus">
                        <input
                          type="text"
                          className="form-control floating"
                          name="name"
                          value={input.name}
                          onChange={handleInputChange}
                        />
                        <label className="focus-label">Name</label>
                      </div>
                      <div className="mb-3 form-focus">
                        <input
                          type="text"
                          className="form-control floating"
                          name="auth"
                          value={input.auth}
                          onChange={handleInputChange}
                        />
                        <label className="focus-label">
                          Email Or Mobile Number
                        </label>
                      </div>
                      <h5>Select Here</h5>
                      <div
                        className="mb-3 form-focus d-flex gap-3 align-items-center"
                        style={{ height: "fit-content" }}
                      >
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="role"
                            value="patient"
                            checked={input.role === "patient"}
                            onChange={handleInputChange}
                            className="form-check-input me-2"
                          />
                          Are You Patient
                        </label>
                        <label style={{ cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="role"
                            value="donor"
                            checked={input.role === "donor"}
                            onChange={handleInputChange}
                            className="form-check-input me-2"
                          />
                          Are You Donor
                        </label>
                      </div>
                      <div className="mb-3 form-focus">
                        <input
                          type="password"
                          className="form-control floating"
                          name="password"
                          value={input.password}
                          onChange={handleInputChange}
                        />
                        <label className="focus-label">Create Password</label>
                      </div>
                      <div className="text-end">
                        <Link className="forgot-link" to="/login">
                          Already have an account?
                        </Link>
                      </div>
                      <button
                        className="btn btn-primary w-100 btn-lg login-btn"
                        type="submit"
                      >
                        {loader ? (
                          <PulseLoader
                            style={{
                              textAlign: "center",
                              display: "block",
                            }}
                            color="#fff"
                          />
                        ) : (
                          "Signup"
                        )}
                      </button>

                      <div className="login-or">
                        <span className="or-line" />
                        <span className="span-or">or</span>
                      </div>
                      <div className="row social-login">
                        <div className="col-6">
                          <a href="#" className="btn btn-facebook w-100">
                            <i className="fab fa-facebook-f me-1" /> Login
                          </a>
                        </div>
                        <div className="col-6">
                          <a href="#" className="btn btn-google w-100">
                            <i className="fab fa-google me-1" /> Login
                          </a>
                        </div>
                      </div>
                    </form>
                    {/* /Register Form */}
                  </div>
                </div>
              </div>
              {/* /Register Content */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </>
  );
};

export default Register;
