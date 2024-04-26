import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { Outlet } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import getUser from "./utils/user/getUser";
import { login } from "./store/slices/user.slice";
import toast from "react-hot-toast";

function App() {

  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleGetUser = async () => {
      const user = await getUser();
      if(user === 'Unauthorized') {
        document.getElementById("login-modal").showModal();
        return;
      }
      if(user === null) {
        document.getElementById("login-modal").showModal();
        return;
      }
      dispatch(login(user));
      toast.success('Login successful');
      document.getElementById("welcome-modal").showModal();
    }
    handleGetUser();
  },[])

  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
      <Modal><Footer /></Modal>
      <Toaster />
      <Modal id={"login-modal"}>
      <div className="w-full h-full flex items-center justify-center flex-col gap-3">
          <h1 className="text-3xl text-center font-bold">Welcome👋</h1>
          <p className="tracking-wider text-center">
            Looks Like you have not signed in yet.<br/> Click the button below to login now!.
          </p>
          <Link className="btn btn-outline btn-info" to={'/dashboard/login'} onClick={() => {document.getElementById("login-modal").close()}}>Login Now!</Link>
        </div>
      </Modal>
      <Modal id={"welcome-modal"}>
        <div className="w-full h-full flex items-center justify-center flex-col gap-3">
          <h1 className="text-3xl text-center font-bold">Welcome Back 👋</h1>
          <h2 className="text-2xl text-center font-semibold tracking-wider">
            {user?.firstname + " " + user?.lastname}
          </h2>
          <p className="italic">
            Wow, it&apos;s been a while! We&apos;re thrilled to see you back.
          </p>
          <p>Click the button below to head to your dashboard.</p>
          <Link className="btn btn-outline btn-info" to={'/dashboard'} onClick={() => {document.getElementById("welcome-modal").close()}}>Go Now!</Link>
        </div>
      </Modal>
    </>
  );
}

export default App;
