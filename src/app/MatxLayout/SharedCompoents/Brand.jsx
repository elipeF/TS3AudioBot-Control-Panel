import React from "react";

const Brand = ({ children }) => {
  return (
    <div className="flex items-center justify-between brand-area">
      <div className="flex items-center brand">
        <img src="/assets/images/logo.png" alt="company-logo" />
        <div className="flex-column">
          <span className="brand__text">TS3AudioBot</span>
          <span className="brand__text">Control Panel</span>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Brand;
