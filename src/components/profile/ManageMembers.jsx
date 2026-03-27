import React, { useEffect, useState } from "react";
import { getPatientDataByMobileNo } from "../../services/bookAppointment/BookAppointmentServices";
import { Modal, Box, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Phone,
  Calendar,
  Heart,
  ChevronRight,
  Pencil,
  Plus,
  ArrowLeft,
  Save,
} from "lucide-react";
import { useForm } from "react-hook-form";
import InputField from "../common/formFields/InputField";
import InputArea from "../common/formFields/InputArea";
import DatePickerField from "../common/formFields/DatePickerField";
import DropdownField from "../common/formFields/DropdownField";
import CancelButtonModal from "../common/button/CancelButtonModal";
import CommonButton from "../common/button/CommonButton";
import { updatePatient } from "../../services/login/LoginServices";
import { format } from "date-fns";
import ConfirmationModal from "../common/ConfirmationModal";
import { useLoader } from "../common/commonLoader/LoaderContext";
import { errorAlert, successAlert } from "../common/toast/CustomToast";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  outline: "none",
  border: "none",
};

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

export default function ManageMembers({ open, onClose, user, setOpen }) {
  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list");
  const [editingId, setEditingId] = useState(null);
  const [finalSaveObj, setFinalSaveObj] = useState(null);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [ipAddress, setIpAddress] = useState(null);

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
      lastName: "",
      mobileNo: "",
      dob: "",
      relation: null,
      address: "",
    },
  });

  const handleEdit = (member) => {
    setEditingId(member.userId);
    setValue("firstName", member.firstName);
    setValue("lastName", member.lastName);
    setValue("mobileNo", member.mobileNo);
    setValue("pinCode", member.pinCode);
    setValue("dob", new Date(member.dob));
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
    setEditingId(null);
    reset({
      firstName: "",
      lastName: "",
      mobileNo: "",
      dob: null,
      relation: null,
      address: "",
    });
    setView("form");
  };

  console.log("memberList", memberList);
 
  const onSubmit = (data) => {
    const payload = {
      userId: editingId,
      firstName: data.firstName,
      lastName: data.lastName,
      DOB: format(new Date(data.dob), "yyyy-MM-dd"),
      address: data.address,
      pinCode: data.pinCode,
      macId: "",
      macIp: ipAddress ?? "",
      Relation: data.relation.value,
    };
    setFinalSaveObj(payload);
    setOpenConfirmationModal(open);
  };

  const handleUpdatePatient = () => {
    setIsLoading(true);
    setOpenConfirmationModal(false);
    updatePatient(finalSaveObj)
      .then((res) => {
        successAlert(res.data.message);
        setIsLoading(false);
        reset();
        onClose();
        setView("list");
        setOpen(false);
      })
      .catch((error) => {
        setIsLoading(false);
        errorAlert(error.message);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIpAddress(data.ip))
      .catch((err) => console.error("IP fetch error:", err));
  }, [setValue]);

  useEffect(() => {
    if (user?.mobileNo && open) {
      setLoading(true);
      getPatientDataByMobileNo(user?.mobileNo, 5)
        .then((res) => {
          setMemberList(res.data.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user, open]);
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="manage-members-title"
        closeAfterTransition
        className="flex items-center justify-center p-4"
      >
        <Box
          sx={modalStyle}
          className="w-full max-w-[950px] focus:outline-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-100 flex flex-col max-h-[90vh]"
          >
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-4 flex justify-between items-center text-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                {view === "form" && (
                  <button
                    onClick={() => setView("list")}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}
                <div>
                  <h2
                    id="manage-members-title"
                    className="text-2xl font-bold tracking-tight"
                  >
                    {view === "list"
                      ? "Manage Members"
                      : editingId
                        ? "Edit Member"
                        : "Add New Member"}
                  </h2>
                </div>
              </div>
              <CancelButtonModal onClick={onClose} />
            </div>

            <div className="overflow-y-auto custom-scrollbar grow bg-gray-50/30">
              <AnimatePresence mode="wait">
                {view === "list" ? (
                  <motion.div
                    key="list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-8 space-y-4"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Your Family ({memberList.length})
                      </span>
                    </div>

                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <div className="w-10 h-10 border-4 border-green-500/30 border-t-green-600 rounded-full animate-spin" />
                        <p className="text-sm text-gray-500 font-medium tracking-wide">
                          Fetching family members...
                        </p>
                      </div>
                    ) : memberList.length > 0 ? (
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {memberList.map((member) => (
                          <motion.div
                            key={member.id}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center gap-5 group border-l-4 border-l-transparent hover:border-l-green-500"
                          >
                            <div className="w-14 h-14 rounded-full bg-green-50 border border-green-100 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                              <User
                                className="text-green-600 group-hover:scale-110 transition-transform"
                                size={28}
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1.5">
                                <h3 className="font-bold text-gray-800 truncate text-lg capitalize">
                                  {member.firstName} {member.lastName}
                                </h3>
                                <span className="text-[10px] font-black px-2.5 py-1 bg-green-50 text-green-700 border border-green-100 rounded-lg uppercase tracking-wider">
                                  {member.relation || user?.relation}
                                </span>
                              </div>

                              <div className="flex flex-col gap-1.5 mt-2">
                                <div className="flex items-center text-xs text-gray-500 gap-2 font-medium">
                                  <Phone
                                    size={14}
                                    className="text-green-500 shrink-0"
                                  />
                                  <span>{member.mobileNo}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-500 gap-2 font-medium">
                                  <Calendar
                                    size={14}
                                    className="text-blue-500 shrink-0"
                                  />
                                  <span>
                                    {member.dob || "Date of Birth N/A"}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => handleEdit(member)}
                              className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all"
                            >
                              <Pencil size={20} />
                            </button>
                          </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <div className="text-center py-24 px-10">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 border-2 border-dashed border-gray-200">
                          <Heart className="text-gray-300" size={40} />
                        </div>
                        <h3 className="text-gray-900 text-xl font-bold mb-2">
                          Build Your Family Circle
                        </h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto">
                          Link family members to centralize health records and
                          manage appointments seamlessly.
                        </p>
                        <button
                          onClick={handleAddNew}
                          className="mt-8 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm transition-all shadow-lg"
                        >
                          Add First Member
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-10"
                  >
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <InputField
                          name="firstName"
                          label="First Name"
                          control={control}
                          error={errors.firstName}
                        />
                        <InputField
                          name="lastName"
                          label="Last Name"
                          control={control}
                          error={errors.lastName}
                        />
                        <InputField
                          name="mobileNo"
                          label="Mobile Number"
                          control={control}
                          error={errors.mobileNo}
                        />
                        <DatePickerField
                          name="dob"
                          label="Date of Birth"
                          control={control}
                          error={errors.dob}
                        />
                        <DropdownField
                          name="relation"
                          label="Relationship"
                          placeholder="Select Relation"
                          control={control}
                          dataArray={relationOptions}
                          error={errors.relation}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <InputField
                            name="pinCode"
                            label="Pin Code"
                            control={control}
                            error={errors.pinCode}
                          />
                        </div>
                        <div className="col-span-2">
                          <InputArea
                            name="address"
                            label="Address"
                            control={control}
                            error={errors.address}
                            minRows={3}
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 justify-end">
                        <CommonButton
                          type="button"
                          label="Reset"
                          onClick={reset}
                          className="border border-red-600 text-red-600 "
                        />
                        <CommonButton
                          type="submit"
                          label={editingId ? "Update Member" : "Save Member"}
                          className="bg-green-600  text-white"
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
    </>
  );
}
