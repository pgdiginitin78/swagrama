import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CancelButtonModal from "../../common/button/CancelButtonModal";
import CommonButton from "../../common/button/CommonButton";
import DatePickerField from "../../common/formFields/DatePickerField";
import InputField from "../../common/formFields/InputField";
import { useState } from "react";
import { Button, Typography } from "@mui/material";

const schema = yup.object().shape({
  dateOfBirth: yup
    .date()
    .nullable()
    .required("Please select a date")
    .min(new Date(), "Date must be today or later"),
  fullName: yup.string().required("Patient name is required"),
  mobileNumber: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10 digit mobile number")
    .required("Mobile number is required"),
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function MembershipFormModal({ open, handleClose,text }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      mobileNumber: "",
      dateOfBirth: null,
      isAgree: false,
    },
  });

  const [fileName, setFileName] = useState("");
  const [fileBase64, setFileBase64] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileBase64(reader.result);
    };
  };

  const onSubmitHandler = (data) => {
    console.log("Form Data =>", data);
    alert("Appointment Booked Successfully!");
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="booking-modal-title"
    >
      <Box sx={style} className="w-[60%] max-w-2xl rounded-xl relative">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-xl text-ayuDark whitespace-nowrap">
            Book Membership
          </h1>
          <CancelButtonModal onClick={handleClose} />
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              control={control}
              name="fullName"
              label="Full Name"
              error={errors?.fullName}
            />
            <InputField
              control={control}
              name="mobileNumber"
              label="Mobile Number"
              error={errors?.mobileNumber}
            />
            <DatePickerField
              control={control}
              name="dateOfBirth"
              label="Select Date"
              error={errors.dateOfBirth}
              disablePast={true}
              inputFormat={"dd-MM-yyyy"}
            />

            <div className="grid items-center gap-2">
              <Box className="p-1 w-full max-w-md ">
                <div className="flex space-x-2 items-center">
                  <label htmlFor="">Upload File</label>
                  <label>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="contained"
                      component="span"
                      className="!bg-green-600 hover:!bg-green-700"
                    >
                      Choose File
                    </Button>
                  </label>
                </div>

                {fileName && (
                  <Typography className="text-gray-500 text-xs">
                    File Name : <b>{fileName}</b>
                  </Typography>
                )}
              </Box>
            </div>

            <div className="col-span-2 flex justify-between items-center mt-2">
              <p className="text-xs font-medium text-ayuBrown">
                {text}
              </p>

              <div className="flex space-x-2 items-center">
                <CommonButton
                  type="button"
                  label="Reset"
                  className="text-red-600 border border-red-600"
                  onClick={() => {
                    reset();
                    setFileBase64("");
                    setFileName("");
                  }}
                />
                <CommonButton
                  type="submit"
                  label="Add Member"
                  className="bg-ayuDark text-white px-6"
                />
              </div>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
