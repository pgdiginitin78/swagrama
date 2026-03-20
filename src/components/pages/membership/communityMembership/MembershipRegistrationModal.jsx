import { yupResolver } from "@hookform/resolvers/yup";
import { Close as CloseIcon } from "@mui/icons-material";
import { Box, Modal } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import {
  User as UserIcon,
  MapPin,
  CreditCard,
  Heart,
  Tag,
  CheckCircle,
  Users,
  UserPlus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import CommonButton from "../../../common/button/CommonButton";
import CheckBoxField from "../../../common/formFields/CheckBoxField";
import DatePickerField from "../../../common/formFields/DatePickerField";
import InputArea from "../../../common/formFields/InputArea";
import InputField from "../../../common/formFields/InputField";
import DropdownField from "../../../common/formFields/DropdownField";
import { errorAlert, successAlert } from "../../../common/toast/CustomToast";
import { getUserDetails } from "../../../../services/login/LoginServices";
import { useAuth } from "../../../../context/AuthContext";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import { DeleteIcon } from "../../../common/assets/CommonAssets";

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
  nomineeName: yup.string().nullable(),
  nomineeRelation: yup.string().nullable(),
  emergencyContactName: yup
    .string()
    .required("Emergency contact name is required"),
  emergencyContactRelation: yup.string().required("Relation is required"),
  emergencyContactNumber: yup
    .string()
    .required("Emergency contact number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  familyMembers: yup.array().of(
    yup.object().shape({
      name: yup.string().required("Name is required"),
      relation: yup.string().required("Relation is required"),
      dob: yup.date().nullable().required("DOB is required"),
    }),
  ),
  termsAccepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms")
    .required(),
  couponCode: yup.string().nullable(),
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
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const basePrice = membershipDetails?.primaryDiscount || 0;
  const totalAmount = basePrice - discount;

  const isFamilyPlan = membershipDetails?.benifits?.some((b) =>
    [
      "Mother",
      "Father",
      "Wife",
      "Husband",
      "Son",
      "Daughter",
      "Brother",
      "Sister",
    ].includes(b),
  );

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
      bloodGroup: "",
      qualification: "",
      mobileNumber: "",
      email: "",
      aadharNumber: "",
      occupation: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      nomineeName: "",
      nomineeRelation: "",
      emergencyContactName: "",
      emergencyContactRelation: "",
      emergencyContactNumber: "",
      familyMembers: [],
      termsAccepted: false,
      couponCode: "",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "familyMembers",
  });

  const couponCodeValue = watch("couponCode");
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
            setValue("address", userData.address || "");
            setValue("city", userData.city || "");
            setValue("state", userData.state || "");
            setValue("pincode", userData.pincode || "");
            setValue("occupation", userData.occupation || "");
          }
        })
        .catch(() => {
          errorAlert("Failed to fetch user details.");
        });
    }
  }, [open, user, setValue]);

  const applyCoupon = () => {
    if (!couponCodeValue) {
      errorAlert("Please enter a coupon code");
      return;
    }

    if (couponCodeValue === membershipDetails?.couponCode) {
      const discountPercent = parseInt(couponCodeValue.match(/\d+/) || "0");
      const discountVal = (basePrice * discountPercent) / 100;
      setDiscount(discountVal);
      setCouponApplied(true);
      successAlert(`Coupon applied! ${discountPercent}% discount added.`);
    } else {
      setDiscount(0);
      setCouponApplied(false);
      errorAlert("Invalid coupon code for this membership.");
    }
  };

  const onSubmit = (data) => {
    console.log("Membership Registration Data:", {
      membership: membershipDetails?.serviceName,
      basePrice,
      discount,
      totalAmount,
      ...data,
    });
    alert("Registration Successful!");
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
                    Membership Registration
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm font-medium truncate max-w-[200px] sm:max-w-none">
                    {membershipDetails?.serviceName}
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InputField
                      control={control}
                      name="fullName"
                      label="Full Name *"
                      error={errors.fullName}
                    />
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
                    <UserPlus className="w-5 h-5 text-blue-500" /> Nominee
                    Details (Optional)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      control={control}
                      name="nomineeName"
                      label="Nominee Name"
                      error={errors.nomineeName}
                    />
                    <InputField
                      control={control}
                      name="nomineeRelation"
                      label="Relation with Member"
                      error={errors.nomineeRelation}
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

                {isFamilyPlan && (
                  <section className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between border-b pb-2 mb-4">
                      <h3 className="text-base sm:text-lg font-bold text-green-800 flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-500" /> Family
                        Member Details
                      </h3>
                      <CommonButton
                        type="button"
                        onClick={() =>
                          append({ name: "", relation: "", dob: null })
                        }
                        label="Add Member"
                        className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 text-xs px-3 py-1.5"
                      />
                    </div>

                    {fields.length === 0 && (
                      <p className="text-center text-slate-500 py-4 text-sm italic">
                        No family members added yet. Click "Add Member" to
                        include family details.
                      </p>
                    )}

                    <div className="space-y-4">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="p-4 rounded-lg bg-slate-50 border border-slate-200 relative group"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <InputField
                              control={control}
                              name={`familyMembers.${index}.name`}
                              label="Full Name *"
                              error={errors.familyMembers?.[index]?.name}
                            />
                            <InputField
                              control={control}
                              name={`familyMembers.${index}.relation`}
                              label="Relation *"
                              error={errors.familyMembers?.[index]?.relation}
                            />
                            <div className="flex space-x-2 items-center w-full">
                              <div>
                                <DatePickerField
                                  control={control}
                                  name={`familyMembers.${index}.dob`}
                                  label="Date of Birth *"
                                  inputFormat="dd-MM-yyyy"
                                  disableFuture={true}
                                  error={errors.familyMembers?.[index]?.dob}
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className=" relative right-1 text-slate-400 hover:text-red-500 transition-colors"
                              >
                                <DeleteIcon fontSize="small" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                  <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-orange-500" /> Have a Coupon?
                    </h3>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <InputField
                          control={control}
                          name="couponCode"
                          label="Coupon Code"
                          error={errors.couponCode}
                        />
                      </div>
                      <CommonButton
                        type="button"
                        onClick={applyCoupon}
                        className="bg-orange-500 text-white hover:bg-orange-600 transition-all font-semibold"
                        label="Apply"
                      />
                    </div>
                    {couponApplied && (
                      <div className="mt-2 text-xs text-green-600 flex items-center gap-1 font-bold animate-pulse">
                        <CheckCircle size={14} /> Coupon Applied Successfully
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-br from-emerald-800 to-green-900 p-5 rounded-xl shadow-lg border border-slate-700 text-white">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-amber-500 text-sm font-semibold">
                        <span>Base Amount :</span>
                        <span>₹{basePrice.toLocaleString()}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between items-center text-green-400 text-sm">
                          <span>Discount Applied :</span>
                          <span>- ₹{discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="border-t border-amber-500/30 my-2 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-base sm:text-lg font-bold">
                            Total Payable :
                          </span>
                          <span className="text-xl sm:text-2xl font-black text-amber-400">
                            ₹{totalAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
                    label="Proceed to Payment"
                    disabled={!termsAcceptedValue}
                    className={`text-white ${termsAcceptedValue ? "bg-gradient-to-r from-green-700 to-green-600" : ""}`}
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
