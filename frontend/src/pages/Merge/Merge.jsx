import { useState } from "react";
import Modal from "../../components/Modal";
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
} from "react-grid-dnd";

function Merge() {
  const [files, setFiles] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  const add = () => {
    document.getElementById("file-modal").showModal();
  };

  pdfjs.GlobalWorkerOptions.workerSrc = `http://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const handleFileChange = (e) => {
    const file = e.target.files;
    setFiles([...files, ...file]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setPdfs(() => {
      return files.map((file) => {
        return URL.createObjectURL(file);
      });
    });
  };

  function onChange(sourceId, sourceIndex, targetIndex) {
    const nextState = swap(pdfs, sourceIndex, targetIndex);
    setPdfs(nextState);
  }

  return (
    <>
      <div className="sm:h-screen h-fit overflow-y-scroll">
        <button className="btn" onClick={add}>
          Add PDFs
        </button>
        <div>
          <h1>Files</h1>
          <GridContextProvider onChange={onChange}>
          <div className="w-full grid grid-cols-3 gap-5">
          <GridDropZone
        id="items"
        boxesPerRow={4}
        rowHeight={100}
        style={{ height: "400px" }}
      >
            {pdfs.map((url, index) => (
              <GridItem key={index} className="max-h-56 items-center select-none flex justify-center overflow-hidden p-3 rounded-md border">
                <Document file={url}  loading={<span className="loading loading-spinner loading-sm"></span>}>
                <Page pageNumber={1}  scale={0.2}/>
              </Document>
              </GridItem>
            ))}
            </GridDropZone>
          </div>
          
          </GridContextProvider>
        </div>
      </div>
      <Modal id={"file-modal"}>
        <form action="">
          <input
            type="file"
            name="pdf"
            multiple
            className="file-input w-full max-w-xs"
            onChange={handleFileChange}
          />
          <button type="submit" className="btn" onClick={handleUpload}>
            Upload
          </button>
        </form>
      </Modal>
    </>
  );
}

export default Merge;
