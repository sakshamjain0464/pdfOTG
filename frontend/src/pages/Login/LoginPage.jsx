import GoogleButton from "../../components/GoogleButton";

function LoginPage() {
  return (
    <div className="hero h-full w-full bg-base-200">
      <div className="hero-content w-full flex-col">
        <div className="lg:text-left mb-4 w-full">
          <h1 className="sm:text-5xl text-3xl text-center font-bold">
            Login now!
          </h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                minLength={8}
                className="input input-bordered"
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
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-3">
              <button className="btn btn-primary">Login</button>
            </div>
            <GoogleButton />
            <div className="divider my-3">OR</div>
            <div className="form-control mt1">
              <button className="btn btn-primary">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
