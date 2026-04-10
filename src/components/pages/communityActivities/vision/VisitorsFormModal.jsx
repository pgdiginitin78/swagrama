import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  ClipboardList,
  MessageSquare,
  User as UserIcon
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../../../context/AuthContext";
import { getUserDetails } from "../../../../services/login/LoginServices";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import CheckBoxField from "../../../common/formFields/CheckBoxField";
import DatePickerField from "../../../common/formFields/DatePickerField";
import InputArea from "../../../common/formFields/InputArea";
import InputField from "../../../common/formFields/InputField";
import { errorAlert } from "../../../common/toast/CustomToast";

const schema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Min 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  mobileNumber: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Must be 10 digits"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  bookingDate: yup
    .date()
    .nullable()
    .required("Preferred date is required")
    .typeError("Invalid date"),
  totalVisitors: yup
    .number()
    .required("Required")
    .min(1, "Minimum 1 visitor")
    .typeError("Must be a number"),
  specialRequests: yup.string().max(500, "Max 500 characters"),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms")
    .required(),
});

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const VisitorsFormModal = ({ open, handleClose, serviceDetails }) => {
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      mobileNumber: "",
      city: "",
      state: "",
      bookingDate: null,
      totalVisitors: 1,
      specialRequests: "",
      termsAccepted: false,
    },
    mode: "onChange",
  });

  const termsAcceptedValue = watch("termsAccepted");

  useEffect(() => {
    if (open) {
      reset();
      if (user?.userId) {
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
              setValue("city", userData.city || "");
              setValue("state", userData.state || "");
            }
          })
          .catch(() => {
            errorAlert("Failed to fetch user details.");
          });
      }
    }
  }, [open, user, reset, setValue]);

  const onSubmit = (data) => {
    console.log("Visitor Enquiry Data:", {
      service: serviceDetails?.serviceName,
      ...data,
    });
    // API Call would go here
    handleClose();
    reset();
  };

  if (!serviceDetails) return null;

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
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
            className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[850px] max-h-[90vh] flex flex-col overflow-hidden rounded-2xl shadow-2xl bg-white border border-green-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between sticky top-0 z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2.5 rounded-xl hidden sm:block backdrop-blur-md">
                  <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white leading-tight">
                    Visitor Enquiry
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm font-medium">
                    {serviceDetails.serviceName} ({serviceDetails.nameHindi})
                  </p>
                </div>
              </div>
              <CancelButtonModal onClick={handleClose} />
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-6 custom-scrollbar bg-slate-50/50">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Service Quick Info */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-3 sm:gap-6 p-3 bg-green-50 rounded-xl border border-green-100 flex-shrink-0"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-700" />
                    <span className="text-xs font-semibold text-green-800">
                      Hours: {serviceDetails.checkIn} - {serviceDetails.checkOut}
                    </span>
                  </div>
                  {serviceDetails.price && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
                      <span className="text-xs font-semibold text-green-800">
                        {serviceDetails.price}
                      </span>
                    </div>
                  )}
                  {serviceDetails.mealNote && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                      <span className="text-xs font-semibold text-amber-800">
                        {serviceDetails.mealNote}
                      </span>
                    </div>
                  )}
                </motion.div>

                {/* Personal & Contact Details */}
                <motion.section
                  variants={itemVariants}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200"
                >
                  <h3 className="text-sm font-bold text-green-800 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-tight">
                    <UserIcon className="w-4 h-4" /> Personal & Contact Info
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InputField
                      control={control}
                      name="fullName"
                      label="Full Name *"
                      error={errors.fullName}
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
                      name="mobileNumber"
                      label="Mobile Number *"
                      type="tel"
                      error={errors.mobileNumber}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                  </div>
                </motion.section>

                {/* Visit Details */}
                <motion.section
                  variants={itemVariants}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200"
                >
                  <h3 className="text-sm font-bold text-green-800 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-tight">
                    <Calendar className="w-4 h-4" /> Visit Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DatePickerField
                      control={control}
                      name="bookingDate"
                      label="Preferred Date *"
                      minDate={new Date()}
                      error={errors.bookingDate}
                    />
                    <InputField
                      control={control}
                      name="totalVisitors"
                      label="Total Guests *"
                      type="number"
                      error={errors.totalVisitors}
                    />
        
                  </div>
                </motion.section>

                {/* Requirements */}
                <motion.section
                  variants={itemVariants}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200"
                >
                  <InputArea
                    control={control}
                    name="specialRequests"
                    label="Any special requests or medical history we should know about?"
                    error={errors.specialRequests}
                    minRows={2}
                  />
                </motion.section>

                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <CheckBoxField
                      control={control}
                      name="termsAccepted"
                      label="I acknowledge this is an inquiry for the selected service and does not guarantee a slot until confirmed."
                      error={errors.termsAccepted}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                  <CommonButton
                    type="button"
                    label="Reset"
                    onClick={() => reset()}
                    className=" border border-red-600 text-red-600 hover:bg-red-50 "
                  />
                  <CommonButton
                    type="submit"
                    label="Submit Enquiry Request"
                    disabled={!termsAcceptedValue}
                    className={` text-white transition-all ${
                      termsAcceptedValue
                        ? "bg-gradient-to-r from-green-700 to-green-600  hover:shadow-xl hover:-translate-y-0.5"
                        : "bg-slate-300 pointer-events-none"
                    }`}
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

export default VisitorsFormModal;
