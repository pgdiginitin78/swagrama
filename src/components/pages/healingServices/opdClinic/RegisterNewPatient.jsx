import { Phone } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import DatePickerField from "../../../common/formFields/DatePickerField";
import DropdownField from "../../../common/formFields/DropdownField";
import InputField from "../../../common/formFields/InputField";
import RadioField from "../../../common/formFields/RadioField";
import { successAlert } from "../../../common/toast/CustomToast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function RegisterNewPatient({ open, handleClose }) {
  const schema = yup.object().shape({
    selectClinic: yup
      .object()
      .nullable()
      .shape({
        value: yup.string().required("required"),
        label: yup.string().required("required"),
      })
      .required("Required"),
    dateOfBirth: yup
      .date()
      .nullable()
      .required("Please select a date")
      .min(new Date(), "Date must be today or later"),
    firstName: yup.string().required("firstName name is required"),
    lastName: yup.string().required("lastName name is required"),
    age: yup.string().required("age name is required"),

    // mobileNumber: yup
    //   .string()
    //   .matches(/^[6-9]\d{9}$/, "Enter a valid 10 digit mobile number")
    //   .required("Mobile number is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      age: "",
      gender: "1",
      selectClinic: null,
      healthIssue: "",
    },
  });

  const onSubmitHandler = (data) => {
    console.log("Form Data =>", data);
    successAlert("Patient Register Successfully!");
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="booking-modal-title"
    >
      <Box
        sx={style}
        className="w-[60%] max-w-2xl rounded-xl relative overflow-y-auto max-h-[75%]"
      >
        <CancelButtonModal onClick={handleClose} />
        <div className="mb-2">
          <h1 className="font-semibold text-xl text-ayuDark whitespace-nowrap">
            Register Patient
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <InputField
                control={control}
                label={"First Name"}
                name="firstName"
                error={errors.firstName}
              />
            </div>
            <div>
              <InputField
                control={control}
                label={"Last Name"}
                name="lastName"
                error={errors.lastName}
              />
            </div>
            <div>
              <DatePickerField
                control={control}
                name="dateOfBirth"
                label="Date Of Birth *"
                error={errors.dateOfBirth}
                disableFuture={true}
                inputFormat={"dd-MM-yyyy"}
              />
            </div>
            <div>
              <InputField
                control={control}
                name="age"
                label="Age"
                error={errors.age}
              />
            </div>
            <div className="flex space-x-2 items-center">
              <h5 className="text-sm font-semibold -mt-1.5">Gender : </h5>
              <RadioField
                control={control}
                name="gender"
                dataArray={[
                  {
                    id: 1,
                    value: 1,
                    label: "Male",
                  },
                  {
                    id: 2,
                    value: 2,
                    label: "Female",
                  },
                  {
                    id: 3,
                    value: 3,
                    label: "Other",
                  },
                ]}
              />
            </div>
            <div>
              <DropdownField
                control={control}
                name="selectClinic"
                placeholder="Select Clinic *"
                label="Doctor"
                error={errors?.selectClinic}
              />
            </div>
            <div className="font-semibold text-sm">
              <h6 className="">Registerd Mobile No : </h6>
              <p className="text-ayuTulsi">
                <Phone fontSize="small" />
                &nbsp;7057010657
              </p>
            </div>
            <div>
              <InputField
                control={control}
                label={"Describe Health Issue"}
                name="healthIssue"
                multiline={true}
                minRows={4}
                maxRows={4}
              />
            </div>

            <div className="col-span-2 flex justify-end space-x-2 items-center mt-14">
              <CommonButton
                type="button"
                label="Reset"
                className="text-red-600 border border-red-600 "
                onClick={() => reset()}
              />
              <CommonButton
                type="submit"
                label="Book Appointment"
                className="bg-ayuDark text-white px-2"
              />
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
