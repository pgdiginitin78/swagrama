import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  CreditCard,
  Heart,
  MapPin,
  User as UserIcon,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../../../context/AuthContext";
import { getUserDetails } from "../../../../services/login/LoginServices";
import { DeleteIcon } from "../../../common/assets/CommonAssets";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import CheckBoxField from "../../../common/formFields/CheckBoxField";
import DatePickerField from "../../../common/formFields/DatePickerField";
import DropdownField from "../../../common/formFields/DropdownField";
import InputArea from "../../../common/formFields/InputArea";
import InputField from "../../../common/formFields/InputField";
import { errorAlert, successAlert } from "../../../common/toast/CustomToast";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  dob: yup.date().nullable().required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  aadharNumber: yup
    .string()
    .required("Aadhar number is required")
    .matches(/^[0-9]{12}$/, "Aadhar must be 12 digits"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),
  emergencyContactName: yup
    .string()
    .required("Emergency contact name is required"),
  emergencyContactRelation: yup.string().required("Relation is required"),
  emergencyContactNumber: yup
    .string()
    .required("Emergency contact number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms")
    .required(),
});

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const MembershipRegistrationModal = ({
  open,
  handleClose,
  membershipDetails,
}) => {
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      dob: null,
      gender: "",
      mobileNumber: "",
      email: "",
      aadharNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      emergencyContactName: "",
      emergencyContactRelation: "",
      emergencyContactNumber: "",
      termsAccepted: false,
    },
    mode: "onChange",
  });

  const termsAcceptedValue = watch("termsAccepted");

  useEffect(() => {
    if (open && user?.userId) {
      getUserDetails(user.userId)
        .then((res) => {
          const userData = res?.data?.data;
          if (userData) {
            setValue(
              "fullName",
              `${userData.firstName || ""} ${userData.lastName || ""}`.trim(),
            );
            setValue("mobileNumber", userData.whatsappNo || "");
            setValue("email", userData.emailId || "");
            if (userData.dob) setValue("dob", new Date(userData.dob));
            const filterGender = genderOptions.find(
              (item) =>
                item.value?.toLowerCase() === userData?.gender?.toLowerCase(),
            );

            if (filterGender) {
              setValue("gender", filterGender);
            }
            setValue("address", userData.address || "");
            setValue("city", userData.city || "");
            setValue("state", userData.state || "");
            setValue("pincode", userData.pinCode || "");
            setValue("occupation", userData.occupation || "");
          }
        })
        .catch(() => {
          errorAlert("Failed to fetch user details.");
        });
    }
  }, [open, user, setValue]);

  const onSubmit = (data) => {
    console.log("Membership Enquiry Data:", {
      membership: membershipDetails?.serviceName,
      ...data,
    });
    alert("Enquiry Submitted Successfully!");
    handleClose();
    reset();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: "none",
        }}
      >
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[900px] max-h-[95vh] flex flex-col overflow-hidden rounded-2xl shadow-2xl bg-white border border-green-100"
          >
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between sticky top-0 z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg hidden sm:block">
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                    Membership Enquiry
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm font-medium truncate max-w-[200px] sm:max-w-none">
                    {membershipDetails?.serviceName}&nbsp;(
                    {membershipDetails?.membershipNameHi})
                  </p>
                </div>
              </div>
              <CancelButtonModal onClick={handleClose} />
            </div>

            <div className="overflow-y-auto flex-1 p-4 sm:p-6 custom-scrollbar bg-slate-50/50">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <section className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-base sm:text-lg font-bold text-green-800 mb-4 flex items-center gap-2 border-b pb-2">
                    <UserIcon className="w-5 h-5" /> Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2">
                      <InputField
                        control={control}
                        name="fullName"
                        label="Full Name *"
                        error={errors.fullName}
                      />
                    </div>
                    <DatePickerField
                      control={control}
                      name="dob"
                      label="Date of Birth *"
                      inputFormat="dd-MM-yyyy"
                      disableFuture={true}
                      error={errors.dob}
                    />
                    <DropdownField
                      control={control}
                      name="gender"
                      label="Gender *"
                      placeholder="Select Gender"
                      dataArray={genderOptions}
                      error={errors.gender}
                    />
                  </div>
                </section>

                <section className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-base sm:text-lg font-bold text-green-800 mb-4 flex items-center gap-2 border-b pb-2">
                    <Users className="w-5 h-5 text-blue-600" /> Contact
                    Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InputField
                      control={control}
                      name="mobileNumber"
                      label="Mobile Number *"
                      type="tel"
                      error={errors.mobileNumber}
                    />
                    <InputField
                      control={control}
                      name="email"
                      label="Email Address *"
                      type="email"
                      error={errors.email}
                    />
                    <InputField
                      control={control}
                      name="aadharNumber"
                      label="Aadhar Number *"
                      error={errors.aadharNumber}
                    />
                  </div>
                </section>

                <section className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-base sm:text-lg font-bold text-green-800 mb-4 flex items-center gap-2 border-b pb-2">
                    <MapPin className="w-5 h-5" /> Address Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-3">
                      <InputArea
                        control={control}
                        name="address"
                        label="Full Address *"
                        error={errors.address}
                        minRows={2}
                      />
                    </div>
                    <InputField
                      control={control}
                      name="city"
                      label="City *"
                      error={errors.city}
                    />
                    <InputField
                      control={control}
                      name="state"
                      label="State *"
                      error={errors.state}
                    />
                    <InputField
                      control={control}
                      name="pincode"
                      label="Pincode *"
                      error={errors.pincode}
                    />
                  </div>
                </section>

                <section className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-slate-200">
                  <h3 className="text-base sm:text-lg font-bold text-green-800 mb-4 flex items-center gap-2 border-b pb-2">
                    <Heart className="w-5 h-5 text-red-500" /> Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <InputField
                      control={control}
                      name="emergencyContactName"
                      label="Contact Person Name *"
                      error={errors.emergencyContactName}
                    />
                    <InputField
                      control={control}
                      name="emergencyContactRelation"
                      label="Relation *"
                      error={errors.emergencyContactRelation}
                    />
                    <InputField
                      control={control}
                      name="emergencyContactNumber"
                      label="Contact Number *"
                      type="tel"
                      error={errors.emergencyContactNumber}
                    />
                  </div>
                </section>

                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                    <CheckBoxField
                      control={control}
                      name="termsAccepted"
                      label="I hereby declare that the information provided is true to the best of my knowledge and I agree to abide by the rules and regulations of Swagrama Community."
                      error={errors.termsAccepted}
                    />
                  </div>
                </div>

                <div className="flex space-x-2 justify-end gap-3 pt-4 pb-2 sm:pb-0 border-t-2 border-slate-200">
                  <CommonButton
                    type="button"
                    label="Reset"
                    onClick={() => reset()}
                    className="border border-red-600 text-red-600 hover:bg-red-50 px-10 "
                  />
                  <CommonButton
                    type="submit"
                    label="Submit Enquiry"
                    disabled={!termsAcceptedValue}
                    className={`text-white px-10 ${termsAcceptedValue ? "bg-gradient-to-r from-green-700 to-green-600 shadow-md" : "bg-slate-300"}`}
                  />
                </div>
              </form>
            </div>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Modal>
  );
};

export default MembershipRegistrationModal;
