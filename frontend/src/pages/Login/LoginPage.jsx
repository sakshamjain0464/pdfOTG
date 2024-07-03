import GoogleButton from "../../components/GoogleButton";
import getLogin from "../../utils/user/login";
import { login } from "../../store/slices/user.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import getUser from "../../utils/user/getUser";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loggedIn = await getLogin(username, password);
    if (loggedIn === "Unauthorized") {
      toast.error("Invalid username or password");
      setLoading(false);
      return;
    }
    if (loggedIn == null) {
      toast.error("An error occured");
      setLoading(false);
      return;
    }
    const user = await getUser();
    if (user === "Unauthorized") {
      toast.error("An error occured");
      setLoading(false);
      return;
    }
    dispatch(login(user));
    toast.success("Login successful");
    navigate("/dashboard");
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="hero h-[90vh] w-full bg-base-200">
      <div className="hero-content w-full flex-col">
        <div className="lg:text-left mb-4 w-full">
          <h1 className="sm:text-5xl text-3xl text-center font-bold">
            Login now!
          </h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                minLength={8}
                className="input input-bordered"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-3">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
            <GoogleButton />
            <div className="divider my-3">OR</div>
            <div className="form-control mt1">
              <Link className="btn btn-primary" to={'/dashboard/signup'}>Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
