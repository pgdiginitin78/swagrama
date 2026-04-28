import React from "react";
import { Modal, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Droplet,
  Waves,
  Droplets,
  CheckCircle2,
  User,
  Home,
  Clock,
  FileText,
  Info,
} from "lucide-react";
import CommonButton from "../../../common/button/CommonButton";
import DatePickerField from "../../../common/formFields/DatePickerField";
import DropdownField from "../../../common/formFields/DropdownField";
import InputField from "../../../common/formFields/InputField";
import SearchDropdown from "../../../common/formFields/SearchDropdown";
import InputArea from "../../../common/formFields/InputArea";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  maxWidth: "1200px",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  borderRadius: "9px",
  outline: "none",
  overflow: "hidden",
};

const therapyTypes = [
  { id: "abhyanga", label: "Abhyanga", icon: Droplet },
  { id: "shirodhara", label: "Shirodhara", icon: Waves },
  { id: "pizhichil", label: "Pizhichil", icon: Droplets },
];

const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM"];

const validationSchema = yup.object().shape({
  patient: yup.object().nullable().required("Required"),
  bookingCategory: yup.string().required("Required"),
  daycareFacility: yup.object().nullable().required("Required"),
  therapyType: yup.string().required("Required"),
  therapist: yup.object().nullable().required("Required"),
  room: yup.object().nullable().required("Required"),
  bookingDate: yup.date().nullable().required("Required"),
  timeSlot: yup.string().required("Required"),
});

export default function TherapyAdminBooking({ open, handleClose }) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      bookingCategory: "OPD",
      therapyType: "abhyanga",
      bookingDate: new Date(),
    },
  });

  const selectedCategory = watch("bookingCategory");
  const selectedTherapy = watch("therapyType");
  const selectedSlot = watch("timeSlot");

  const onSubmit = (data) => {
    console.log(data);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <div className="flex flex-col h-full max-h-[90vh] bg-slate-50">
          <div className="bg-white px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 sticky top-0 z-10">
            <div>
              <h1 className="text-xl font-bold text-[#003d32] tracking-tight">
                New Therapy Booking
              </h1>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Schedule a new wellness session in the digital sanctuary.
              </p>
            </div>
            <div className="flex items-center gap-3 mt-3 md:mt-0">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-slate-600 text-sm font-bold hover:bg-slate-50 rounded-lg transition-all"
              >
                Cancel
              </button>
              <CommonButton
                onClick={handleSubmit(onSubmit)}
                label="Create Booking"
                icon={<CheckCircle2 size={16} />}
                className="!h-auto !px-5 !py-2 !bg-[#003d32] !text-white !text-sm !font-bold !rounded-lg flex items-center gap-2 hover:!bg-[#002b23] transition-all shadow-md active:scale-95"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <form className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white p-5 rounded-[9px] border shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-slate-50 rounded-md">
                      <User className="text-[#003d32]" size={18} />
                    </div>
                    <h2 className="text-lg font-bold text-[#003d32]">
                      Patient Selection
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="">
                      <SearchDropdown
                        control={control}
                        name="patient"
                        placeholder="Search by Name or Number..."
                        searchIcon={true}
                        error={errors.patient}
                        dataArray={[]}
                      />
                    </div>
                    <div className="">
                      <InputField
                        control={control}
                        name="patientId"
                        label="Patient ID"
                        disabled={true}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        Booking Category
                      </label>
                      <div className="flex bg-slate-100/80 p-1 rounded-xl w-full">
                        <button
                          type="button"
                          onClick={() => setValue("bookingCategory", "OPD")}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${selectedCategory === "OPD" ? "bg-green-200 text-[#003d32] shadow-sm scale-[1.01]" : "text-slate-500 hover:text-slate-700"}`}
                        >
                          OPD
                        </button>
                        <button
                          type="button"
                          onClick={() => setValue("bookingCategory", "IPD")}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all duration-300 ${selectedCategory === "IPD" ? "bg-green-200 text-[#003d32] shadow-sm scale-[1.01]" : "text-slate-500 hover:text-slate-700"}`}
                        >
                          IPD
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        Daycare Facility
                      </label>
                      <DropdownField
                        control={control}
                        name="daycareFacility"
                        placeholder="Select Suite/Room"
                        error={errors.daycareFacility}
                        dataArray={[]}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-[9px] border shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 bg-slate-50 rounded-md">
                      <Home className="text-[#003d32]" size={18} />
                    </div>
                    <h2 className="text-lg font-bold text-[#003d32]">
                      Therapy Details
                    </h2>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        Therapy Type
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {therapyTypes.map((type) => {
                          const Icon = type.icon;
                          const isActive = selectedTherapy === type.id;
                          return (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => setValue("therapyType", type.id)}
                              className={`flex flex-col items-center justify-center p-4 rounded-[9px] border-2 transition-all duration-300 ${
                                isActive
                                  ? "border-[#003d32]/20 bg-[#f0f9f7] text-[#003d32] shadow-md scale-[1.01]"
                                  : "border-slate-50 bg-slate-50/50 text-slate-400 hover:border-slate-200 hover:bg-white hover:text-slate-600"
                              }`}
                            >
                              <Icon
                                size={20}
                                className={`mb-2 ${isActive ? "text-[#003d32]" : "text-slate-300"}`}
                              />
                              <span className="font-bold text-[12px] tracking-tight">
                                {type.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          Therapist Assignment
                        </label>
                        <DropdownField
                          control={control}
                          name="therapist"
                          placeholder="Select Therapist"
                          error={errors.therapist}
                          dataArray={[]}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                          Room Assignment
                        </label>
                        <DropdownField
                          control={control}
                          name="room"
                          placeholder="Select Room"
                          error={errors.room}
                          dataArray={[]}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-[#003d32] p-5 rounded-[9px] shadow-xl shadow-[#003d32]/10 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={18} className="text-emerald-400" />
                    <h2 className="text-lg font-bold">Scheduling</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-emerald-100/40 uppercase tracking-wider">
                        Select Date
                      </label>
                      <DatePickerField
                        control={control}
                        name="bookingDate"
                        inputFormat="dd-MM-yyyy"
                        disablePast={true}
                        error={errors.bookingDate}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-emerald-100/40 uppercase tracking-wider">
                        Available Slots
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setValue("timeSlot", slot)}
                            className={`py-2 px-2 rounded-xl text-[11px] font-bold transition-all border ${
                              selectedSlot === slot
                                ? "bg-white text-[#003d32] border-white shadow-md scale-[1.02]"
                                : "bg-[#004d40] text-emerald-50/60 border-emerald-500/10 hover:border-emerald-500/30 hover:text-white"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#4d5d30] p-5 rounded-[9px] shadow-xl shadow-[#4d5d30]/10 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText size={18} className="text-lime-400" />
                    <h2 className="text-lg font-bold">Session Notes</h2>
                  </div>
                  <InputArea
                    control={control}
                    name="notes"
                    label="Special medical instructions..."
                    multiline={true}
                    minRows={3}
                    maxRows={5}
                  />
                </div>

                <div className="bg-emerald-50/30 p-5 rounded-[9px] border border-emerald-300 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Info size={16} className="text-[#003d32]" />
                    <h2 className="text-[11px] font-black text-[#003d32] uppercase tracking-wider">
                      Booking Guidelines
                    </h2>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      "Confirm therapist availability.",
                      "IPD require room verification.",
                      "Cancellation: 4h prior notice.",
                    ].map((text, i) => (
                      <p
                        key={i}
                        className="flex gap-2.5 text-[11px] text-slate-600 font-medium leading-tight"
                      >
                        <div className="w-1 h-1 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
