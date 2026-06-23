import { yupResolver } from "@hookform/resolvers/yup";
import { Call, Email, WhatsApp } from "@mui/icons-material";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { Box, Modal, CircularProgress, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { User as UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAuth } from "../../../../context/AuthContext";
import { getUserDetails } from "../../../../services/login/LoginServices";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import CommonButton from "../../../common/button/CommonButton";
import CheckBoxField from "../../../common/formFields/CheckBoxField";
import InputArea from "../../../common/formFields/InputArea";
import InputField from "../../../common/formFields/InputField";
import { errorAlert, successAlert } from "../../../common/toast/CustomToast";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { SaveEnquiry } from "../../../../services/membershipServices/MembershipServices";
import { ModalStyle } from "../../../common/modalStyle/ModalStyle";

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

const CONTACT_MODES = [
  { id: "Call", label: "Call", icon: <Call fontSize="small" /> },
  { id: "WhatsApp", label: "WhatsApp", icon: <WhatsApp fontSize="small" /> },
  { id: "Email", label: "Email", icon: <Email fontSize="small" /> },
];

const MembershipRegistrationModal = ({
  open,
  handleClose,
  membershipDetails,
  origin,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [formData, setFormData] = useState(null);

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
  const contactModeValue = watch("contactMode");

  useEffect(() => {
    if (open) {
      reset();
      if (user?.userId) {
        getUserDetails(user.userId, null, 0)
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
          .catch(() => errorAlert("Failed to fetch user details."));
      }
    }
  }, [open, user, reset, setValue]);

  const onSubmit = (data) => {
    if (!user?.userId) {
      errorAlert("Please login first to submit your enquiry.");
      return;
    }
    setFormData({
      userId: user.userId,
      createdBy: user.userId,
      enquiryName:
        membershipDetails?.serviceName ||
        membershipDetails?.membershipName ||
        "Wedding Ceremony",
      duration:
        membershipDetails?.duration || membershipDetails?.durationRange || "",
      fullName: data.fullName,
      email: data.email,
      contactMode: data.contactMode,
      mobile: data.mobileNumber,
      city: data.city,
      state: data.state,
      message: data.specialRequests,
      EnquiryOrigin: origin,
    });
    setConfirmationOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (!user?.userId) {
      errorAlert("Authentication lost. Please login again.");
      setConfirmationOpen(false);
      return;
    }
    setLoading(true);
    try {
      const res = await SaveEnquiry(formData);
      successAlert(res?.data?.message || "Enquiry submitted successfully!");
      handleClose();
      reset();
      setConfirmationOpen(false);
    } catch (error) {
      errorAlert(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!membershipDetails) return null;

  const hindiName =
    membershipDetails?.membershipNameHi ||
    membershipDetails?.nameHindi ||
    membershipDetails?.programmeNameHindi ||
    membershipDetails?.season;

  const benefitCount =
    membershipDetails?.benifits?.length || membershipDetails?.info?.length || 0;

  const priceDisplay =
    membershipDetails?.duration || membershipDetails?.durationRange
      ? `₹ ${membershipDetails?.price?.toLocaleString("en-IN")}`
      : membershipDetails?.price?.toLocaleString("en-IN");

  const durationDisplay =
    membershipDetails?.duration || membershipDetails?.durationRange;

  return (
    <>
      <Modal open={open} aria-labelledby="membership-modal-title">
        <Box
          sx={ModalStyle}
          className="w-[98%] sm:w-[95%] md:w-[90%] lg:w-[80%] xl:w-[65%] max-h-[90dvh] overflow-hidden rounded-xl  p-0 no-scrollbar"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex flex-col h-full overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-700 to-emerald-500 px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between sticky top-0 z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
                  <CardMembershipIcon
                    className="text-white"
                    style={{ fontSize: 24 }}
                  />
                </div>
                <div>
                  <p className="text-white font-semibold text-base sm:text-lg leading-tight">
                    {membershipDetails?.serviceName ||
                      membershipDetails?.membershipName}
                    {hindiName && (
                      <span className="font-normal"> ({hindiName})</span>
                    )}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {(membershipDetails?.benifits ||
                      membershipDetails?.info) !== undefined && (
                      <span className="border border-green-400 rounded-full px-3 py-0.5 bg-green-50 text-green-700 text-[10px] font-semibold">
                        {benefitCount === 1 ? "Individual" : "Per Person"}
                      </span>
                    )}
                    <span className="text-white/85 text-xs font-medium">
                      {priceDisplay}
                      {durationDisplay && ` / ${durationDisplay}`}
                    </span>
                  </div>
                </div>
              </div>
              <CancelButtonModal onClick={handleClose} />
            </div>

            <div className="overflow-y-auto flex-1 p-4 sm:p-6 bg-slate-50 no-scrollbar">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 sm:gap-5">
                  <motion.section variants={itemVariants}>
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
                      <p className="text-green-700 font-bold flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 text-sm uppercase tracking-wide">
                        <UserIcon size={16} />
                        Personal &amp; Contact Info
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4">
                        <div className="sm:col-span-2 lg:col-span-9">
                          <InputField
                            control={control}
                            name="fullName"
                            label="Full Name *"
                            error={errors.fullName}
                          />
                        </div>
                        <div className="lg:col-span-3">
                          <InputField
                            control={control}
                            name="mobileNumber"
                            label="Mobile Number *"
                            type="tel"
                            error={errors.mobileNumber}
                          />
                        </div>
                        <div className="lg:col-span-6">
                          <InputField
                            control={control}
                            name="email"
                            label="Email Address *"
                            type="email"
                            error={errors.email}
                            dontCapitalize="none"
                          />
                        </div>
                        <div className="lg:col-span-6">
                          <InputField
                            control={control}
                            name="city"
                            label="City *"
                            error={errors.city}
                          />
                        </div>
                        <div className="sm:col-span-2 lg:col-span-12">
                          <InputField
                            control={control}
                            name="state"
                            label="State *"
                            error={errors.state}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.section>

                  <motion.section variants={itemVariants}>
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-3">
                        Preferred Contact Mode
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        {CONTACT_MODES.map((mode) => {
                          const isSelected = contactModeValue === mode.id;
                          return (
                            <button
                              key={mode.id}
                              type="button"
                              onClick={() => setValue("contactMode", mode.id)}
                              className={`
                                flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full
                                text-sm font-semibold transition-all duration-200
                                ${
                                  isSelected
                                    ? "bg-white border-2 border-green-700 text-green-700 shadow-md shadow-green-100"
                                    : "bg-slate-100 border-2 border-transparent text-green-700 hover:bg-slate-200"
                                }
                              `}
                            >
                              <span className="flex items-center">
                                {mode.icon}
                              </span>
                              {mode.label}
                            </button>
                          );
                        })}
                      </div>
                      {errors.contactMode && (
                        <p className="text-red-500 text-xs mt-2">
                          {errors.contactMode.message}
                        </p>
                      )}
                    </div>
                  </motion.section>

                  <motion.section variants={itemVariants}>
                    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5">
                      <InputArea
                        control={control}
                        name="specialRequests"
                        label="Anything else you'd like us to know?"
                        error={errors.specialRequests}
                        minRows={3}
                      />
                    </div>
                  </motion.section>

                  <div className="bg-green-50 rounded-2xl border border-green-100 p-3 sm:p-4">
                    <CheckBoxField
                      control={control}
                      name="termsAccepted"
                      label="I agree to be contacted by the Swagarama Community team regarding this membership enquiry and wellness updates."
                      error={errors.termsAccepted}
                    />
                  </div>

                  <div className="flex  gap-2 sm:gap-3 justify-end pt-1">
                    <CommonButton
                      type="button"
                      label="Reset"
                      onClick={() => reset()}
                      className="border border-red-600 text-red-600 hover:bg-red-50 w-full sm:w-auto"
                    />
                    <CommonButton
                      type="submit"
                      label={loading ? "Submitting..." : "Enquiry Now"}
                      icon={
                        loading && (
                          <CircularProgress size={16} color="inherit" />
                        )
                      }
                      disabled={!termsAcceptedValue || loading}
                      className={`w-full sm:w-auto ${
                        termsAcceptedValue && !loading
                          ? "bg-gradient-to-r from-green-700 to-green-600 text-white hover:shadow-xl hover:-translate-y-0.5"
                          : "bg-slate-300 pointer-events-none"
                      }`}
                    />
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </Box>
      </Modal>

      <ConfirmationModal
        confirmationOpen={confirmationOpen}
        confirmationHandleClose={() => setConfirmationOpen(false)}
        confirmationSubmitFunc={handleConfirmSubmit}
        confirmationLabel="Confirm Enquiry"
        confirmationMsg="Are you sure you want to submit this enquiry? Our team will contact you soon."
        confirmationButtonMsg={loading ? "Submitting..." : "Submit Now"}
        disabled={loading}
      />
    </>
  );
};

export default MembershipRegistrationModal;
