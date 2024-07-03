import GoogleButton from "../../components/GoogleButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import signup from "../../utils/user/signup";

function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = await signup(username, password, firstname, lastname, email);
    if (user === "Already exists") {
      toast.error("User Already Exists");
      setLoading(false);
      return;
    }
    if (user == null) {
      toast.error("An error occured");
      setLoading(false);
      return;
    }
    toast.success("User registered successfully");
    navigate("/dashboard");
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="hero h-fit w-full bg-base-200">
      <div className="hero-content w-full flex-col">
        <div className="lg:text-left mb-4 w-full">
          <h1 className="sm:text-5xl text-3xl text-center font-bold">
            Register now!
          </h1>
        </div>
        <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSignup}>
            <div className="flex justify-between sm:flex-row flex-col w-full gap-5">
              <div className="form-control sm:w-1/2">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="eg. John"
                  className="input input-bordered w-full"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="form-control sm:w-1/2">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="eg. Doe"
                  className="input input-bordered w-full"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">E-mail</span>
              </label>
              <input
                type="email"
                placeholder="eg. johndoe@gmail.com"
                minLength={8}
                className="input input-bordered"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
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
                minLength={8}
                className="input input-bordered"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-control mt-3">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
            <GoogleButton />
            <div className="divider my-3">OR</div>
            <div className="form-control mt1">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
