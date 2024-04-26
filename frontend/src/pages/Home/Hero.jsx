import Login from "./Login";
import ParticlesComponent from "../../components/Particles";

function Hero() {
  return (
    <main className="h-fit w-screen bg-base-200 p6 select-none">
      <div className="hero h-[90vh] mt-3 w-full">
        <div className="hero-content particles-js text-center">
          <div className="max-w-xl">
            <ParticlesComponent id="hero-particles" />
            <h1 className="sm:text-5xl text-4xl font-bold tracking-wider">
              Welcome To pdfOTG
            </h1>
            <p className="py-6 tracking-wider">
              pdfOTG is your ultimate solution for merging PDF documents
              effortlessly. Whether you need to combine multiple PDF files into
              a single document or rearrange pages to create a customized
              compilation, pdfOTG makes the process simple and intuitive.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
      <div className="relative h-fit md:py-20 py-10 px-10 w-full bg-base-100 z-10">
        <div className="w-full flex flex-col items-center">
          <h1 className="sm:text-4xl text-3xl text-center font-bold tracking-wider">
            Features
          </h1>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-20 md:px-10 px-5 tracking-wide w-full h-fit mt-[40px]">
            <div className="col-span-1 hover:text-secondary ease-in duration-300">
              <h2 className="text-2xl font-semibold mb-3">Merge PDFs</h2>
              <p>
                Select multiple PDF files from your computer and merge them into
                a single document with just a few clicks.
              </p>
            </div>
            <div className="col-span-1 hover:text-secondary ease-in duration-300">
              <h2 className="text-2xl font-semibold mb-3">
                Drag and Drop Interface
              </h2>
              <p>
                {" "}
                Easily rearrange the order of pages using our intuitive
                drag-and-drop interface. Customize the layout of your merged
                document to suit your needs.
              </p>
            </div>
            <div className="col-span-1 hover:text-secondary ease-in duration-300">
              <h2 className="text-2xl font-semibold mb-3">
                Security and Cloud Support
              </h2>
              <p>
                Seamlessly store and access your PDF files from the cloud.
                pdfOTG integrates with popular cloud storage services, allowing
                you to upload, merge, and download documents with ease.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Login />
    </main>
  );
}

export default Hero;
