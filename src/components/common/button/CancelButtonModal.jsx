import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function CancelButtonModal({ onClick }) {
  return (
    <div className="grid grid-cols-1 w-full">
      <HighlightOffIcon
        fontSize="medium"
        className="h-[36px] absolute top-3 right-5 lg:right-3 text-red-600  rounded cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
}

export default CancelButtonModal;