import './styles.css';

import React from 'react';

import { ReactComponent as CloseImg } from '../../assets/icons/close.svg';
import Badge from '../Badge';

interface PastedContainerProps {
  imgSrc: string;
  text: string;
  onClose: () => void;
}

const ParstedItem: React.FC<PastedContainerProps> = ({ imgSrc, text, onClose }) => {
  const handleBadgeClick = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="info-container">
      <div className="image-content">
        <img src={imgSrc} alt="Pasted information" />
      </div>
      <div className="text-content">
        <pre>{text}</pre>
        <button className="btn-close" onClick={onClose} title="Fechar">
          <CloseImg />
        </button>
        <Badge text="copy" pressedText="copied" onClick={handleBadgeClick} />
      </div>
    </div>
  );
};

export default ParstedItem;
