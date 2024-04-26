import GoogleButton from "../../components/GoogleButton";
import getLogin from "../../utils/user/login";
import { login } from  "../../store/slices/user.slice";
import {useState} from "react";
import { useDispatch} from "react-redux";
import toast from "react-hot-toast";
import getUser from "../../utils/user/getUser";



function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loggedIn = await getLogin(username, password);
    if(loggedIn === 'Unauthorized') {
      toast.error('Invalid username or password');
      setLoading(false);
      return;
    }
    if(loggedIn == null){
      toast.error('An error occured');
      setLoading(false);
      return;
    }
    const user = await getUser();
    if(user === 'Unauthorized') {
      toast.error('An error occured');
      setLoading(false);
      return;
    }
    dispatch(login(user));
    toast.success('Login successful');
    document.getElementById("welcome-modal").showModal();
    setLoading(false);
  };

  return (
    <div className="relative hero min-h-[70vh] h-fit bg-base-200 z-10">
      <div className="hero-content lg:gap-10 gap-4 flex-col lg:flex-row-reverse py-10">
        <div className="text-center lg:text-left">
          <h1 className="md:text-5xl text-3xl font-bold">Login now!</h1>
          <p className="py-6">
            Use your email and password to login to your account. If you don&apos;t have an account, you can create one by clicking the button below.
          </p>
            <button className="btn btn-primary">Create Account</button>
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
                onChange={(e) => {setUsername(e.target.value)}}
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
                className="input input-bordered"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={loading}>{loading ? (<span className="loading loading-spinner loading-sm"></span>): ('Login')}</button>
            </div>
            <GoogleButton />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
