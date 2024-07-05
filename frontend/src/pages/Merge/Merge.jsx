import { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import axios from 'axios';

function Merge() {
  const [files, setFiles] = useState([]);
  const [draggedFiles, setDraggedFiles] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  const add = () => {
    document.getElementById("file-modal").showModal();
  };
  const change = () => {
    setDraggedFiles(files);
    document.getElementById("sequence-modal").showModal();
  };

  const handleFileChange = (e) => {
    const file = e.target.files;
    setFiles([...files, ...file]);
  };

  const createPdfURL = (filesArr) => {
    return filesArr.map((file) => {
      return URL.createObjectURL(file);
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log(files);
    setPdfs(createPdfURL(files));
    document.getElementById("file-modal").close();
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(draggedFiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDraggedFiles(items);
  };

  const mergePDFs = async () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('pdfs', files[i]);
    }

    try {
      const response = await axios.post('http://localhost:3000/pdf/merge', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload response:', response.data);
      const a = document.createElement('a');
      a.href = response.data.url;
      a.download = 'merged.pdf';
      a.click();
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }

  return (
    <>
      <div className="sm:h-screen w-screen h-fit overflow-y-auto px-10 flex flex-col items-center p-5">
        <div className="flex gap-6">
          <button className="btn btn-secondary" onClick={add}>
            + Add PDFs
          </button>
          <button className="btn btn-secondary" onClick={change}>
            {"->"} Change Sequence
          </button>
          {files.length > 1 && (
            <button className="btn btn-secondary" onClick={mergePDFs}>
              {" "}
              Merge PDFs
            </button>
          )}
        </div>
        <div>
          <h1 className="text-3xl text-center my-5">Selected Files</h1>
          <div className="w-full flex gap-8 flex-wrap p-5 overflow-hidden justify-center">
            {files &&
              pdfs.map((pdf, index) => (
                <div
                  key={index}
                  className="w-[15rem] h-fit overflow-hidden rounded-md">
                  <embed src={pdf} type="application/pdf" height={"320"} />
                  <p>
                    {typeof files[index] != "undefined" && files[index]?.name}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Modal
        id={"file-modal"}
        classname={"max-w-screen max-h-screen overflow-y-auto"}>
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
      <Modal
        id={"sequence-modal"}
        classname={
          "max-w-screen max-h-screen overflow-y-auto overflow-x-hidden"
        }>
        <p className="text-center">Drag and Drop Files to change sequence</p>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="fileNames">
            {(provided) => (
              <ul
                id="fileNames"
                className="flex flex-col"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {draggedFiles.map((file, index) => (
                  <Draggable
                    key={index}
                    draggableId={"file" + index}
                    index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-neutral-600 my-3 p-3 flex relative">
                        <p>{file && file.name}</p>
                        <IoIosRemoveCircleOutline
                          className="text-xl absolute right-3"
                          onClick={() => {
                            setDraggedFiles((prev) => [
                              ...prev.filter((f, i) => i !== index),
                            ]);
                          }}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <button
          type="submit"
          className="btn w-full text-center"
          onClick={() => {
            document.getElementById("sequence-modal").close();
            setFiles([...draggedFiles]);
            setPdfs(createPdfURL(draggedFiles));
            setDraggedFiles([]);
          }}>
          Done
        </button>
      </Modal>
    </>
  );
}

export default Merge;
