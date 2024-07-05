import { useSelector } from "react-redux";

function Modal({children, id, classname}) {

  return (
    <dialog id={id} className={`modal  ${classname}`}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {children}
      </div>
    </dialog>
  );
}

export default Modal;
