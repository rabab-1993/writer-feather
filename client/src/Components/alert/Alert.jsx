import React, { useState } from "react";
import "./style.css";
export const Success = ({ message, description }) => {
  const [close, setClose] = useState(true);
  return (
    <>
      {close && (
        <div className="success">
          <h3>
            <span className="icon">&#10004;</span>
            {message}
          </h3>
          <button className="close" onClick={() => setClose(false)}>
            &#10005;
          </button>
          <p>{description}</p>
        </div>
      )}
    </>
  );
};

export const Error = ({ message, description }) => {
  const [close, setClose] = useState(true);
  return (
    <>
      {close && (
        <div className="error">
          <h3>
            <span className="icon">&#10005;</span>
            {message}
          </h3>
          <button className="close" onClick={() => setClose(false)}>
            &#10005;
          </button>
          <p>{description}</p>
        </div>
      )}
    </>
  );
};

export const Warning = ({ message, children }) => {
  return (
    <div className="warning">
      <h3>
        <span className="icon"></span>
        {message}
      </h3>
      {children}
    </div>
  );
};
