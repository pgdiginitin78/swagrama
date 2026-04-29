import React, { useState } from "react";
import AddNewDoctors from "./AddNewDoctors";
import CommonButton from "../../../common/button/CommonButton";

export default function DoctorMaster() {
  const [openDoctorModal, setOpenDoctorModal] = useState(false);
  return (
    <div>
      <div className="w-full p-5">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-semibold text-2xl">Doctor Master</h1>
          <CommonButton
            label={"Create Doctor"}
            onClick={() => setOpenDoctorModal(true)}
            className={"border border-ayuMid text-ayuMid bg-green-100"}
          />
        </div>

        <div className="">
          
        </div>
      </div>

      {openDoctorModal &&(
        <AddNewDoctors
        open={openDoctorModal}
        handleClose={()=>setOpenDoctorModal(false)}
        />
      )}
    </div>
  );
}
