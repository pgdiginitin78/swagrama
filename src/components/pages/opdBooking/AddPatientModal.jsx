import { yupResolver } from "@hookform/resolvers/yup";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CloseIcon from "@mui/icons-material/Close";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  IconButton,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";
import DatePickerField from "../../common/formFields/DatePickerField";
import InputField from "../../common/formFields/InputField";
import { AddPatient } from "../../../services/bookAppointment/BookAppointmentServices";
import { errorAlert, successAlert } from "../../common/toast/CustomToast";
import { useLoader } from "../../common/commonLoader/LoaderContext";
import ConfirmationModal from "../../common/ConfirmationModal";
import { getUserDetails } from "../../../services/login/LoginServices";
import InputArea from "../../common/formFields/InputArea";
import CancelButtonModal from "../../common/button/CancelButtonModal";
import CommonButton from "../../common/button/CommonButton";
import DropdownField from "../../common/formFields/DropdownField";

const today = new Date();
today.setHours(0, 0, 0, 0);

const dropdownObjectSchema = yup
  .object()
  .shape({
    id: yup.mixed().required(),
    label: yup.string().required(),
  })
  .nullable()
  .required("This field is required");

const patientSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Letters only"),

  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Minimum 2 characters")
    .max(50, "Maximum 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Letters only"),
  bloodGroup: dropdownObjectSchema.typeError("Blood group is required"),
  mobileNO: yup
    .string()
    .required("Contact number is required")
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      "Enter a valid contact number",
    )
    .min(10, "Minimum 10 digits")
    .max(15, "Maximum 15 digits"),

  dob: yup
    .date()
    .typeError("Enter a valid date (DD/MM/YYYY)")
    .required("Date of birth is required")
    .test("not-future", "Date of birth cannot be in the future", (value) => {
      if (!value || isNaN(new Date(value))) return false;
      const dob = new Date(value);
      dob.setHours(0, 0, 0, 0);
      return dob <= today;
    }),

  age: yup
    .string()
    .required("Age is required")
    .test("is-number", "Age must be a number", (value) => {
      if (!value) return false;
      return !isNaN(Number(value)) && value.trim() !== "";
    })
    .test("is-integer", "Age must be a whole number", (value) => {
      if (!value) return false;
      return Number.isInteger(Number(value));
    })
    .test("min-age", "Minimum age is 0", (value) => {
      if (!value) return false;
      return Number(value) >= 0;
    })
    .test("max-age", "Maximum age is 120", (value) => {
      if (!value) return false;
      return Number(value) <= 120;
    }),

  relation: yup.string().max(50, "Maximum 50 characters"),

  address: yup
    .string()
    .required("Address is required")
    .max(200, "Maximum 200 characters"),

  pinCode: yup
    .string()
    .required("Pin code is required")
    .matches(/^[A-Za-z0-9\s-]{3,10}$/, "Enter a valid pin code"),
});

const formatDateToYYYYMMDD = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const calculateAgeFromDOB = (dob) => {
  if (!dob || isNaN(new Date(dob))) return "";
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age >= 0 && age <= 120 ? String(age) : "";
};

const calculateDOBFromAge = (age) => {
  const ageNum = Number(age);
  if (
    !age ||
    isNaN(ageNum) ||
    !Number.isInteger(ageNum) ||
    ageNum < 0 ||
    ageNum > 120
  )
    return null;
  const birthYear = new Date().getFullYear() - ageNum;
  return new Date(birthYear, 0, 1);
};

function SectionHeader({ icon: Icon, label, children }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: 1.5,
              background: "linear-gradient(135deg, #16a34a, #22c55e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon sx={{ fontSize: 16, color: "#fff" }} />
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              color: "#166534",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontSize: "0.7rem",
            }}
          >
            {label}
          </Typography>
        </Box>
        {children}
      </Box>
      <Divider sx={{ borderColor: "#bbf7d0" }} />
    </Box>
  );
}

export default function AddPatientModal({ open, handleClose }) {
  const [ipAddress, setIpAddress] = useState(null);
  const [finalSaveObj, setFinalSaveObj] = useState(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [isUpdatingFromDOB, setIsUpdatingFromDOB] = useState(false);
  const [isUpdatingFromAge, setIsUpdatingFromAge] = useState(false);
  const [sameAddress, setSameAddress] = useState(true);
  const [userAddressData, setUserAddressData] = useState({
    address: "",
    pinCode: "",
  });

  const userData = JSON.parse(localStorage.getItem("user") || "null");

  const { setIsLoading } = useLoader();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(patientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      mobileNO: "",
      dob: null,
      age: "",
      bloodGroup: null,
      relation: "",
      address: "",
      pinCode: "",
    },
  });

  const watchedDOB = useWatch({ control, name: "dob" });
  const watchedAge = useWatch({ control, name: "age" });

  const onSubmit = (data) => {
    const saveObj = {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNO: data.mobileNO,
      dob: formatDateToYYYYMMDD(data.dob),
      age: Number(data.age),
      relation: data.relation ?? "",
      address: data.address,
      pinCode: data.pinCode,
      macIp: ipAddress ?? "",
      macId: "",
      bloodGroup:data.bloodGroup.value
    };
    setFinalSaveObj(saveObj);
    setOpenConfirmationModal(true);
  };

  const handleUserRegister = async () => {
    try {
      setOpenConfirmationModal(false);
      setIsLoading(true);
      const response = await AddPatient(finalSaveObj);
      const apiData = response?.data;

      if (response?.status === 200 && apiData?.userId) {
        successAlert(apiData.message);
        handleClose();
        reset();
      } else {
        errorAlert("Registration failed!");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message;
      errorAlert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    handleClose();
  };

  const handleAgeInput = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    if (raw === "") {
      e.target.value = "";
    } else if (Number(raw) > 120) {
      e.target.value = "120";
    } else {
      e.target.value = raw;
    }
  };

  const handleSameAddressToggle = (e) => {
    const checked = e.target.checked;
    setSameAddress(checked);
    if (checked) {
      setValue("address", userAddressData.address, { shouldValidate: true });
      setValue("pinCode", userAddressData.pinCode, { shouldValidate: true });
    } else {
      setValue("address", "", { shouldValidate: false });
      setValue("pinCode", "", { shouldValidate: false });
    }
  };

  useEffect(() => {
    if (isUpdatingFromAge) return;
    const dob = watchedDOB;
    if (dob && !isNaN(new Date(dob))) {
      const calculatedAge = calculateAgeFromDOB(dob);
      if (calculatedAge !== "") {
        setIsUpdatingFromDOB(true);
        setValue("age", calculatedAge, { shouldValidate: true });
        setTimeout(() => setIsUpdatingFromDOB(false), 100);
      }
    }
  }, [watchedDOB, setValue, isUpdatingFromAge]);

  useEffect(() => {
    if (isUpdatingFromDOB) return;

    const age = watchedAge;
    const ageNum = Number(age);

    if (
      age &&
      !isNaN(ageNum) &&
      Number.isInteger(ageNum) &&
      ageNum >= 0 &&
      ageNum <= 120
    ) {
      const calculatedDOB = calculateDOBFromAge(age);
      if (calculatedDOB) {
        setIsUpdatingFromAge(true);
        setValue("dob", calculatedDOB, { shouldValidate: true });
        setTimeout(() => setIsUpdatingFromAge(false), 100);
      }
    }
  }, [watchedAge, setValue, isUpdatingFromDOB]);

  useEffect(() => {
    if (userData !== null) {
      setValue("mobileNO", userData?.mobileNo);
    } else {
      fetch("https://api.ipify.org?format=json")
        .then((res) => res.json())
        .then((data) => setIpAddress(data.ip))
        .catch((err) => console.error("IP fetch error:", err));
    }
  }, [userData, setValue]);

  useEffect(() => {
    if (userData) {
      getUserDetails(userData?.userId)
        .then((res) => {
          const data = res?.data?.data;
          const address = data?.address ?? "";
          const pinCode = data?.pinCode ?? "";
          setUserAddressData({ address, pinCode });
          setValue("address", address);
          setValue("pinCode", pinCode);
        })
        .catch((err) => err);
    }
  }, [setValue]);

  return (
    <>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(22, 163, 74, 0.18)",
            display: "flex",
            flexDirection: "column",
            maxHeight: { xs: "90vh", sm: "90vh" },
            m: { xs: 1, sm: 2 },
            width: { xs: "calc(100% - 16px)", sm: "calc(100% - 32px)" },
          },
        }}
      >
        <DialogTitle
          sx={{
            background:
              "linear-gradient(135deg, #166534 0%, #16a34a 60%, #22c55e 100%)",
            color: "white",
            py: 2,
            px: 3,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  bgcolor: "rgba(255,255,255,0.18)",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.25)",
                  flexShrink: 0,
                }}
              >
                <PersonAddAltIcon sx={{ fontSize: 24 }} />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    lineHeight: 1.2,
                  }}
                >
                  Patient Registration
                </Typography>
                <Typography
                  sx={{ fontSize: "0.75rem", opacity: 0.8, fontWeight: 400 }}
                >
                  Fill in the patient details below
                </Typography>
              </Box>
            </Box>
            <CancelButtonModal onClick={handleCancel} />
          </Box>
        </DialogTitle>

        <DialogContent
          sx={{
            px: { xs: 2, sm: 3 },
            pt: 3,
            pb: 3,
            bgcolor: "#f0fdf4",
            overflowY: "auto",
            flexGrow: 1,
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-track": { bgcolor: "#dcfce7" },
            "&::-webkit-scrollbar-thumb": {
              background: "linear-gradient(#16a34a, #22c55e)",
              borderRadius: 10,
            },
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="patient-form"
            noValidate
            className="pt-1"
          >
            <Box sx={{ mb: 3 }}>
              <SectionHeader
                icon={BadgeOutlinedIcon}
                label="Personal Information"
              />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <InputField
                  name="firstName"
                  control={control}
                  label="First Name"
                  error={errors.firstName}
                />
                <InputField
                  name="lastName"
                  control={control}
                  label="Last Name"
                  error={errors.lastName}
                />
                <InputField
                  name="mobileNO"
                  control={control}
                  label="Registerd Mobile No."
                  error={errors.mobileNO}
                  disabled={true}
                />
                <DatePickerField
                  name="dob"
                  control={control}
                  label="Date of Birth"
                  error={errors.dob}
                  maxDate={today}
                  dob={true}
                />
                <InputField
                  name="age"
                  control={control}
                  label="Age"
                  error={errors.age}
                  inputProps={{ maxLength: 3 }}
                  onInput={handleAgeInput}
                />
                <div>
                  <DropdownField
                    control={control}
                    name="bloodGroup"
                    placeholder="Select Blood Group *"
                    dataArray={[
                      { id: 1, value: "A+", label: "A+" },
                      { id: 2, value: "A-", label: "A-" },
                      { id: 3, value: "B+", label: "B+" },
                      { id: 4, value: "B-", label: "B-" },
                      { id: 5, value: "AB+", label: "AB+" },
                      { id: 6, value: "AB-", label: "AB-" },
                      { id: 7, value: "O+", label: "O+" },
                      { id: 8, value: "O-", label: "O-" },
                    ]}
                    error={errors.bloodGroup}
                  />
                  {errors.bloodGroup && (
                    <p className="text-red-500 text-[11px] mt-0.5">
                      {errors.bloodGroup.message}
                    </p>
                  )}
                </div>
                <InputField
                  name="relation"
                  control={control}
                  label="Relation"
                  error={errors.relation}
                />
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <SectionHeader
                icon={HomeOutlinedIcon}
                label="Address Information"
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={sameAddress}
                      onChange={handleSameAddressToggle}
                      size="small"
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#16a34a",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#16a34a",
                          },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: sameAddress ? "#16a34a" : "#6b7280",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Same As
                    </Typography>
                  }
                  labelPlacement="start"
                  sx={{ m: 0, gap: 0.5 }}
                />
              </SectionHeader>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <InputField
                  name="pinCode"
                  control={control}
                  label="Pin Code"
                  error={errors.pinCode}
                  disabled={sameAddress}
                />
                <Box sx={{ gridColumn: { xs: "1", sm: "1 / -1" } }}>
                  <InputArea
                    name="address"
                    control={control}
                    label="Address"
                    error={errors.address}
                    disabled={sameAddress}
                    rows={3}
                  />
                </Box>
              </Box>
            </Box>
          </form>
        </DialogContent>

        <Box
          sx={{
            flexShrink: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1.5,
            px: { xs: 2, sm: 3 },
            py: 2,
            bgcolor: "#f0fdf4",
            borderTop: "1px solid #bbf7d0",
          }}
        >
          <CommonButton
            label="Reset"
            onClick={() => {
              reset();
              setValue("mobileNO", userData?.mobileNo);
            }}
            className={"border border-red-600 text-red-600"}
          />

          <CommonButton
            label="Register Patient"
            type="submit"
            className={"bg-green-600 text-white"}
            disabled={isSubmitting}
          />
        </Box>
      </Dialog>
      <ConfirmationModal
        confirmationOpen={openConfirmationModal}
        confirmationHandleClose={() => setOpenConfirmationModal(false)}
        confirmationSubmitFunc={handleUserRegister}
        confirmationLabel="Confirm Registration"
        confirmationMsg="Are you sure you want to register this patient?"
        confirmationButtonMsg="Confirm"
      />
    </>
  );
}
