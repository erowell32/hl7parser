import React from 'react';

const LabelWithHoverPopup = ({ label, popupText }) => {
  return (
    <div className="relative group">
      <span className="text-base cursor-pointer">{label}</span>
      <div className="absolute left-1 mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 bg-black text-white text-base px-2 py-1 rounded z-[1000] w-80">
        {popupText}
      </div>
    </div>
  );
};

export default LabelWithHoverPopup;
