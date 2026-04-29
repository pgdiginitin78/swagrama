import React, { useState } from "react";
import CommonButton from "../../../common/button/CommonButton";
import AddNewService from "./AddNewService";

export default function TherapyMaster() {
  const [openTherapyModal, setOpenTherapyModal] = useState(false);
  return (
    <div>
      <div className="w-full p-5">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-semibold text-2xl">Service /Therapy Master</h1>
          <CommonButton
            label={"Create Service"}
            onClick={() => setOpenTherapyModal(true)}
            className={"border border-ayuMid text-ayuMid bg-green-100"}
          />
        </div>

        <div className=""></div>
      </div>

      {openTherapyModal && (
        <AddNewService
          open={openTherapyModal}
          handleClose={() => setOpenTherapyModal(false)}
        />
      )}
    </div>
  );
}
