import { FaTimes } from "react-icons/fa";

type Props = {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    title?: string;
  };
  
  const Modal = ({ open, onClose, children, title }: Props) => {
    if (!open) return null;
  
    return (
      <dialog className="modal modal-open">
        <div className="modal-box bg-bg-secondary">
          <div className="modal-header flex items-center justify-between">
            {title && <h3 className="font-semibold text-lg">{title}</h3>}
            <FaTimes   onClick={onClose}
              className="font-semibold ml-auto cursor-pointer hover:scale-110"/>
          </div>
          {title &&   <div className="divider divider-neutral my-0" /> }
          {children}
        </div>
        <div className="modal-backdrop" onClick={onClose} />
      </dialog>
    );
  };
  
  export default Modal;