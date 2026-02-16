import { yupResolver } from "@hookform/resolvers/yup";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CancelButtonModal from "../../common/button/CancelButtonModal";
import CommonButton from "../../common/button/CommonButton";
import DatePickerField from "../../common/formFields/DatePickerField";
import DropdownField from "../../common/formFields/DropdownField";
import InputField from "../../common/formFields/InputField";
import RadioField from "../../common/formFields/RadioField";

const patientSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .matches(/^[A-Za-z\s]+$/, "First name can only contain letters"),

  lName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Last name can only contain letters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),

  contactNumber: yup
    .string()
    .required("Contact number is required")
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      "Please enter a valid contact number",
    )
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number must not exceed 15 digits"),

  dateOfBirth: yup
    .date()
    .nullable()
    .max(new Date(), "Date of birth cannot be in the future")
    .test("age", "Patient must be at least 1 year old", function (value) {
      if (!value) return true;
      const cutoff = new Date();
      cutoff.setFullYear(cutoff.getFullYear() - 1);
      return value <= cutoff;
    }),

  age: yup
    .number()
    .nullable()
    .positive("Age must be a positive number")
    .integer("Age must be a whole number")
    .min(1, "Age must be at least 1")
    .max(150, "Age must not exceed 150")
    .transform((value, originalValue) => (originalValue === "" ? null : value)),

  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Please select a valid gender"),

  bloodGroup: yup
    .string()

    .required(),

  address: yup.string().required(),

  country: yup.string().required(),

  cityName: yup.string().max(50, "City must not exceed 50 characters"),

  postalCode: yup
    .string()
    .matches(/^[A-Za-z0-9\s-]{3,10}$/, "Please enter a valid postal code")
    .required(),

  healthIssue: yup
    .string()
    .max(500, "Health issue description must not exceed 500 characters"),

  patientType: yup
    .string()
    .oneOf(
      ["new", "existing", "referral"],
      "Please select a valid patient type",
    ),

  weight: yup
    .number()
    .nullable()
    .positive("Weight must be a positive number")
    .min(0.5, "Weight must be at least 0.5 kg")
    .max(500, "Weight must not exceed 500 kg")
    .transform((value, originalValue) => (originalValue === "" ? null : value)),

  pulse: yup
    .number()
    .nullable()
    .positive("Pulse must be a positive number")
    .integer("Pulse must be a whole number")
    .min(30, "Pulse must be at least 30 bpm")
    .max(250, "Pulse must not exceed 250 bpm")
    .transform((value, originalValue) => (originalValue === "" ? null : value)),

  bloodPressure: yup
    .string()
    .matches(
      /^(\d{2,3})\/(\d{2,3})$/,
      "Blood pressure must be in format XXX/XX (e.g., 120/80)",
    ),

  spO2: yup
    .number()
    .nullable()
    .positive("SpO2 must be a positive number")
    .min(70, "SpO2 must be at least 70%")
    .max(100, "SpO2 cannot exceed 100%")
    .transform((value, originalValue) => (originalValue === "" ? null : value)),

  patientReference: yup
    .string()
    .max(500, "Reference notes must not exceed 500 characters"),

  macId: yup.string(),
  macIp: yup.string(),
  clinicFid: yup.mixed().nullable(),
  patientProfile: yup.string(),
});

export default function AddPatientModal({ open, handleClose }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientSchema),
    defaultValues: {
      clinicFid: null,
      firstName: "",
      lName: "",
      email: "",
      macId: "",
      macIp: "",
      contactNumber: "",
      dateOfBirth: null,
      bloodGroup: "",
      gender: "",
      address: "",
      country: "",
      cityName: "",
      postalCode: "",
      patientProfile: "",
      age: "",
      healthIssue: "",
      patientType: "",
      patientReference: "",
      weight: "",
      palse: "",
      bloodPressure: "",
      spO2: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          background:
            "linear-gradient(135deg, #16a34a 0%, #10b981 50%, #84cc16 100%)",
          color: "white",
          py: 1.5,
          px: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="flex space-x-2 items-center w-full">
          <Box
            sx={{
              width: 40,
              height: 40,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonAddAltIcon sx={{ fontSize: 24 }} />
          </Box>
          <div>
            <p className="font-semibold text-xl whitespace-nowrap">
              Patient Registration
            </p>
          </div>
        </div>
        <CancelButtonModal onClick={handleClose} />
      </DialogTitle>

      <DialogContent
        sx={{
          px: 3,
          py: 2,
          "&::-webkit-scrollbar": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background:
              "linear-gradient(135deg, #16a34a 0%, #10b981 50%, #84cc16 100%)",
            borderRadius: "10px",
            border: "2px solid #f1f1f1",
            "&:hover": {
              background:
                "linear-gradient(135deg, #10b981 0%, #84cc16 50%, #16a34a 100%)",
            },
          },
          scrollbarWidth: "thin",
          scrollbarColor: "#16a34a #f1f1f1",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} id="patient-form">
          <div className="my-3">
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}
            >
              Personal Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <InputField
                  name="firstName"
                  control={control}
                  label="First Name"
                  error={errors.firstName}
                />
              </div>
              <div>
                <InputField
                  name="lName"
                  control={control}
                  label="Last Name"
                  error={errors.lName}
                />
              </div>
              <div>
                <InputField
                  name="email"
                  control={control}
                  label="Email"
                  type="email"
                  error={errors.email}
                />
              </div>
              <div>
                <InputField
                  name="contactNumber"
                  control={control}
                  label="Contact Number"
                  error={errors.contactNumber}
                />
              </div>
              <div>
                <DatePickerField
                  name="dateOfBirth"
                  control={control}
                  label="Date of Birth"
                  error={errors.dateOfBirth}
                />
              </div>
              <div>
                <InputField
                  name="age"
                  control={control}
                  label="Age"
                  type="number"
                  size="small"
                  error={errors.age}
                />
              </div>
              <div className="sm:col-span-2">
                <RadioField
                  name="gender"
                  control={control}
                  label="Gender"
                  dataArray={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </div>
              <div>
                <DropdownField
                  name="bloodGroup"
                  control={control}
                  placeholder="Blood Group"
                  dataArray={[
                    { value: "A+", label: "A+" },
                    { value: "A-", label: "A-" },
                    { value: "B+", label: "B+" },
                    { value: "B-", label: "B-" },
                    { value: "AB+", label: "AB+" },
                    { value: "AB-", label: "AB-" },
                    { value: "O+", label: "O+" },
                    { value: "O-", label: "O-" },
                  ]}
                  error={errors.bloodGroup}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}
            >
              Address Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="sm:col-span-2 md:col-span-3">
                <InputField
                  name="address"
                  control={control}
                  label="Address"
                  error={errors.address}
                />
              </div>
              <div>
                <InputField
                  name="country"
                  control={control}
                  label="Country"
                  error={errors.country}
                />
              </div>
              <div>
                <InputField
                  name="cityName"
                  control={control}
                  label="City"
                  error={errors.cityName}
                />
              </div>
              <div>
                <InputField
                  name="postalCode"
                  control={control}
                  label="Postal Code"
                  error={errors.postalCode}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}
            >
              Medical Information
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <InputField
                  name="healthIssue"
                  control={control}
                  label="Health Issue"
                  error={errors.healthIssue}
                />
              </div>
              <div className="sm:col-span-2">
                <DropdownField
                  name="patientType"
                  control={control}
                  placeholder="Patient Type"
                  options={[
                    { value: "new", label: "New Patient" },
                    { value: "existing", label: "Existing Patient" },
                    { value: "referral", label: "Referral" },
                  ]}
                  error={errors.patientType}
                />
              </div>
              <div>
                <InputField
                  name="weight"
                  control={control}
                  label="Weight (kg)"
                  error={errors.weight}
                />
              </div>
              <div>
                <InputField
                  name="pulse"
                  control={control}
                  label="Pulse (bpm)"
                  error={errors.pulse}
                />
              </div>
              <div>
                <InputField
                  name="bloodPressure"
                  control={control}
                  label="Blood Pressure"
                  error={errors.bloodPressure}
                />
              </div>
              <div>
                <InputField
                  name="spO2"
                  control={control}
                  label="SpO2 (%)"
                  error={errors.spO2}
                />
              </div>
              <div className="sm:col-span-2 md:col-span-4">
                <InputField
                  name="patientReference"
                  control={control}
                  label="Patient Reference / Notes"
                  error={errors.patientReference}
                />
              </div>
            </div>
          </div>
          <DialogActions
            sx={{
              py: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <CommonButton
              variant="outlined"
              onClick={handleClose}
              label={"Cancel"}
              className={"border border-red-600 text-red-600"}
            />
            <CommonButton
              type="submit"
              label={"Register Patient"}
              className={"bg-green-600 text-white"}
            />
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
