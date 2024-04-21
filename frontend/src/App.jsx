import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { Outlet } from "react-router-dom";
import  { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
      <Modal><Footer /></Modal>
      <Toaster />
    </>
  );
}

export default App;
