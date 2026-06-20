import { Box, FormHelperText, Modal } from "@mui/material";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Calendar, Heart, Pencil, Phone, User } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getPatientDataByMobileNo } from "../../services/bookAppointment/BookAppointmentServices";
import { updatePatient } from "../../services/login/LoginServices";
import ConfirmationModal from "../common/ConfirmationModal";
import CancelButtonModal from "../common/button/CancelButtonModal";
import CommonButton from "../common/button/CommonButton";
import { useLoader } from "../common/commonLoader/LoaderContext";
import DatePickerField from "../common/formFields/DatePickerField";
import DropdownField from "../common/formFields/DropdownField";
import InputArea from "../common/formFields/InputArea";
import InputField from "../common/formFields/InputField";
import { errorAlert, successAlert } from "../common/toast/CustomToast";
import AddPatientModal from "../pages/opdBooking/AddPatientModal";
import { ModalStyle } from "../common/modalStyle/ModalStyle";


const relationOptions = [
  { value: "Self", label: "Self" },
  { value: "Father", label: "Father" },
  { value: "Mother", label: "Mother" },
  { value: "Spouse", label: "Spouse" },
  { value: "Son", label: "Son" },
  { value: "Daughter", label: "Daughter" },
  { value: "Brother", label: "Brother" },
  { value: "Sister", label: "Sister" },
  { value: "Other", label: "Other" },
];

const bloodGroupOptions = [
  { id: 1, value: "A+", label: "A+" },
  { id: 2, value: "A-", label: "A-" },
  { id: 3, value: "B+", label: "B+" },
  { id: 4, value: "B-", label: "B-" },
  { id: 5, value: "AB+", label: "AB+" },
  { id: 6, value: "AB-", label: "AB-" },
  { id: 7, value: "O+", label: "O+" },
  { id: 8, value: "O-", label: "O-" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
};

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  mobileNo: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  dob: yup.date().nullable().required("Date of birth is required"),
  relation: yup
    .object()
    .shape({
      value: yup.string().required(),
      label: yup.string().required(),
    })
    .nullable()
    .required("Relationship is required"),
  pinCode: yup
    .string()
    .matches(/^[0-9]{6}$/, "Pin code must be 6 digits")
    .required("Pin code is required"),
  address: yup.string().required("Address is required"),
});

export default function ManageMembers({ open, onClose, user, setOpen }) {
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [editingId, setEditingId] = useState(null);
  const [finalSaveObj, setFinalSaveObj] = useState(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [ipAddress, setIpAddress] = useState(null);
  const [openAddPatient, setOpenAddPatient] = useState(false);

  const { setIsLoading } = useLoader();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      mobileNo: "",
      dob: null,
      relation: null,
      address: "",
      pinCode: "",
      bloodGroup: null,
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const handleEdit = (member) => {
    setEditingId(member.userId);
    setValue("firstName", member.firstName);
    setValue("middleName", member.middleName);
    setValue("lastName", member.lastName);
    setValue("mobileNo", member.mobileNo);
    setValue("pinCode", member.pinCode);
    setValue("dob", new Date(member.dob));
    const bloodGroup =
      bloodGroupOptions.find(
        (opt) => opt.value.toLowerCase() === member?.bloodGroup?.toLowerCase(),
      ) || null;
    setValue("bloodGroup", bloodGroup);
    setValue(
      "relation",
      relationOptions.find(
        (opt) => opt.value.toLowerCase() === member.relation.toLowerCase(),
      ) || null,
    );
    setValue("address", member.address);
    setView("form");
  };

  const handleAddNew = () => {
    setOpenAddPatient(true);
  };

  const onSubmit = (data) => {
    const payload = {
      userId: editingId,
      firstName: data.firstName,
      lastName: data.lastName,
      DOB:
        data.dob && !isNaN(new Date(data.dob).getTime())
          ? format(new Date(data.dob), "yyyy-MM-dd")
          : "",
      address: data.address,
      pinCode: data.pinCode,
      macId: "",
      macIp: ipAddress ?? "",
      Relation: data.relation?.value || "",
      bloodGroup: data.bloodGroup?.value,
      middleName:data.middleName,
    };
    setFinalSaveObj(payload);
    setOpenConfirmationModal(true);
  };

  const onFormError = useCallback((errs) => {
    const firstErrorField = Object.keys(errs)[0];
    if (firstErrorField && errs[firstErrorField]?.message) {
      errorAlert(errs[firstErrorField].message);
    }
  }, []);

  const handleUpdatePatient = () => {
    setIsLoading(true);
    setOpenConfirmationModal(false);
    updatePatient(finalSaveObj)
      .then((res) => {
        if (res?.data) {
          successAlert(res.data.message || "Updated successfully");
          setIsLoading(false);
          reset();
          onClose();
          setView("list");
          setOpen(false);
        } else {
          errorAlert("Update failed: No response from server");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        errorAlert(error?.message || "An error occurred during update");
      });
  };

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIpAddress(data?.ip))
      .catch((err) => console.error("IP fetch error:", err));
  }, []);

  const fetchMembers = () => {
    if (user?.mobileNo) {
      setLoading(true);
      getPatientDataByMobileNo(user?.mobileNo, user.userId, "IPD", 5)
        .then((res) => {
          if (res?.data?.data) {
            setMemberList(res.data.data);
          } else {
            setMemberList([]);
          }
          setLoading(false);
        })
        .catch(() => {
          setMemberList([]);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (open) {
      fetchMembers();
    }
  }, [user, open]);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="manage-members-title"
        closeAfterTransition
      >
        <Box
          sx={ModalStyle}
          className="w-[calc(100vw-16px)] sm:w-[calc(100vw-32px)] md:w-[720px] lg:w-[950px] focus:outline-none h-full max-h-[85vh] no-scrollbar rounded-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col h-full max-h-[92vh] sm:max-h-[88vh]"
          >
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-3 sm:px-6 py-3 sm:py-4 md:flex items-center md:justify-between text-white sticky top-0 z-10 shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                {view === "form" && (
                  <button
                    onClick={() => setView("list")}
                    className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors shrink-0"
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <div className="min-w-0">
                  <h2
                    id="manage-members-title"
                    className="text-base sm:text-xl font-bold tracking-tight truncate"
                  >
                    {view === "list"
                      ? "Manage Members"
                      : editingId
                        ? "Edit Member"
                        : "Add New Member"}
                  </h2>
                  {view === "list" && memberList.length > 0 && (
                    <p className="text-green-100 text-[10px] sm:text-xs font-medium mt-0.5">
                      {memberList.length} member
                      {memberList.length !== 1 ? "s" : ""} linked
                    </p>
                  )}
                </div>
              </div>
              <div className="md:flex items-center gap-2 shrink-0 flex justify-end">
                {view === "list" && (
                  <CommonButton
                    type="button"
                    onClick={handleAddNew}
                    label={"+ Add Member"}
                    className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5  transition-colors mr-5"
                  />
                )}

                <CancelButtonModal onClick={onClose} />
              </div>
            </div>

            <div className="overflow-y-auto grow bg-gray-50/40">
              <AnimatePresence mode="wait">
                {view === "list" ? (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 sm:p-5 lg:p-7"
                  >
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-16 sm:py-24 gap-4">
                        <div className="w-9 h-9 border-4 border-green-500/30 border-t-green-600 rounded-full animate-spin" />
                        <p className="text-sm text-gray-500 font-medium">
                          Fetching family members...
                        </p>
                      </div>
                    ) : memberList.length > 0 ? (
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                      >
                        {memberList.map((member) => (
                          <motion.div
                            key={member.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.01, y: -2 }}
                            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden"
                          >
                            <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-l-4 border-l-transparent group-hover:border-l-green-500 transition-all duration-300">
                              <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                                <User className="text-green-600" size={22} />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <h3 className="font-bold text-gray-800 text-sm sm:text-base capitalize leading-tight truncate">
                                    {member.firstName} {member.lastName}
                                  </h3>
                                  <span className="text-[9px] sm:text-[10px] font-black px-2 py-0.5 bg-green-50 text-green-700 border border-green-100 rounded-md uppercase tracking-wider shrink-0">
                                    {member.relation || user?.relation}
                                  </span>
                                </div>

                                <div className="flex flex-col gap-1 mt-1.5">
                                  <div className="flex items-center text-[11px] sm:text-xs text-gray-500 gap-1.5 font-medium">
                                    <Phone
                                      size={11}
                                      className="text-green-500 shrink-0"
                                    />
                                    <span className="truncate">
                                      {member.mobileNo}
                                    </span>
                                  </div>
                                  <div className="flex items-center text-[11px] sm:text-xs text-gray-500 gap-1.5 font-medium">
                                    <Calendar
                                      size={11}
                                      className="text-blue-400 shrink-0"
                                    />
                                    <span>
                                      {member.dob || "DOB not available"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <button
                                onClick={() => handleEdit(member)}
                                className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all shrink-0"
                              >
                                <Pencil size={16} />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-6 text-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-5 border-2 border-dashed border-gray-200">
                          <Heart className="text-gray-300" size={32} />
                        </div>
                        <h3 className="text-gray-900 text-lg sm:text-xl font-bold mb-2">
                          Build Your Family Circle
                        </h3>
                        <p className="text-gray-500 text-sm max-w-xs">
                          Link family members to centralize health records and
                          manage appointments seamlessly.
                        </p>
                        <button
                          onClick={handleAddNew}
                          className="mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-green-600/20"
                        >
                          Add First Member
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                    className="p-3 sm:p-5 lg:p-8"
                  >
                    <form
                      onSubmit={handleSubmit(onSubmit, onFormError)}
                      className="space-y-4 sm:space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-x-6 sm:gap-y-5">
                        <div>
                          <InputField
                            name="firstName"
                            label="First Name *"
                            control={control}
                            error={errors.firstName}
                          />
                          {errors.firstName && (
                            <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                              {errors.firstName.message}
                            </FormHelperText>
                          )}
                        </div>
                        <InputField
                          name="middleName"
                          label="Middle Name"
                          control={control}
                        />
                        <div>
                          <InputField
                            name="lastName"
                            label="Last Name *"
                            control={control}
                            error={errors.lastName}
                          />
                          {errors.lastName && (
                            <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                              {errors.lastName.message}
                            </FormHelperText>
                          )}
                        </div>
                        <div>
                          <InputField
                            name="mobileNo"
                            label="Mobile Number *"
                            control={control}
                            error={errors.mobileNo}
                          />
                          {errors.mobileNo && (
                            <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                              {errors.mobileNo.message}
                            </FormHelperText>
                          )}
                        </div>
                        <div>
                          <DatePickerField
                            name="dob"
                            label="Date of Birth *"
                            control={control}
                            error={errors.dob}
                          />
                          {errors.dob && (
                            <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                              {errors.dob.message}
                            </FormHelperText>
                          )}
                        </div>
                        <div>
                          <DropdownField
                            name="relation"
                            label="Relationship"
                            placeholder="Select Relation *"
                            control={control}
                            dataArray={relationOptions}
                            error={errors.relation}
                          />
                          {errors.relation && (
                            <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                              {errors.relation.message}
                            </FormHelperText>
                          )}
                        </div>
                        <div>
                          <InputField
                            name="pinCode"
                            label="Pin Code *"
                            control={control}
                            error={errors.pinCode}
                          />
                          {errors.pinCode && (
                            <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                              {errors.pinCode.message}
                            </FormHelperText>
                          )}
                        </div>
                        <div>
                          <DropdownField
                            name="bloodGroup"
                            label="Blood Group"
                            placeholder="Select Blood Group *"
                            control={control}
                            dataArray={bloodGroupOptions}
                            error={errors.bloodGroup}
                          />
                          {errors.bloodGroup && (
                            <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                              {errors.bloodGroup.message}
                            </FormHelperText>
                          )}
                        </div>
                      </div>

                      <div>
                        <InputArea
                          name="address"
                          label="Address *"
                          control={control}
                          error={errors.address}
                          minRows={3}
                        />
                        {errors.address && (
                          <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                            {errors.address.message}
                          </FormHelperText>
                        )}
                      </div>

                      <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-1">
                        <CommonButton
                          type="button"
                          label="Reset"
                          onClick={reset}
                          className="border border-red-500 text-red-600 w-full sm:w-auto"
                        />
                        <CommonButton
                          type="submit"
                          label={editingId ? "Update Member" : "Save Member"}
                          className="bg-green-600 text-white w-full sm:w-auto"
                        />
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </Box>
      </Modal>

      <ConfirmationModal
        confirmationOpen={openConfirmationModal}
        confirmationHandleClose={() => setOpenConfirmationModal(false)}
        confirmationSubmitFunc={handleUpdatePatient}
        confirmationLabel="Confirm Registration"
        confirmationMsg="Are you sure you want to update this member?"
        confirmationButtonMsg="Confirm"
      />

      <AddPatientModal
        open={openAddPatient}
        title="Member Registration"
        handleClose={() => {
          setOpenAddPatient(false);
          fetchMembers();
        }}
      />
    </>
  );
}
