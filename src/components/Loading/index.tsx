import './style.css';

import React from 'react';

const Loading = () => {
  return (
    <div className="container-loading">
      <p>Loading ...</p>
      <div className="progress">
        <div className="inner-progress"></div>
      </div>
    </div>
  );
};

export default Loading;
