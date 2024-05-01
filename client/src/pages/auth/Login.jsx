import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { authSelect } from "../../features/auth/authSlice";
import useForm from "../../hooks/useForm";
import { loginUser } from "../../features/auth/authApiSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader } = useSelector(authSelect);

  // manage input fields
  const { input, handleInputChange, inputReset } = useForm({
    auth: "",
    password: "",
  });

  // user login
  const handleUserLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ input, inputReset, navigate }));
  };

  return (
    <>
      <>
        {/* Page Content */}
        <div className="content top-space">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8 offset-md-2">
                {/* Login Tab Content */}
                <div className="account-content">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-md-7 col-lg-6 login-left">
                      <img
                        src="https://cdn.punchng.com/wp-content/uploads/2021/06/12202324/blood-b.jpg"
                        className="img-fluid"
                        alt="Doccure Login"
                      />
                    </div>
                    <div className="col-md-12 col-lg-6 login-right">
                      <div className="login-header">
                        <h3>
                          Login <span>Doccure</span>
                        </h3>
                      </div>
                      <form onSubmit={handleUserLogin}>
                        <div className="mb-3 form-focus">
                          <input
                            type="text"
                            className="form-control floating"
                            name="auth"
                            value={input.auth}
                            onChange={handleInputChange}
                          />
                          <label className="focus-label">Email</label>
                        </div>
                        <div className="mb-3 form-focus">
                          <input
                            type="password"
                            className="form-control floating"
                            name="password"
                            value={input.password}
                            onChange={handleInputChange}
                          />
                          <label className="focus-label">Password</label>
                        </div>
                        <div className="text-end">
                          <a
                            className="forgot-link"
                            href="forgot-password.html"
                          >
                            Forgot Password ?
                          </a>
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
                        <div className="text-center dont-have">
                          Don’t have an account?
                          <Link to="/register">Register</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* /Login Tab Content */}
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </>
    </>
  );
};

export default Login;
