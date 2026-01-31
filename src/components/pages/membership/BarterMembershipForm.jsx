import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CancelButtonModal from "../../common/button/CancelButtonModal";
import CommonButton from "../../common/button/CommonButton";
import InputField from "../../common/formFields/InputField";

const schema = yup.object().shape({
  fullName: yup.string().required("Patient name is required"),
  mobileNumber: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10 digit mobile number")
    .required("Mobile number is required"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
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

export default function BarterMembershipForm({ open, handleClose, text }) {
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
      email: "",
    },
  });

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
      <Box sx={style} className="w-[30%] max-w-2xl rounded-xl relative">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-xl text-ayuDark whitespace-nowrap">
            Book Membership
          </h1>
          <CancelButtonModal onClick={handleClose} />
        </div>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="grid  gap-4">
            <div>
              <InputField
                control={control}
                name="fullName"
                label="Full Name"
                error={errors?.fullName}
              />
            </div>
            <div>
              <InputField
                control={control}
                name="email"
                label="Email"
                error={errors?.email}
              />
            </div>
            <div className=" ">
              <InputField
                control={control}
                name="mobileNumber"
                label="Mobile Number"
                error={errors?.mobileNumber}
              />
            </div>
            <p className="text-xs font-medium text-ayuBrown">{text}</p>
            <div className="flex justify-end items-center space-x-3 mt-2">
        
                <CommonButton
                  type="button"
                  label="Reset"
                  className="text-red-600 border border-red-600"
                  onClick={() => {
                    reset();
                  }}
                />
                <CommonButton
                  type="submit"
                  label="Add Member"
                  className="bg-ayuDark text-white px-6"
                />
         
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
