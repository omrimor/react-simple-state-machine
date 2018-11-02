import React from 'react';

export const LoadingState = ({ indicator }) => {
  const Loader = indicator ? indicator : () => null;
  return (
    <div className="card">
      <div className="card-content has-text-centered">
        <Loader />
        <span>Updating ...</span>
      </div>
    </div>
  );
};

export default LoadingState;
