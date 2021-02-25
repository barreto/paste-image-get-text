import React from 'react';

import Badge from '../Badge';

interface PastedContainerProps {
  imgSrc: string;
  text: string;
}

const ParstedContainer: React.FC<PastedContainerProps> = ({ imgSrc, text }) => {
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
        <Badge text="copy" pressedText="copied" onClick={handleBadgeClick} />
      </div>
    </div>
  );
};

export default ParstedContainer;
