import { yupResolver } from "@hookform/resolvers/yup";
import {
  Assignment,
  CalendarMonth,
  Check,
  Close as CloseIcon,
  Description,
  MedicalServices,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  Modal,
  TextField,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CommonButton from "../../../common/button/CommonButton";
import CheckBoxField from "../../../common/formFields/CheckBoxField";
import DropdownField from "../../../common/formFields/DropdownField";
import InputArea from "../../../common/formFields/InputArea";
import InputField from "../../../common/formFields/InputField";
import SearchDropdown from "../../../common/formFields/SearchDropdown";
import TimePickerField from "../../../common/formFields/TimePickerField";
import DatePickerField from "../../../common/formFields/DatePickerField";

const schema = yup.object().shape({
  diseaseAllotted: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("required"),
      label: yup.string().required("required"),
    })
    .required("Required"),
  serviceName: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("required"),
      label: yup.string().required("required"),
    })
    .required("Required"),

  localName: yup.string().trim(),
  slogan: yup.string().trim(),
  uses: yup.string().trim(),
  description: yup.string().trim(),
  advisedBy: yup
    .object()
    .nullable()
    .shape({
      value: yup.string().required("required"),
      label: yup.string().required("required"),
    })
    .required("Required"),
  physicianName: yup.string().nullable(),
  advisedByPhysician: yup.string().nullable(),
  advisedByAttendant: yup.string().nullable(),
  advisedByMember: yup.string().nullable(),
  refferedByOPD: yup.string().nullable(),
  swagramaCommunity: yup.string().nullable(),

  // Step 2 - Schedule
  stayType: yup.string().oneOf(["opd", "wellness"], "Invalid stay type"),
  singleRoom: yup.string().nullable(),
  doubleRoom: yup.string().nullable(),
  roomType: yup.string().when("stayType", {
    is: (val) => val === "wellness",
    then: (schema) => schema.required("Room type is required for wellness"),
    otherwise: (schema) => schema.nullable(),
  }),
  wing: yup.string().nullable(),
  therapist: yup.string().nullable(),
  days: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .positive("Days must be a positive number")
    .integer("Days must be a whole number")
    .nullable(),
  time: yup.string().nullable(),
  duration: yup.string().nullable(),
  fromDate: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  dateTo: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .min(yup.ref("fromDate"), "End date must be after start date"),

  // Step 3 - Medical & Financial
  valuePerTherapy: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .positive("Value must be positive")
    .nullable(),
  total: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .positive("Total must be positive")
    .nullable(),
  advance: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .positive("Advance must be positive")
    .nullable(),
  balance: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .min(0, "Balance cannot be negative")
    .nullable(),
  ecg: yup.string().trim(),
  otherInvestigations: yup.string().trim(),
  lmpDate: yup
    .date()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value)),
  consentOPD: yup.boolean(),
  consentIPD: yup.boolean(),
  consentPanchakarma: yup.boolean(),
  roomPlace: yup.array().of(yup.string()).nullable(),

  // Step 4 - Procedures
  patientPreparationCompleted: yup.boolean(),
  therapyPreparationCompleted: yup.boolean(),
  patientPreparation: yup.string().trim(),
  instrumentsMaterial: yup.string().trim(),
  medicine: yup.string().trim(),
  dose: yup.string().trim(),
  quantity: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .positive("Quantity must be positive")
    .nullable(),
  prerequisite: yup.string().trim(),
  mainProcedure: yup.string().trim(),
  postProcedural: yup.string().trim(),
  instructionsPatient: yup.string().trim(),
  instructionsRelatives: yup.string().trim(),
  instructionsTherapist: yup.string().trim(),
  cautiousness: yup.string().trim(),
  contraindicated: yup.string().trim(),
  disorders: yup.string().trim(),
});

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  width: { xs: "95%", sm: "90%", md: "85%", lg: "80%", xl: "75%" },
  maxHeight: { xs: "95vh", sm: "94vh" },
  outline: "none",
  display: "flex",
  flexDirection: "column",
};

const TherapyForm = ({ open, handleClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: "Basic Information", icon: Description },
    { label: "Schedule", icon: CalendarMonth },
    { label: "Medical & Financial", icon: MedicalServices },
    { label: "Procedures", icon: Assignment },
  ];

  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      diseaseAllotted: "",
      serviceName: "",
      localName: "",
      slogan: "",
      uses: "",
      description: "",
      advisedBy: null,
      physicianName: null,
      advisedByPhysician: null,
      advisedByAttendant: null,
      advisedByMember: null,
      stayType: "opd",
      refferedByOPD: null,
      swagramaCommunity: null,
      singleRoom: null,
      doubleRoom: null,
      roomType: null,
      wing: "",
      therapist: null,
      days: "",
      time: "",
      duration: "",
      fromDate: null,
      toDate: null,
      valuePerTherapy: "",
      total: "",
      advance: "",
      balance: "",
      ecg: "",
      otherInvestigations: "",
      lmpDate: null,
      consentOPD: false,
      consentIPD: false,
      consentPanchakarma: false,
      roomPlace: [],
      patientPreparationCompleted: false,
      therapyPreparationCompleted: false,
      patientPreparation: "",
      instrumentsMaterial: "",
      medicine: "",
      dose: "",
      quantity: "",
      prerequisite: "",
      mainProcedure: "",
      postProcedural: "",
      instructionsPatient: "",
      instructionsRelatives: "",
      instructionsTherapist: "",
      cautiousness: "",
      contraindicated: "",
      disorders: "",
    },
    mode: "onChange",
  });

  const stayType = watch("stayType");

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Form submitted successfully! Check console for data.");
    handleClose();
  };

  const validateStep = async () => {
    let fieldsToValidate = [];

    switch (currentStep) {
      case 0:
        fieldsToValidate = ["diseaseAllotted", "serviceName"];
        break;
      case 1:
        fieldsToValidate = ["stayType"];
        if (stayType === "wellness") {
          fieldsToValidate.push("roomType");
        }
        break;
      case 2:
        fieldsToValidate = [
          "valuePerTherapy",
          "total",
          "advance",
          "balance",
          "lmpDate",
        ];
        break;
      case 3:
        fieldsToValidate = ["quantity"];
        break;
      default:
        fieldsToValidate = [];
    }

    const result = await trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="therapy-form-modal"
    >
      <Box sx={modalStyle}>
        <div className="bg-gradient-to-r from-lime-600 via-emerald-600 to-green-600 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-lg flex-shrink-0">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Services / Therapy
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="!text-white border border-white rounded-full h-6 w-6 text-center flex justify-center items-center hover:bg-white/20 transition"
            aria-label="Close"
          >
            <CloseIcon className="!text-base sm:!text-xl" />
          </button>
        </div>
        <div className="bg-white px-3 sm:px-6 py-3 sm:py-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between relative">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center flex-1 relative"
                >
                  <div
                    className={`
                    w-8 h-8 sm:w-10 sm:h-10  rounded-full flex items-center justify-center transition-all duration-300 z-10
                    ${isActive ? "bg-gradient-to-br from-lime-600 to-emerald-600 shadow-lg scale-110" : ""}
                    ${isCompleted ? "bg-gradient-to-br from-green-500 to-emerald-600" : ""}
                    ${!isActive && !isCompleted ? "bg-gray-200" : ""}
                  `}
                  >
                    {isCompleted ? (
                      <Check className="!text-white !text-sm sm:!text-base md:!text-xl" />
                    ) : (
                      <StepIcon
                        className={`!text-sm sm:!text-base md:!text-xl ${
                          isActive || isCompleted
                            ? "!text-white"
                            : "!text-gray-500"
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`
                    text-[10px] sm:text-xs font-medium mt-1 sm:mt-2 text-center hidden sm:block
                    ${isActive ? "text-teal-700" : ""}
                    ${isCompleted ? "text-green-600" : ""}
                    ${!isActive && !isCompleted ? "text-gray-500" : ""}
                  `}
                  >
                    {step.label}
                  </span>

                  {index < steps.length - 1 && (
                    <div
                      className={`
                      absolute left-1/2 top-4 sm:top-4 md:top-5 w-full h-0.5 -z-0
                      ${isCompleted ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gray-200"}
                    `}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto px-3 sm:px-6 py-3 sm:py-4"
        >
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <SearchDropdown
                    control={control}
                    placeholder="Disease Diagnosis *"
                    name="diseaseAllotted"
                    searchIcon={true}
                    isClearable={true}
                    dataArray={[]}
                    handleInputChange={(e) => {
                      console.log("searchDiagnosis", e);
                    }}
                    error={errors.diseaseAllotted}
                  />
                  <DropdownField
                    control={control}
                    placeholder="Service / Therapy Name *"
                    name="serviceName"
                    dataArray={[]}
                    error={errors.serviceName}
                  />
                  <InputField
                    control={control}
                    label="Local Name"
                    name="localName"
                    error={errors.localName}
                  />
                  <InputField
                    control={control}
                    label="Slogan"
                    name="slogan"
                    error={errors.slogan}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <InputArea
                    control={control}
                    label="Uses"
                    name="uses"
                    error={errors.uses}
                  />
                  <InputArea
                    control={control}
                    label="Description"
                    name="description"
                    error={errors.description}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <DropdownField
                    control={control}
                    placeholder="Advised By"
                    isClearable={true}
                    name="advisedBy"
                    menuPlacement={"top"}
                    dataArray={[
                      {
                        id: "physician",
                        label: "Physician",
                        value: "physician",
                      },
                      {
                        id: "attendant",
                        label: "Attendant",
                        value: "attendant",
                      },
                      { id: "member", label: "Member", value: "member" },
                    ]}
                    error={errors.advisedBy}
                  />
                  <DropdownField
                    control={control}
                    name="refferedByOPD"
                    placeholder="Referred By"
                    menuPlacement={"top"}
                    dataArray={[
                      {
                        id: "ayurvijnanaChikitsalaya",
                        value: "ayurvijnanaChikitsalaya",
                        label: "Ayurvijnana Chikitsalaya",
                      },
                      {
                        id: "ayurvijnanaYogaChikitsalaya",
                        value: "ayurvijnanaYogaChikitsalaya",
                        label: "Ayurvijnana Yoga Chikitsalaya",
                      },
                      {
                        id: "sukhina",
                        value: "sukhina",
                        label: "Sukhina",
                      },
                      {
                        id: "other",
                        value: "other",
                        label: "Other",
                      },
                    ]}
                    error={errors.refferedByOPD}
                  />
                  <DropdownField
                    control={control}
                    name="swagramaCommunity"
                    placeholder="Swagrama Community"
                    menuPlacement={"top"}
                    dataArray={[
                      {
                        id: "ayurvedaOPDClinic",
                        value: "ayurvedaOPDClinic",
                        label: "स्वआयुर्वेदचिचित्सालय Ayurveda OPD Clinic",
                      },
                      {
                        id: "yogaOPDClinic",
                        value: "yogaOPDClinic",
                        label: "स्वयोगचिचित्सालय Yoga OPD Clinic",
                      },
                      {
                        id: "homoeopathyOPDClinic",
                        value: "homoeopathyOPDClinic",
                        label: "स्वसमचिचित्सालय Homoeopathy OPD Clinic",
                      },
                    ]}
                    error={errors.swagramaCommunity}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <DropdownField
                    control={control}
                    name="singleRoom"
                    placeholder="Single Room"
                    dataArray={[
                      {
                        id: 1,
                        value: "स्वामुक्तकक्षEternityRoom",
                        label: "स्वामुक्तकक्ष Eternity Room",
                      },
                      {
                        id: 2,
                        value: "स्वनित्यकक्षEternalRoom",
                        label: "स्वनित्यकक्ष Eternal Room",
                      },
                      {
                        id: 3,
                        value: "स्वशाश्वतकक्षPerpetualRoom",
                        label: "स्वशाश्वतकक्ष Perpetual Room",
                      },
                      {
                        id: 4,
                        value: "स्वलौकिककक्षFirmnessRoom",
                        label: "स्वलौकिककक्ष Firmness Room",
                      },
                      {
                        id: 5,
                        value: "स्वअनन्तकक्षInfiniteRoom",
                        label: "स्वअनन्तकक्ष Infinite Room",
                      },
                      {
                        id: 6,
                        value: "स्वसुखकुपजWellHouse",
                        label: "स्वसुखकुपज Well House",
                      },
                    ]}
                    error={errors.singleRoom}
                  />
                  <DropdownField
                    control={control}
                    name="doubleRoom"
                    placeholder="Double Room"
                    dataArray={[
                      {
                        id: 1,
                        value: "स्वामुक्तकक्षEternityRoom",
                        label: "स्वामुक्तकक्ष Eternity Room",
                      },
                      {
                        id: 2,
                        value: "स्वनित्यकक्षEternalRoom",
                        label: "स्वनित्यकक्ष Eternal Room",
                      },
                      {
                        id: 3,
                        value: "स्वशाश्वतकक्षPerpetualRoom",
                        label: "स्वशाश्वतकक्ष Perpetual Room",
                      },
                      {
                        id: 4,
                        value: "स्वलौकिककक्षFirmnessRoom",
                        label: "स्वलौकिककक्ष Firmness Room",
                      },
                      {
                        id: 5,
                        value: "स्वअनन्तकक्षInfiniteRoom",
                        label: "स्वअनन्तकक्ष Infinite Room",
                      },
                      {
                        id: 6,
                        value: "स्वसुखकुपजWellHouse",
                        label: "स्वसुखकुपज Well House",
                      },
                    ]}
                    error={errors.doubleRoom}
                  />
                  <SearchDropdown
                    name="therapist"
                    control={control}
                    placeholder="Therapist"
                    dataArray={[]}
                    handleInputChange={(e) => {
                      console.log("therapist", e);
                    }}
                    error={errors.therapist}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  <InputField
                    control={control}
                    name="days"
                    size="small"
                    label="Days"
                    type="number"
                    error={errors.days}
                  />
                  <TimePickerField
                    control={control}
                    name="time"
                    label="Time"
                    error={errors.time}
                    format24hr={true}
                  />
                  <InputField
                    control={control}
                    name="duration"
                    label="Duration"
                    placeholder="e.g., 60 min"
                    error={errors.duration}
                  />
                  <DatePickerField
                    control={control}
                    name="fromDate"
                    label="From Date"
                    error={errors.fromDate}
                    disablePast={true}
                    inputFormat={"dd-MM-yyyy"}
                  />
                  <DatePickerField
                    control={control}
                    name="toDate"
                    label="To Date"
                    error={errors.toDate}
                    disablePast={true}
                    inputFormat={"dd-MM-yyyy"}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 my-3 sm:my-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <Chip
                    label="Physical Fitness"
                    size="small"
                    className="!bg-gradient-to-r !from-lime-500 !to-emerald-500 !text-white !font-medium !text-xs sm:!text-sm"
                  />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <InputField
                    control={control}
                    label="ECG"
                    name="ecg"
                    error={errors.ecg}
                  />
                  <InputField
                    control={control}
                    label="Other Investigations"
                    name="otherInvestigations"
                    error={errors.otherInvestigations}
                  />

                  <DatePickerField
                    control={control}
                    name="lmpDate"
                    label="LMP Date"
                    error={errors.lmpDate}
                    disablePast={true}
                    inputFormat={"dd-MM-yyyy"}
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-3 my-3 sm:my-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <Chip
                    label="Consent"
                    size="small"
                    className="!bg-gradient-to-r !from-green-500 !to-emerald-500 !text-white !font-medium !text-xs sm:!text-sm"
                  />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>
                <div className="gap-2 sm:gap-4 flex flex-wrap w-full">
                  <div>
                    <CheckBoxField
                      control={control}
                      name={"consentOPD"}
                      label={"OPD"}
                    />
                  </div>
                   <div>
                    <CheckBoxField
                      control={control}
                      name={"consentIPD"}
                      label={"IPD"}
                    />
                  </div>
                   <div>
                    <CheckBoxField
                      control={control}
                      name={"consentPanchakarma"}
                      label={"Panchakarma"}
                    />
                  </div>
                </div>
              

                <div className="flex items-center gap-2 sm:gap-3 my-3 sm:my-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <Chip
                    label="Room/Place Selection"
                    size="small"
                    className="!bg-gradient-to-r !from-emerald-500 !to-lime-500 !text-white !font-medium !text-xs sm:!text-sm"
                  />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>

                <div>
                  <DropdownField
                    control={control}
                    name="roomPlace"
                    placeholder="Room/Place Selection"
                    menuPlacement={"top"}
                    dataArray={[
                      { id: 1, value: "Detox Room 1", label: "Detox Room 1" },
                      { id: 2, value: "Detox Room 2", label: "Detox Room 2" },
                      {
                        id: 3,
                        value: "Local Detox Room",
                        label: "Local Detox Room",
                      },
                      { id: 4, value: "Beauty Room", label: "Beauty Room" },
                      {
                        id: 5,
                        value: "Bathing Sweater Room",
                        label: "Bathing Sweater Room",
                      },
                      {
                        id: 6,
                        value: "Male Mud Bathroom",
                        label: "Male Mud Bathroom",
                      },
                      {
                        id: 7,
                        value: "Female Mud BathRoom",
                        label: "Female Mud BathRoom",
                      },
                      {
                        id: 8,
                        value: "Swimming Therapy Well",
                        label: "Swimming Therapy Well",
                      },
                      {
                        id: 9,
                        value: "Wind Sun Rejuvenation Land",
                        label: "Wind Sun Rejuvenation Land",
                      },
                      {
                        id: 10,
                        value: "Athletic Therapy Land",
                        label: "Athletic Therapy Land",
                      },
                      {
                        id: 11,
                        value: "Fertile Soil Therapy Land",
                        label: "Fertile Soil Therapy Land",
                      },
                      { id: 12, value: "Yoga Hall", label: "Yoga Hall" },
                      { id: 13, value: "Yoga Room", label: "Yoga Room" },
                    ]}
                    error={errors.roomPlace}
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 sm:gap-3 my-3">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <Chip
                    label="Preparation Checklist"
                    size="small"
                    className="!bg-gradient-to-r !from-teal-500 !to-emerald-500 !text-white !font-medium !text-xs sm:!text-sm"
                  />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>

                <div className="grid gap-2 sm:gap-3 md:gap-0 md:flex md:flex-wrap md:space-x-3 lg:space-x-5 pb-3 sm:pb-4">
                  <CheckBoxField
                    control={control}
                    name="patientPreparationCompleted"
                    label="Patient Preparation Completed"
                  />
                  <CheckBoxField
                    control={control}
                    name="therapyPreparationCompleted"
                    label="Therapy Preparation Completed"
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <Chip
                    label="Preparation"
                    size="small"
                    className="!bg-gradient-to-r !from-teal-500 !to-emerald-500 !text-white !font-medium !text-xs sm:!text-sm"
                  />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>

                <div>
                  <InputArea
                    control={control}
                    name="patientPreparation"
                    label="Patient Preparation"
                    minRows={2}
                    maxRows={4}
                    error={errors.patientPreparation}
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-3 my-3">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <Chip
                    label="Therapy Preparation"
                    size="small"
                    className="!bg-gradient-to-r !from-teal-500 !to-emerald-500 !text-white !font-medium !text-xs sm:!text-sm"
                  />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 my-2">
                  <InputField
                    control={control}
                    label="Instruments Material"
                    name="instrumentsMaterial"
                    error={errors.instrumentsMaterial}
                  />
                  <InputField
                    control={control}
                    label="Medicine"
                    name="medicine"
                    error={errors.medicine}
                  />
                  <InputField
                    control={control}
                    name="dose"
                    label="Dose"
                    error={errors.dose}
                  />
                  <InputField
                    control={control}
                    name="quantity"
                    label="Quantity"
                    type="number"
                    error={errors.quantity}
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-3 my-3 sm:my-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <Chip
                    label="Procedure"
                    size="small"
                    className="!bg-gradient-to-r !from-lime-500 !to-emerald-500 !text-white !font-medium !text-xs sm:!text-sm"
                  />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <InputArea
                    control={control}
                    name="prerequisite"
                    label="Prerequisite"
                    minRows={2}
                    maxRows={4}
                    error={errors.prerequisite}
                  />
                  <InputArea
                    control={control}
                    name="mainProcedure"
                    label="Main Procedure"
                    minRows={2}
                    maxRows={4}
                    error={errors.mainProcedure}
                  />
                  <InputArea
                    control={control}
                    name="postProcedural"
                    label="Post Procedural"
                    minRows={2}
                    maxRows={4}
                    error={errors.postProcedural}
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-3 my-3 sm:my-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <Chip
                    label="Instructions"
                    size="small"
                    className="!bg-gradient-to-r !from-green-500 !to-lime-500 !text-white !font-medium !text-xs sm:!text-sm"
                  />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <InputArea
                    control={control}
                    name="instructionsPatient"
                    label="For Patient"
                    minRows={2}
                    maxRows={4}
                    error={errors.instructionsPatient}
                  />
                  <InputArea
                    control={control}
                    name="instructionsRelatives"
                    label="For Relatives"
                    minRows={2}
                    maxRows={4}
                    error={errors.instructionsRelatives}
                  />
                  <InputArea
                    control={control}
                    name="instructionsTherapist"
                    label="For Therapist"
                    minRows={2}
                    maxRows={4}
                    error={errors.instructionsTherapist}
                  />
                </div>

                <div className="flex items-center gap-2 sm:gap-3 my-3 sm:my-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <Chip
                    label="Safety Information"
                    size="small"
                    className="!bg-gradient-to-r !from-green-500 !to-emerald-500 !text-white !font-medium !text-xs sm:!text-sm"
                  />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
                  <InputArea
                    control={control}
                    name="cautiousness"
                    label="Cautiousness"
                    minRows={2}
                    maxRows={4}
                    error={errors.cautiousness}
                  />
                  <InputArea
                    control={control}
                    name="contraindicated"
                    label="Contraindicated"
                    minRows={2}
                    maxRows={4}
                    error={errors.contraindicated}
                  />
                  <InputArea
                    control={control}
                    name="disorders"
                    label="Disorders"
                    minRows={2}
                    maxRows={4}
                    error={errors.disorders}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>
        <div className="border-t border-gray-200 px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between bg-gray-50 rounded-b-lg flex-shrink-0">
          <CommonButton
            onClick={handleBack}
            disabled={currentStep === 0}
            label={
              <span className="flex items-center gap-1 text-xs sm:text-sm">
                <NavigateBefore className="!text-base sm:!text-xl" />
                <span className="hidden sm:inline">Back</span>
                <span className="sm:hidden">Back</span>
              </span>
            }
            className="border border-ayuMid text-ayuMid"
          />

          {currentStep < steps.length - 1 ? (
            <CommonButton
              onClick={handleNext}
              label={
                <span className="flex items-center gap-1 text-xs sm:text-sm">
                  <span className="hidden sm:inline">Next</span>
                  <span className="sm:hidden">Next</span>
                  <NavigateNext className="!text-base sm:!text-xl" />
                </span>
              }
              size="small"
              className="!bg-gradient-to-r !from-lime-600 !to-emerald-600 hover:!from-lime-700 hover:!to-green-700 text-white !shadow-md"
            />
          ) : (
            <CommonButton
              type="submit"
              onClick={handleSubmit(onSubmit)}
              label={
                <span className="flex items-center gap-1 text-xs sm:text-sm">
                  Submit
                </span>
              }
              className="!bg-gradient-to-r !from-green-600 !to-emerald-600 hover:!from-green-700 hover:!to-emerald-700 text-white !shadow-md"
            />
          )}
        </div>
      </Box>
    </Modal>
  );
};
export default TherapyForm;
