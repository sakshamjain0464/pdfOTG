import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import { Outlet } from "react-router-dom";
import { loadFull } from "tsparticles";

function App() {

  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };

  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
      <Modal><Footer /></Modal>
    </>
  );
}

export default App;
