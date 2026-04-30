import React, { useState, useRef, useEffect } from "react";
import { Box, Modal, Avatar, IconButton, Tooltip } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../../common/formFields/InputField";
import DatePickerField from "../../../common/formFields/DatePickerField";
import DropdownField from "../../../common/formFields/DropdownField";
import RadioField from "../../../common/formFields/RadioField";
import InputArea from "../../../common/formFields/InputArea";
import CommonButton from "../../../common/button/CommonButton";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import TimePickerField from "../../../common/formFields/TimePickerField";
import { DeleteIcon } from "../../../common/assets/CommonAssets";
import { ModalStyle } from "../../../common/modalStyle/ModalStyle";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import EditIcon from "@mui/icons-material/Edit";
import DrawIcon from "@mui/icons-material/Draw";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import EventNoteIcon from "@mui/icons-material/EventNote";

const SPECIALIZATION_OPTIONS = [
  { id: "ayurvedic_physician", label: "Ayurvedic Physician" },
  { id: "general_physician", label: "General Physician" },
  { id: "cardiologist", label: "Cardiologist" },
  { id: "dermatologist", label: "Dermatologist" },
  { id: "orthopedic", label: "Orthopedic" },
  { id: "neurologist", label: "Neurologist" },
  { id: "pediatrician", label: "Pediatrician" },
  { id: "gynecologist", label: "Gynecologist" },
  { id: "ent_specialist", label: "ENT Specialist" },
  { id: "ophthalmologist", label: "Ophthalmologist" },
  { id: "psychiatrist", label: "Psychiatrist" },
  { id: "urologist", label: "Urologist" },
];

const DEPARTMENT_OPTIONS = [
  { id: "ayurveda", label: "Ayurveda" },
  { id: "general_medicine", label: "General Medicine" },
  { id: "cardiology", label: "Cardiology" },
  { id: "dermatology", label: "Dermatology" },
  { id: "orthopedics", label: "Orthopedics" },
  { id: "neurology", label: "Neurology" },
  { id: "pediatrics", label: "Pediatrics" },
  { id: "gynecology", label: "Gynecology" },
  { id: "ent", label: "ENT" },
  { id: "ophthalmology", label: "Ophthalmology" },
  { id: "psychiatry", label: "Psychiatry" },
  { id: "urology", label: "Urology" },
  { id: "emergency", label: "Emergency" },
];

const WEEK_DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const DAY_LABELS = {
  all: "All",
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

const dropdownObjectSchema = yup
  .object()
  .shape({
    id: yup.mixed().required(),
    label: yup.string().required(),
  })
  .nullable()
  .required("This field is required");

const qualificationSchema = yup.object().shape({
  degree: yup.string().trim().required("Required"),
  university: yup.string().trim().required("Required"),
  year: yup
    .string()
    .trim()
    .required("Required")
    .matches(/^\d{4}$/, "Enter a valid 4-digit year"),
});

const validationSchema = yup.object().shape({
  firstName: yup.string().trim().required("Required"),
  lastName: yup.string().trim().required("Required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Required"),
  contactNumber: yup
    .string()
    .trim()
    .matches(/^[0-9+\-\s()]{7,15}$/, "Invalid contact number")
    .required("Required"),
  dob: yup.date().nullable().typeError("Invalid date"),
  gender: yup.string().nullable(),
  specialization: dropdownObjectSchema,
  department: dropdownObjectSchema,
  experianceInYear: yup
    .number()
    .transform((val, orig) => (orig === "" ? undefined : val))
    .nullable()
    .min(0, "Cannot be negative")
    .typeError("Must be a number"),
  doctorRefferanceNo: yup.string().nullable(),
  address: yup.string().nullable(),
  country: yup.string().nullable(),
  city: yup.string().nullable(),
  postalCode: yup.string().nullable(),
  qualifications: yup.array().of(qualificationSchema),
  timeSlot: yup
    .number()
    .transform((val, orig) => (orig === "" ? undefined : val))
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Required"),
  slotCount: yup
    .number()
    .transform((val, orig) => (orig === "" ? undefined : val))
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Required"),
  morningStartTime: yup.mixed().nullable(),
  morningEndTime: yup.mixed().nullable(),
  eveningStartTime: yup.mixed().nullable(),
  eveningEndTime: yup.mixed().nullable(),
  weekDays: yup
    .object()
    .test("at-least-one-day", "Please select at least one day", (value) => {
      if (!value) return false;
      const { all, ...rest } = value;
      return Object.values(rest).some((v) => v === true);
    }),
});

const DEFAULT_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  dob: null,
  gender: "",
  specialization: null,
  experianceInYear: "",
  doctorRefferanceNo: "",
  department: null,
  address: "",
  country: "",
  city: "",
  postalCode: "",
  qualifications: [],
  timeSlot: "",
  slotCount: "",
  morningStartTime: null,
  morningEndTime: null,
  eveningStartTime: null,
  eveningEndTime: null,
  weekDays: {
    all: false,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  },
};

function EditPencilSVG() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 12, height: 12 }}
    >
      <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
    </svg>
  );
}

function AvatarUploader({ value, onChange, label }) {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Tooltip title="Change Profile Photo" placement="top" arrow>
        <div
          onClick={() => inputRef.current.click()}
          className="relative cursor-pointer group"
        >
          {/* Outer ring */}
          <div
            className="w-[96px] h-[96px] rounded-full p-[3px]"
            style={{
              background: value
                ? "linear-gradient(135deg, #0d9488, #06b6d4)"
                : "linear-gradient(135deg, #cbd5e1, #94a3b8)",
            }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px]">
              <Avatar
                src={value || undefined}
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: "#f1f5f9",
                  color: "#94a3b8",
                }}
              >
                {!value && (
                  <AddPhotoAlternateIcon
                    sx={{ fontSize: 34, color: "#94a3b8" }}
                  />
                )}
              </Avatar>
            </div>
          </div>

          {/* Edit badge */}
          <div
            className="absolute bottom-0.5 right-0.5 w-7 h-7 rounded-full flex items-center justify-center
              shadow-md border-2 border-white transition-all group-hover:scale-110"
            style={{ background: "linear-gradient(135deg, #0d9488, #06b6d4)" }}
          >
            {value ? (
              <EditIcon sx={{ fontSize: 13, color: "#fff" }} />
            ) : (
              <PhotoCameraIcon sx={{ fontSize: 13, color: "#fff" }} />
            )}
          </div>

          {/* Hover overlay */}
          {/* <div
            className="absolute inset-[3px] rounded-full flex items-center justify-center
              opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ background: "rgba(13,148,136,0.18)" }}
          >
            <PhotoCameraIcon sx={{ fontSize: 22, color: "#fff" }} />
          </div> */}
        </div>
      </Tooltip>

      <div className="text-center">
        <p className="text-[12px] font-semibold text-slate-600 leading-tight">
          {label}
        </p>
        <p className="text-[10.5px] text-slate-400 mt-0.5">
          {value ? "Click to change" : "Click to upload"}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

/* ─── Signature Uploader ─────────────────────────────────────────────── */
function SignatureUploader({ value, onChange }) {
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <Tooltip title="Upload Signature" placement="top" arrow>
        <div
          onClick={() => inputRef.current.click()}
          className="relative cursor-pointer group"
        >
          {/* Main upload box */}
          <div
            className="w-[140px] h-[88px] rounded-[9px] flex flex-col items-center justify-center gap-1.5
              border-2 transition-all overflow-hidden"
            style={{
              borderColor: value ? "#0d9488" : "#cbd5e1",
              borderStyle: value ? "solid" : "dashed",
              background: value
                ? "#f0fdfa"
                : "linear-gradient(135deg, #f8fafc 60%, #f0fdfa)",
            }}
          >
            {value ? (
              <img
                src={value}
                alt="Signature"
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <>
                <DrawIcon sx={{ fontSize: 28, color: "#94a3b8" }} />
                <span className="text-[10px] font-medium text-slate-400 tracking-wide">
                  SIGNATURE
                </span>
              </>
            )}

            {/* Hover overlay */}
            {/* <div
              className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-1
                opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "rgba(13,148,136,0.12)" }}
            >
              <EditIcon sx={{ fontSize: 20, color: "#0d9488" }} />
              <span className="text-[10px] font-semibold text-teal-700">
                {value ? "Change" : "Upload"}
              </span>
            </div> */}
          </div>

          {/* Edit badge */}
          {value && (
            <div
              className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center
                shadow-md border-2 border-white"
              style={{
                background: "linear-gradient(135deg, #0d9488, #06b6d4)",
              }}
            >
              <EditIcon sx={{ fontSize: 11, color: "#fff" }} />
            </div>
          )}
        </div>
      </Tooltip>

      <div className="text-center">
        <p className="text-[12px] font-semibold text-slate-600 leading-tight">
          Signature
        </p>
        <p className="text-[10.5px] text-slate-400 mt-0.5">
          {value ? "Click to change" : "Click to upload"}
        </p>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

function SectionCard({ icon, title, children, action }) {
  return (
    <div className="bg-white rounded-[9px] border border-slate-200 shadow-sm mb-4 overflow-hidden">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-100 bg-slate-50/60">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-slate-200 text-teal-600 shadow-sm">
            {typeof icon === "string" ? (
              <span className="text-[15px]">{icon}</span>
            ) : (
              icon
            )}
          </div>
          <h2 className="font-semibold text-slate-700 text-[13px] sm:text-[13.5px] tracking-tight">
            {title}
          </h2>
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="px-4 sm:px-5 py-4">{children}</div>
    </div>
  );
}

export default function AddNewDoctors({ open, handleClose }) {
  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "qualifications",
  });

  const weekDays = watch("weekDays") || DEFAULT_VALUES.weekDays;

  const handleToggleDay = (day) => {
    const currentValues = { ...weekDays };

    if (day === "all") {
      const targetState = !currentValues.all;
      const nextWeekDays = { all: targetState };
      WEEK_DAYS.forEach((d) => (nextWeekDays[d] = targetState));
      setValue("weekDays", nextWeekDays, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      const targetState = !currentValues[day];
      const nextWeekDays = { ...currentValues, [day]: targetState };
      nextWeekDays.all = WEEK_DAYS.every((d) => nextWeekDays[d]);

      setValue("weekDays", nextWeekDays, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
    setTimeout(() => trigger("weekDays"), 0);
  };

  const handleAddQualification = async () => {
    if (fields.length === 0) {
      append({ degree: "", university: "", year: "" });
      return;
    }
    const lastIdx = fields.length - 1;
    const isValid = await trigger([
      `qualifications.${lastIdx}.degree`,
      `qualifications.${lastIdx}.university`,
      `qualifications.${lastIdx}.year`,
    ]);
    if (isValid) {
      append({ degree: "", university: "", year: "" });
    }
  };

  const handleReset = () => {
    reset(DEFAULT_VALUES);
    setPhotoPreview(null);
    setSignaturePreview(null);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", {
      ...data,
      photo: photoPreview,
      signature: signaturePreview,
    });
  };

  const weekDaysError = errors?.weekDays?.message;

  console.log("errors", errors);

  return (
    <Modal open={open}>
      <Box
        sx={ModalStyle}
        className="w-[95%] sm:w-[88%] lg:w-[78%] max-w-[900px] max-h-[92vh] rounded-2xl overflow-hidden flex flex-col"
      >
        <div className="bg-gradient-to-r from-teal-600 to-green-600 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-white font-bold text-[15px] sm:text-xl tracking-tight">
              Doctor Creation
            </h1>
            <p className="text-teal-100 text-[11px] mt-0.5">
              Fill in the details to register a new doctor
            </p>
          </div>
          <CancelButtonModal onClick={handleClose} />
        </div>

        <div className="overflow-y-auto flex-1 bg-slate-50 p-3 sm:p-5">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <SectionCard
              icon={<PersonIcon sx={{ fontSize: 18 }} />}
              title="Doctor Details"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-5 pb-5 border-b border-slate-100">
                <AvatarUploader
                  value={photoPreview}
                  onChange={setPhotoPreview}
                  label="Profile Photo"
                />
                <SignatureUploader
                  value={signaturePreview}
                  onChange={setSignaturePreview}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <InputField
                  control={control}
                  name="firstName"
                  error={errors.firstName}
                  label="First Name"
                />
                <InputField
                  control={control}
                  name="lastName"
                  error={errors.lastName}
                  label="Last Name"
                />
                <InputField
                  control={control}
                  name="email"
                  error={errors.email}
                  label="Email"
                  type="email"
                />
                <InputField
                  control={control}
                  name="contactNumber"
                  error={errors.contactNumber}
                  label="Contact Number"
                />
                <DatePickerField
                  control={control}
                  name="dob"
                  error={errors.dob}
                  label="Date of Birth"
                />
                <RadioField
                  control={control}
                  name="gender"
                  error={errors.gender}
                  label="Gender"
                  dataArray={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Other", value: "Other" },
                  ]}
                />
                <DropdownField
                  control={control}
                  name="specialization"
                  error={errors.specialization}
                  placeholder="Specialization *"
                  dataArray={SPECIALIZATION_OPTIONS}
                  isRequired
                />
                <InputField
                  control={control}
                  name="experianceInYear"
                  error={errors.experianceInYear}
                  label="Experience In Year"
                  type="number"
                />
                <InputField
                  control={control}
                  name="doctorRefferanceNo"
                  error={errors.doctorRefferanceNo}
                  label="Doctor Reference No"
                />
                <DropdownField
                  control={control}
                  name="department"
                  error={errors.department}
                  placeholder="Department *"
                  dataArray={DEPARTMENT_OPTIONS}
                  isRequired
                />
              </div>
            </SectionCard>

            <SectionCard
              icon={<LocationOnIcon sx={{ fontSize: 18 }} />}
              title="Contact & Address"
            >
              <div className="mb-3">
                <InputArea
                  control={control}
                  name="address"
                  error={errors.address}
                  label="Address"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <InputField
                  control={control}
                  name="country"
                  error={errors.country}
                  label="Country"
                />
                <InputField
                  control={control}
                  name="city"
                  error={errors.city}
                  label="City"
                />
                <InputField
                  control={control}
                  name="postalCode"
                  error={errors.postalCode}
                  label="Postal Code"
                />
              </div>
            </SectionCard>

            <SectionCard
              icon={<SchoolIcon sx={{ fontSize: 18 }} />}
              title="Qualifications"
              action={
                <button
                  type="button"
                  onClick={handleAddQualification}
                  className="flex items-center gap-1.5 text-teal-600 border border-dashed border-teal-400
                    rounded-lg px-3 py-1.5 text-[12px] font-semibold hover:bg-teal-50 transition-colors"
                >
                  <span className="text-base leading-none">+</span>
                  Add Qualification
                </button>
              }
            >
              {fields.length === 0 ? (
                <p className="text-center text-slate-400 text-[13px] py-6">
                  No qualifications added yet. Click &ldquo;+ Add
                  Qualification&rdquo; to begin.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {fields.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_120px_36px] gap-2.5 items-start
                        bg-slate-50 p-3 rounded-xl border border-slate-100"
                    >
                      <InputField
                        control={control}
                        name={`qualifications.${index}.degree`}
                        error={errors.qualifications?.[index]?.degree}
                        label="Degree"
                      />
                      <InputField
                        control={control}
                        name={`qualifications.${index}.university`}
                        error={errors.qualifications?.[index]?.university}
                        label="University"
                      />
                      <InputField
                        control={control}
                        name={`qualifications.${index}.year`}
                        error={errors.qualifications?.[index]?.year}
                        label="Year"
                        type="number"
                      />
                      <IconButton
                        type="button"
                        onClick={() => remove(index)}
                        size="small"
                        sx={{
                          alignSelf: "flex-end",
                          mb: "2px",
                          color: "#f43f5e",
                          border: "1px solid #fecaca",
                          borderRadius: "8px",
                          width: 36,
                          height: 36,
                          flexShrink: 0,
                          "&:hover": {
                            background: "#fff1f2",
                            borderColor: "#f43f5e",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard
              icon={<EventNoteIcon sx={{ fontSize: 18 }} />}
              title="Doctor Session"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <DropdownField
                  control={control}
                  name="timeSlot"
                  error={errors.timeSlot}
                  placeholder="Time Slot (min)"
                />
                <DropdownField
                  control={control}
                  name="slotCount"
                  error={errors.slotCount}
                  placeholder="Slot Count"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-50/40 border border-blue-100">
                  <p className="text-[11.5px] font-bold text-blue-800 mb-3 flex items-center gap-1.5">
                    Morning Session
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <TimePickerField
                      control={control}
                      name="morningStartTime"
                      label="Start Time"
                      error={errors.morningStartTime}
                    />
                    <TimePickerField
                      control={control}
                      name="morningEndTime"
                      label="End Time"
                      error={errors.morningEndTime}
                    />
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-orange-50/40 border border-orange-100">
                  <p className="text-[11.5px] font-bold text-orange-800 mb-3 flex items-center gap-1.5">
                    Evening Session
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <TimePickerField
                      control={control}
                      name="eveningStartTime"
                      label="Start Time"
                      error={errors.eveningStartTime}
                    />
                    <TimePickerField
                      control={control}
                      name="eveningEndTime"
                      label="End Time"
                      error={errors.eveningEndTime}
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Week Days <span className="text-red-500">*</span>
                </p>
                <div
                  className={`flex flex-wrap gap-2 p-3 rounded-xl bg-slate-50 border transition-colors ${
                    weekDaysError
                      ? "border-red-400 bg-red-50/30"
                      : "border-slate-200"
                  }`}
                >
                  {["all", ...WEEK_DAYS].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleToggleDay(day)}
                      className={`px-3 py-1.5 rounded-[9px] text-[11.5px] font-semibold border transition-all
                        flex items-center gap-1 select-none ${
                          weekDays?.[day]
                            ? day === "all"
                              ? "bg-slate-700 border-slate-700 text-white shadow-sm"
                              : "bg-teal-500 border-teal-500 text-white shadow-sm"
                            : "bg-white border-slate-200 text-slate-500 hover:border-teal-400 hover:text-teal-600"
                        }`}
                    >
                      {weekDays?.[day] && (
                        <span className="text-[9px] font-bold">✓</span>
                      )}
                      {DAY_LABELS[day]}
                    </button>
                  ))}
                </div>
                {weekDaysError && (
                  <p className="text-red-500 text-[11px] mt-1.5 flex items-center gap-1">
                    <span>⚠</span> {weekDaysError}
                  </p>
                )}
              </div>
            </SectionCard>

            <div
              className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 pt-3 pb-1
                border-t border-slate-200 sticky bottom-0 bg-slate-50 z-10"
            >
              <CommonButton
                label="Reset"
                onClick={handleReset}
                type="button"
                className="border border-red-300 text-red-600 hover:bg-red-50 transition-colors "
              />
              <CommonButton
                label="Save Doctor"
                type="submit"
                className="bg-gradient-to-r from-lime-600 to-green-600 text-white shadow-md
                  hover:from-lime-700 hover:to-green-700 transition-all"
              />
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
}
