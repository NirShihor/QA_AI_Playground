import { useEffect, ReactNode } from 'react';
import './Popup.css';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content?: string;
  children?: ReactNode;
}

const Popup = ({ isOpen, onClose, title, content, children }: PopupProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="popupOverlay" onClick={onClose}>
      <div className="popupContent" onClick={(e) => e.stopPropagation()}>
        <div className="popupHeader">
          <h2>{title}</h2>
          <button className="closeButton" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="popupBody">
          {content && <p>{content}</p>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;

