import { yupResolver } from "@hookform/resolvers/yup";
import { Call, Email, WhatsApp } from "@mui/icons-material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { Box, Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { User as UserIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../../../context/AuthContext";
import { getUserDetails } from "../../../../services/login/LoginServices";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import CheckBoxField from "../../../common/formFields/CheckBoxField";
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
  contactMode: yup.string().required("Preferred contact mode is required"),
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

const MembershipRegistrationModal = ({
  open,
  handleClose,
  membershipDetails,
}) => {
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
      contactMode: "Call",
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
      membershipDetails,
      ...data,
    });
    handleClose();
    reset();
  };

  console.log("membershipDetails", membershipDetails);

  if (!membershipDetails) return null;

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
            className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[850px] max-h-[90vh] flex flex-col overflow-hidden rounded shadow-2xl bg-white border border-green-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between sticky top-0 z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2.5 rounded-xl hidden sm:block backdrop-blur-md">
                  <CardMembershipIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-sm sm:text-lg font-semibold">
                    {membershipDetails?.serviceName} (
                    {membershipDetails?.membershipNameHi ||
                      membershipDetails?.nameHindi}
                    )
                  </p>

                  <p className="text-white/80 text-xs sm:text-sm font-medium">
                    {membershipDetails?.benifits !== undefined && (
                      <span className="border rounded-full py-0.5 border-green-400 bg-green-100 text-green-700 px-3 text-[10px">
                        {(membershipDetails?.benifits?.length || 0) === 1
                          ? "Individual"
                          : "Per Person"}
                      </span>
                    )}
                    &nbsp;
                    <span>₹ {membershipDetails?.price}</span>{" "}
                    {membershipDetails?.duration !== undefined ? "/ " : ""}
                    {membershipDetails?.duration}
                  </p>
                </div>
              </div>
              <CancelButtonModal onClick={handleClose} />
            </div>
            <div className="overflow-y-auto flex-1 p-4 sm:p-6 custom-scrollbar bg-slate-50/50">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <motion.section
                  variants={itemVariants}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200"
                >
                  <h3 className="text-sm font-bold text-green-800 mb-3 flex items-center gap-2 border-b border-slate-100 pb-2 uppercase tracking-tight">
                    <UserIcon className="w-4 h-4" /> Personal & Contact Info
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="col-span-3">
                      <InputField
                        control={control}
                        name="fullName"
                        label="Full Name *"
                        error={errors.fullName}
                      />
                    </div>
                    <InputField
                      control={control}
                      name="mobileNumber"
                      label="Mobile Number *"
                      type="tel"
                      error={errors.mobileNumber}
                    />
                    <div className="col-span-2">
                      <InputField
                        control={control}
                        name="email"
                        label="Email Address *"
                        type="email"
                        error={errors.email}
                      />
                    </div>
                    <div className="col-span-2">
                      <InputField
                        control={control}
                        name="city"
                        label="City *"
                        error={errors.city}
                      />
                    </div>
                  </div>
                </motion.section>
                <motion.section
                  variants={itemVariants}
                  className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
                >
                  <h3 className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">
                    Preferred Contact Mode
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {[
                      {
                        id: "Call",
                        label: "Call",
                        icon: <Call className="w-5 h-5" />,
                      },
                      {
                        id: "WhatsApp",
                        label: "WhatsApp",
                        icon: <WhatsApp className="w-5 h-5" />,
                      },
                      {
                        id: "Email",
                        label: "Email",
                        icon: <Email className="w-5 h-5" />,
                      },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setValue("contactMode", mode.id)}
                        className={`flex items-center gap-3 px-8 py-3 rounded-full transition-all duration-200 font-medium ${
                          watch("contactMode") === mode.id
                            ? "bg-white border-2 border-green-700 text-green-700 shadow-md"
                            : "bg-slate-100 border-2 border-transparent text-green-600 hover:bg-slate-200"
                        }`}
                      >
                        <span
                          className={
                            watch("contactMode") === mode.id
                              ? "text-emerald-700"
                              : "text-green-500"
                          }
                        >
                          {mode.icon}
                        </span>
                        <span>{mode.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.contactMode && (
                    <p className="text-xs text-red-500 mt-2">
                      {errors.contactMode.message}
                    </p>
                  )}
                </motion.section>
                <motion.section
                  variants={itemVariants}
                  className="bg-white p-4 rounded-xl shadow-sm border border-slate-200"
                >
                  <InputArea
                    control={control}
                    name="specialRequests"
                    label="Anything else you'd like us to know?"
                    error={errors.specialRequests}
                    minRows={2}
                  />
                </motion.section>

                <div className="space-y-4">
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <CheckBoxField
                      control={control}
                      name="termsAccepted"
                      label="I agree  to be contacted by rhe Swagarama Community team regarding this membership enquiry and wellness updates."
                      error={errors.termsAccepted}
                    />
                  </div>
                </div>
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

export default MembershipRegistrationModal;
