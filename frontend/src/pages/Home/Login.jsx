import GoogleButton from "../../components/GoogleButton";

function Login() {
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
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <GoogleButton />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
