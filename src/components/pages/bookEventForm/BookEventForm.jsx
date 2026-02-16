// import { yupResolver } from "@hookform/resolvers/yup";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
// import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import EventNoteIcon from "@mui/icons-material/EventNote";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import {
//   Box,
//   Divider,
//   IconButton,
//   Modal,
//   Step,
//   StepLabel,
//   Stepper,
//   StepConnector,
//   stepConnectorClasses,
//   Chip,
//   Paper,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { AnimatePresence, motion } from "framer-motion";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import CancelButtonModal from "../../common/button/CancelButtonModal";
// import CommonButton from "../../common/button/CommonButton";
// import CheckBoxField from "../../common/formFields/CheckBoxField";
// import DropdownField from "../../common/formFields/DropdownField";
// import InputField from "../../common/formFields/InputField";
// import RadioField from "../../common/formFields/RadioField";
// import { bookingValidationSchema } from "./bookingValidationSchema";

// const PremiumConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 16,
//     left: "calc(-50% + 18px)",
//     right: "calc(50% + 18px)",
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
//       boxShadow: "0 2px 6px rgba(16, 185, 129, 0.3)",
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 2,
//     border: 0,
//     backgroundColor: "#e5e7eb",
//     borderRadius: 1,
//     transition: "all 0.4s ease-in-out",
//   },
// }));

// const PremiumStepIconRoot = styled("div")(({ theme, ownerState }) => ({
//   backgroundColor:
//     ownerState.completed || ownerState.active ? "#10b981" : "#e5e7eb",
//   zIndex: 1,
//   color: "#fff",
//   width: 36,
//   height: 36,
//   display: "flex",
//   borderRadius: "50%",
//   justifyContent: "center",
//   alignItems: "center",
//   transition: "all 0.3s ease-in-out",
//   boxShadow: ownerState.active ? "0 2px 12px rgba(16, 185, 129, 0.4)" : "none",
//   border: ownerState.active ? "2px solid #d1fae5" : "none",
//   transform: ownerState.active ? "scale(1.05)" : "scale(1)",
//   ...(ownerState.completed && {
//     background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//   }),
//   ...(ownerState.active && {
//     background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//     animation: "pulse 2s ease-in-out infinite",
//   }),
//   "@keyframes pulse": {
//     "0%, 100%": {
//       boxShadow: "0 2px 12px rgba(16, 185, 129, 0.4)",
//     },
//     "50%": {
//       boxShadow: "0 2px 18px rgba(16, 185, 129, 0.6)",
//     },
//   },
// }));

// function PremiumStepIcon(props) {
//   const { active, completed, className, icon } = props;

//   const icons = {
//     1: <PersonOutlineIcon fontSize="small" />,
//     2: <PersonAddIcon fontSize="small" />,
//     3: <PhoneOutlinedIcon fontSize="small" />,
//     4: <CheckCircleOutlineIcon fontSize="small" />,
//   };

//   return (
//     <PremiumStepIconRoot
//       ownerState={{ completed, active }}
//       className={className}
//     >
//       {completed ? (
//         <CheckCircleOutlineIcon fontSize="small" />
//       ) : (
//         icons[String(icon)]
//       )}
//     </PremiumStepIconRoot>
//   );
// }

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   bgcolor: "background.paper",
//   boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
//   outline: "none",
//   borderRadius: "24px",
// };

// const steps = [
//   "Primary Guest",
//   "Add Guests",
//   "Contact Information",
//   "Review & Confirm",
// ];

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.1,
//     },
//   },
//   exit: {
//     opacity: 0,
//     transition: { duration: 0.2 },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
//   },
// };

// const slideVariants = {
//   enter: (direction) => ({
//     x: direction > 0 ? 1000 : -1000,
//     opacity: 0,
//     scale: 0.8,
//   }),
//   center: {
//     x: 0,
//     opacity: 1,
//     scale: 1,
//     transition: {
//       x: { type: "spring", stiffness: 300, damping: 30 },
//       opacity: { duration: 0.3 },
//       scale: { duration: 0.3 },
//     },
//   },
//   exit: (direction) => ({
//     x: direction > 0 ? -1000 : 1000,
//     opacity: 0,
//     scale: 0.8,
//     transition: {
//       x: { type: "spring", stiffness: 300, damping: 30 },
//       opacity: { duration: 0.2 },
//       scale: { duration: 0.2 },
//     },
//   }),
// };

// const guestCardVariants = {
//   hidden: { opacity: 0, scale: 0.8, y: 30 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 300,
//       damping: 24,
//     },
//   },
//   exit: {
//     opacity: 0,
//     scale: 0.8,
//     x: -100,
//     transition: {
//       duration: 0.2,
//     },
//   },
// };

// const headerVariants = {
//   hidden: { y: -50, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring",
//       stiffness: 100,
//       damping: 15,
//     },
//   },
// };

// const buttonHoverVariants = {
//   rest: { scale: 1 },
//   hover: {
//     scale: 1.05,
//     transition: {
//       duration: 0.2,
//       ease: "easeInOut",
//     },
//   },
//   tap: { scale: 0.95 },
// };

// export default function BookEventForm({ open, handleClose, eventDetails }) {
//   const [activeStep, setActiveStep] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const [formData, setFormData] = useState(null);
//   const [additionalGuests, setAdditionalGuests] = useState([]);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     trigger,
//     reset,
//     getValues,
//     setError,
//     clearErrors,
//   } = useForm({
//     mode: "onChange",
//     resolver: yupResolver(bookingValidationSchema[activeStep]),
//     defaultValues: {
//       bookingFor: "1",
//       title: { value: "Mr", label: "Mr" },
//       guestTitle: { value: "Mr", label: "Mr" },
//       firstName: "",
//       guestFirstName: "",
//       lastName: "",
//       guestLastName: "",
//       email: "",
//       countryCode: { value: "+91", label: "+91" },
//       mobileNumber: "",
//       specialRequests: "",
//       gstDetails: "",
//       isBelow12: false,
//     },
//   });

//   const handleNext = async () => {
//     const isValid = await trigger();
//     if (isValid) {
//       const currentData = getValues();
//       setFormData({ ...formData, ...currentData });
//       setDirection(1);
//       setActiveStep((prevStep) => prevStep + 1);
//     }
//   };

//   const handleBack = () => {
//     setDirection(-1);
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   const handleAddGuest = () => {
//     const [guestTitle, guestFirstName, guestLastName] = getValues([
//       "guestTitle",
//       "guestFirstName",
//       "guestLastName",
//     ]);

//     let hasError = false;

//     if (!guestTitle) {
//       setError("guestTitle", {
//         type: "manual",
//         message: "Title is required",
//       });
//       hasError = true;
//     } else {
//       clearErrors("guestTitle");
//     }

//     if (!guestFirstName) {
//       setError("guestFirstName", {
//         type: "manual",
//         message: "First name is required",
//       });
//       hasError = true;
//     } else {
//       clearErrors("guestFirstName");
//     }

//     if (!guestLastName) {
//       setError("guestLastName", {
//         type: "manual",
//         message: "Last name is required",
//       });
//       hasError = true;
//     } else {
//       clearErrors("guestLastName");
//     }

//     if (hasError) return;

//     const newGuest = {
//       id: Date.now(),
//       guestTitle: guestTitle?.label ?? "",
//       guestFirstName,
//       guestLastName,
//       isBelow12: getValues("isBelow12"),
//     };

//     setAdditionalGuests((prev) => [...prev, newGuest]);

//     reset({
//       ...getValues(),
//       guestTitle: { value: "Mr", label: "Mr" },
//       guestFirstName: "",
//       guestLastName: "",
//       isBelow12: false,
//     });

//     clearErrors(["guestTitle", "guestFirstName", "guestLastName"]);
//   };

//   const handleRemoveGuest = (guestId) => {
//     setAdditionalGuests(
//       additionalGuests.filter((guest) => guest.id !== guestId)
//     );
//   };

//   const onSubmit = (data) => {
//     const finalData = {
//       ...formData,
//       ...data,
//       additionalGuests: additionalGuests,
//       totalGuests: additionalGuests.length + 1,
//     };
//     console.log("Final Booking Data:", finalData);
//     handleClose();
//     reset();
//     setActiveStep(0);
//     setFormData(null);
//     setAdditionalGuests([]);
//   };

//   const handleModalClose = () => {
//     handleClose();
//     reset();
//     setActiveStep(0);
//     setFormData(null);
//     setAdditionalGuests([]);
//   };

//   return (
//     <Modal
//       open={open}
//       aria-labelledby="booking-modal-title"
//       onClose={handleModalClose}
//       aria-describedby="booking-modal-description"
//       closeAfterTransition
//     >
//       <Box
//         sx={style}
//         className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] 2xl:w-[55%] max-h-[95vh] overflow-y-auto"
//       >
//         <div className="flex items-center justify-between mb-4 w-full">
//           <motion.div
//             variants={headerVariants}
//             animate="visible"
//             className="relative bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 p-4 w-full"
//           >
//             <div className="relative z-10">
//               <motion.div
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="flex items-center gap-2"
//               >
//                 <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg">
//                   <EventNoteIcon className="text-white text-xl" />
//                 </div>
//                 <div>
//                   <h1 className="font-bold text-lg md:text-xl text-white drop-shadow-lg">
//                     Book Service
//                   </h1>
//                   <p className="text-xs sm:text-sm text-white/95 font-medium">
//                     {eventDetails?.name || "Complete the booking process"}
//                   </p>
//                 </div>
//               </motion.div>
//             </div>
//             <div className="z-20">
//               <CancelButtonModal onClick={handleModalClose} />
//             </div>
//           </motion.div>
//         </div>
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9, y: 50 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.9, y: 50 }}
//           transition={{
//             type: "spring",
//             stiffness: 300,
//             damping: 30,
//           }}
//           className="h-full  bg-white "
//         >
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="px-4 sm:px-6 pt-4 pb-3 bg-gradient-to-b from-gray-50 to-white"
//           >
//             <Stepper
//               activeStep={activeStep}
//               alternativeLabel
//               connector={<PremiumConnector />}
//             >
//               {steps.map((label, index) => (
//                 <Step key={label}>
//                   <StepLabel
//                     StepIconComponent={PremiumStepIcon}
//                     sx={{
//                       "& .MuiStepLabel-label": {
//                         fontSize: { xs: "0.7rem", sm: "0.8rem" },
//                         fontWeight: activeStep === index ? 700 : 500,
//                         color: activeStep === index ? "#059669" : "#6b7280",
//                         transition: "all 0.3s ease",
//                       },
//                       "& .MuiStepLabel-label.Mui-completed": {
//                         color: "#059669",
//                         fontWeight: 600,
//                       },
//                     }}
//                   >
//                     {label}
//                   </StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.4 }}
//             className="px-4 sm:px-6 py-3"
//           >
//             <Paper
//               elevation={0}
//               className="p-3 bg-gradient-to-br from-green-50 to-green-50 border border-ayuMid rounded-xl"
//             >
//               <div className="flex items-start gap-2">
//                 <div className="bg-ayuMid p-1.5 rounded-lg mt-0.5">
//                   <InfoOutlinedIcon className="text-white text-base" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-sm font-bold text-gray-900 mb-2">
//                     Important Rules
//                   </h3>
//                   <ul className="space-y-1.5 text-xs text-gray-700">
//                     <li className="flex items-start gap-1.5">
//                       <span>
//                         Primary guest must be at least 18 years of age
//                       </span>
//                     </li>
//                     <li className="flex items-start gap-1.5">
//                       <span>
//                         Accepted ID proofs: Passport, Aadhaar, Driving License,
//                         or Government ID
//                       </span>
//                     </li>
//                   </ul>
//                   <div className="flex justify-end mt-2">
//                     <a
//                       href="#"
//                       className="text-ayuMid hover:text-ayuMid text-xs font-semibold flex items-center gap-1 transition-all hover:gap-1.5"
//                     >
//                       View All Rules
//                       <ArrowForwardIcon sx={{ fontSize: 14 }} />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </Paper>
//           </motion.div>

//           <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 custom-scrollbar">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <AnimatePresence mode="wait" custom={direction}>
//                 <motion.div
//                   key={activeStep}
//                   custom={direction}
//                   variants={slideVariants}
//                   initial="enter"
//                   animate="center"
//                   exit="exit"
//                 >
//                   {activeStep === 0 && (
//                     <StepOnePrimaryGuest
//                       control={control}
//                       errors={errors}
//                       containerVariants={containerVariants}
//                       itemVariants={itemVariants}
//                     />
//                   )}
//                   {activeStep === 1 && (
//                     <StepTwoAddGuests
//                       additionalGuests={additionalGuests}
//                       handleAddGuest={handleAddGuest}
//                       handleRemoveGuest={handleRemoveGuest}
//                       containerVariants={containerVariants}
//                       itemVariants={itemVariants}
//                       guestCardVariants={guestCardVariants}
//                       control={control}
//                       errors={errors}
//                     />
//                   )}
//                   {activeStep === 2 && (
//                     <StepThreeContactInfo
//                       control={control}
//                       errors={errors}
//                       containerVariants={containerVariants}
//                       itemVariants={itemVariants}
//                     />
//                   )}
//                   {activeStep === 3 && (
//                     <StepFourReviewConfirm
//                       control={control}
//                       errors={errors}
//                       formData={formData}
//                       additionalGuests={additionalGuests}
//                       eventDetails={eventDetails}
//                       containerVariants={containerVariants}
//                       itemVariants={itemVariants}
//                     />
//                   )}
//                 </motion.div>
//               </AnimatePresence>
//             </form>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="border-t border-gray-100 px-4 sm:px-6 py-4 bg-gradient-to-t from-gray-50 to-white"
//           >
//             <div className="flex justify-between items-center gap-4">
//               <motion.div
//                 variants={buttonHoverVariants}
//                 initial="rest"
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 <CommonButton
//                   type="button"
//                   disabled={activeStep === 0}
//                   onClick={handleBack}
//                   className={`
//                     px-5 py-2 rounded-lg font-semibold transition-all duration-300 text-sm
//                     ${
//                       activeStep === 0
//                         ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                         : "bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 shadow-sm hover:shadow-md"
//                     }
//                   `}
//                   label={
//                     <span className="flex items-center gap-1.5">
//                       <ArrowBackIcon sx={{ fontSize: 18 }} />
//                       Back
//                     </span>
//                   }
//                 />
//               </motion.div>

//               <motion.div
//                 variants={buttonHoverVariants}
//                 initial="rest"
//                 whileHover="hover"
//                 whileTap="tap"
//               >
//                 {activeStep === steps.length - 1 ? (
//                   <CommonButton
//                     onClick={handleSubmit(onSubmit)}
//                     type="submit"
//                     className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 text-sm"
//                     label={
//                       <span className="flex items-center gap-1.5">
//                         <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
//                         Complete Booking
//                       </span>
//                     }
//                   />
//                 ) : (
//                   <CommonButton
//                     type="button"
//                     onClick={handleNext}
//                     className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 text-sm"
//                     label={
//                       <span className="flex items-center gap-1.5">
//                         Next Step
//                         <ArrowForwardIcon sx={{ fontSize: 18 }} />
//                       </span>
//                     }
//                   />
//                 )}
//               </motion.div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </Box>
//     </Modal>
//   );
// }

// function StepOnePrimaryGuest({
//   control,
//   errors,
//   containerVariants,
//   itemVariants,
// }) {
//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-4"
//     >
//       <motion.div variants={itemVariants}>
//         <Paper
//           elevation={0}
//           className="p-4 bg-gradient-to-br from-amber-100 to-amber-100 border border-ayuBrown rounded-xl"
//         >
//           <div className="flex items-center gap-2 mb-3">
//             <div className="bg-ayuBrown p-1.5 rounded-lg">
//               <PersonOutlineIcon className="text-white text-base" />
//             </div>
//             <h3 className="text-sm font-bold text-gray-800">
//               Who is this booking for?
//             </h3>
//           </div>
//           <RadioField
//             control={control}
//             name="bookingFor"
//             label=""
//             dataArray={[
//               { id: 1, value: "myself", label: "Myself" },
//               { id: 2, value: "someone_else", label: "Someone Else" },
//             ]}
//           />
//         </Paper>
//       </motion.div>

//       <motion.div variants={itemVariants}>
//         <Paper
//           elevation={0}
//           className="p-4 bg-green-100 border border-green-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
//         >
//           <div className="flex items-center gap-2 mb-2">
//             <div className="bg-emerald-600 p-1.5 rounded-lg">
//               <PersonOutlineIcon className="text-white text-base" />
//             </div>
//             <h3 className="text-sm font-bold text-gray-800">
//               Primary Guest Information
//             </h3>
//           </div>
//           <p className="text-xs text-gray-600 mb-3 ml-8">
//             Name should be as per official govt. ID
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
//             <div className="sm:col-span-1 lg:col-span-3">
//               <DropdownField
//                 control={control}
//                 name="title"
//                 placeholder="Title"
//                 dataArray={[
//                   { value: "Mr", label: "Mr" },
//                   { value: "Mrs", label: "Mrs" },
//                   { value: "Ms", label: "Ms" },
//                   { value: "Dr", label: "Dr" },
//                 ]}
//                 error={errors.title}
//               />
//             </div>
//             <div className="sm:col-span-1 lg:col-span-4">
//               <InputField
//                 control={control}
//                 name="firstName"
//                 label="First Name"
//                 placeholder="Enter first name"
//                 error={errors.firstName}
//               />
//             </div>
//             <div className="sm:col-span-2 lg:col-span-5">
//               <InputField
//                 control={control}
//                 name="lastName"
//                 label="Last Name"
//                 placeholder="Enter last name"
//                 error={errors.lastName}
//               />
//             </div>
//           </div>
//         </Paper>
//       </motion.div>
//     </motion.div>
//   );
// }

// function StepTwoAddGuests({
//   additionalGuests,
//   handleAddGuest,
//   handleRemoveGuest,
//   containerVariants,
//   itemVariants,
//   guestCardVariants,
//   control,
//   errors,
// }) {
//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-4"
//     >
//       <motion.div variants={itemVariants}>
//         <Paper
//           elevation={0}
//           className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
//         >
//           <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
//             <div className="flex items-center gap-2">
//               <div className="bg-emerald-600 p-1.5 rounded-lg">
//                 <PersonAddIcon className="text-white text-base" />
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-gray-800">Add Guests</h3>
//                 <p className="text-xs text-gray-600 mt-0.5">
//                   Name should be as per official govt. ID
//                 </p>
//               </div>
//             </div>
//             <Chip
//               label={`${additionalGuests.length} Guest${
//                 additionalGuests.length !== 1 ? "s" : ""
//               } Added`}
//               className="bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold text-xs px-3 py-0.5"
//               size="small"
//             />
//           </div>

//           <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-xl border border-dashed border-gray-300">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 mb-4">
//               <div className="sm:col-span-1 lg:col-span-3">
//                 <DropdownField
//                   control={control}
//                   name="guestTitle"
//                   placeholder="Title"
//                   dataArray={[
//                     { value: "Mr", label: "Mr" },
//                     { value: "Mrs", label: "Mrs" },
//                     { value: "Ms", label: "Ms" },
//                   ]}
//                   error={errors.guestTitle}
//                 />
//               </div>
//               <div className="sm:col-span-1 lg:col-span-4">
//                 <InputField
//                   control={control}
//                   name="guestFirstName"
//                   label="First Name"
//                   placeholder="Enter first name"
//                   error={errors.guestFirstName}
//                 />
//               </div>
//               <div className="sm:col-span-2 lg:col-span-5">
//                 <InputField
//                   control={control}
//                   name="guestLastName"
//                   label="Last Name"
//                   placeholder="Enter last name"
//                   error={errors.guestLastName}
//                 />
//               </div>
//             </div>

//             <div className="flex items-center justify-between flex-wrap gap-3">
//               <CheckBoxField
//                 control={control}
//                 name="isBelow12"
//                 label="Below 12 years of age"
//               />
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <CommonButton
//                   type="button"
//                   onClick={handleAddGuest}
//                   label={
//                     <span className="flex items-center gap-1.5 text-sm">
//                       <PersonAddIcon sx={{ fontSize: 18 }} />
//                       Add Guest
//                     </span>
//                   }
//                   className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
//                 />
//               </motion.div>
//             </div>
//           </div>
//         </Paper>
//       </motion.div>

//       {additionalGuests.length > 0 && (
//         <motion.div variants={itemVariants}>
//           <Paper
//             elevation={0}
//             className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
//           >
//             <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
//               <PersonAddIcon className="text-emerald-600 text-base" />
//               Added Guests ({additionalGuests.length})
//             </h4>
//             <div className="space-y-2">
//               <AnimatePresence>
//                 {additionalGuests.map((guest, index) => (
//                   <motion.div
//                     key={guest.id}
//                     variants={guestCardVariants}
//                     initial="hidden"
//                     animate="visible"
//                     exit="exit"
//                   >
//                     <Paper
//                       elevation={0}
//                       className="p-3 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg hover:shadow-md transition-all"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold w-9 h-9 rounded-lg flex items-center justify-center shadow-sm text-sm">
//                             {index + 1}
//                           </div>
//                           <div>
//                             <p className="font-bold text-gray-800 text-sm">
//                               {guest.guestTitle} {guest.guestFirstName}
//                               {guest.guestLastName}
//                             </p>
//                             {guest.isBelow12 && (
//                               <Chip
//                                 label="Below 12 years"
//                                 size="small"
//                                 className="mt-1 bg-orange-100 text-orange-700 font-semibold text-xs"
//                               />
//                             )}
//                           </div>
//                         </div>
//                         <motion.div
//                           whileHover={{ scale: 1.1, rotate: 5 }}
//                           whileTap={{ scale: 0.9 }}
//                         >
//                           <IconButton
//                             onClick={() => handleRemoveGuest(guest.id)}
//                             size="small"
//                             className="bg-red-50 hover:bg-red-100 transition-colors"
//                           >
//                             <DeleteOutlineIcon className="text-red-600 text-base" />
//                           </IconButton>
//                         </motion.div>
//                       </div>
//                     </Paper>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           </Paper>
//         </motion.div>
//       )}

//       {additionalGuests.length === 0 && (
//         <motion.div variants={itemVariants}>
//           <Paper
//             elevation={0}
//             className="text-center py-12 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-dashed border-gray-300"
//           >
//             <motion.div
//               animate={{
//                 y: [0, -10, 0],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             >
//               <PersonAddIcon sx={{ fontSize: 60, color: "#9ca3af", mb: 2 }} />
//             </motion.div>
//             <p className="text-gray-600 font-semibold text-sm">
//               No additional guests added yet
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               Add guests using the form above
//             </p>
//           </Paper>
//         </motion.div>
//       )}
//     </motion.div>
//   );
// }

// function StepThreeContactInfo({
//   control,
//   errors,
//   containerVariants,
//   itemVariants,
// }) {
//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-4"
//     >
//       <motion.div variants={itemVariants}>
//         <Paper
//           elevation={0}
//           className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
//         >
//           <div className="flex items-center space-x-4 mb-2">
//             <div className="bg-blue-600 p-1.5 rounded-lg">
//               <PhoneOutlinedIcon className="text-white text-base" />
//             </div>
//             <h3 className="text-sm font-bold text-gray-800">Contact Details</h3>
//           </div>
//           <p className="text-xs text-gray-600 mb-4 ml-8">
//             Booking confirmation will be sent to these contact details
//           </p>

//           <div className="space-y-4">
//             <div className="relative">
//               <div className="">
//                 <InputField
//                   control={control}
//                   name="email"
//                   label="Email Address"
//                   type="email"
//                   placeholder="example@email.com"
//                   error={errors.email}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-3 gap-3">
//               <div className="col-span-1">
//                 <DropdownField
//                   control={control}
//                   name="countryCode"
//                   placeholder="Code"
//                   dataArray={[
//                     { value: "+91", label: "+91" },
//                     { value: "+1", label: "+1" },
//                     { value: "+44", label: "+44" },
//                     { value: "+61", label: "+61" },
//                   ]}
//                   error={errors.countryCode}
//                 />
//               </div>
//               <div className="col-span-2 relative">
//                 <div className="">
//                   <InputField
//                     control={control}
//                     name="mobileNumber"
//                     label="Mobile Number"
//                     type="tel"
//                     placeholder="9876543210"
//                     error={errors.mobileNumber}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Paper>
//       </motion.div>
//     </motion.div>
//   );
// }

// function StepFourReviewConfirm({
//   control,
//   errors,
//   formData,
//   additionalGuests,
//   eventDetails,
//   containerVariants,
//   itemVariants,
// }) {
//   const display = (val) =>
//     typeof val === "object" && val !== null ? val.label : val || "N/A";

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="space-y-4"
//     >
//       <motion.div variants={itemVariants}>
//         <div className="flex items-center gap-2 mb-4">
//           <div className="bg-emerald-600 p-1.5 rounded-lg">
//             <CheckCircleOutlineIcon className="text-white text-base" />
//           </div>
//           <h3 className="text-base font-bold text-gray-800">
//             Review Your Booking
//           </h3>
//         </div>

//         <Paper
//           elevation={0}
//           className="p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200 rounded-xl mb-3"
//         >
//           <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm gap-2">
//             <span className="text-xl">🏨</span>
//             Booking Summary
//           </h4>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg">
//               <p className="font-semibold text-gray-500 text-xs mb-1">
//                 Service Name
//               </p>
//               <p className="font-bold text-gray-800 text-sm">
//                 {eventDetails?.serviceName || "N/A"}
//               </p>
//             </div>
//             <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg">
//               <p className="font-semibold text-gray-500 text-xs mb-1">
//                 Room Type
//               </p>
//               <p className="font-bold text-gray-800 text-sm">
//                 {eventDetails?.room || "N/A"}
//               </p>
//             </div>
//             <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg">
//               <p className="font-semibold text-gray-500 text-xs mb-1">Date</p>
//               <p className="font-bold text-gray-800 text-sm">
//                 {eventDetails?.date || "N/A"}
//               </p>
//             </div>
//             <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg">
//               <p className="font-semibold text-gray-500 text-xs mb-1">
//                 Total Guests
//               </p>
//               <p className="font-bold text-gray-800 text-sm">
//                 {(additionalGuests?.length || 0) + 1} Guest(s)
//               </p>
//             </div>
//           </div>
//         </Paper>

//         <Paper
//           elevation={0}
//           className="p-4 bg-white border border-gray-200 rounded-xl mb-3 shadow-sm"
//         >
//           <div className="flex items-center gap-2 mb-3">
//             <h4 className="font-bold text-gray-800 text-sm">Guest Details</h4>
//           </div>

//           <div className="space-y-2 bg-gray-50 p-3 rounded-lg text-xs">
//             <div className="flex space-x-2 items-center">
//               <span className="font-semibold text-gray-600">Name :</span>
//               <span className="font-bold text-gray-800">
//                 {display(formData?.title)} {formData?.firstName}
//                 {formData?.lastName}
//               </span>
//             </div>
//             <Divider />
//             <div className="flex space-x-2 items-center">
//               <span className="font-semibold text-gray-600">Booking For :</span>
//               <span className="font-bold text-gray-800 capitalize">
//                 {display(formData?.bookingFor).replace("_", " ")}
//               </span>
//             </div>
//           </div>
//         </Paper>

//         {additionalGuests?.length > 0 && (
//           <Paper
//             elevation={0}
//             className="p-4 bg-white border border-gray-200 rounded-xl mb-3 shadow-sm"
//           >
//             <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
//               <PersonAddIcon className="text-emerald-600 text-base" />
//               Additional Guests ({additionalGuests.length})
//             </h4>

//             <div className="space-y-2">
//               {additionalGuests.map((guest, index) => (
//                 <div
//                   key={guest.id}
//                   className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200"
//                 >
//                   <div className="flex items-center gap-2">
//                     <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold w-8 h-8 rounded-lg flex items-center justify-center text-xs">
//                       {index + 1}
//                     </div>
//                     <span className="font-bold text-gray-800 text-sm">
//                       {guest.guestTitle} {guest.guestFirstName}
//                       {guest.guestLastName}
//                     </span>
//                   </div>

//                   {guest?.isBelow12 && (
//                     <Chip
//                       label="Below 12 years"
//                       size="small"
//                       className="bg-orange-100 text-orange-700 font-semibold text-xs"
//                     />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </Paper>
//         )}

//         <Paper
//           elevation={0}
//           className="p-4 bg-white border border-gray-200 rounded-xl mb-3 shadow-sm"
//         >
//           <div className="flex items-center gap-2 mb-3">
//             <div className="bg-ayuMid p-1.5 rounded-lg">
//               <EmailOutlinedIcon className="text-white text-xs" />
//             </div>
//             <h4 className="font-bold text-gray-800 text-sm">
//               Contact Information
//             </h4>
//           </div>

//           <div className="space-y-2 bg-gray-50 p-3 rounded-lg text-xs">
//             <div className="flex space-x-2 items-center">
//               <span className="font-semibold text-gray-600">Email :</span>
//               <span className="font-bold text-gray-800">
//                 {formData?.email || "N/A"}
//               </span>
//             </div>
//             <Divider />
//             <div className="flex space-x-2 items-center">
//               <span className="font-semibold text-gray-600">Mobile :</span>
//               <span className="font-bold text-gray-800">
//                 {display(formData?.countryCode)} {formData?.mobileNumber}
//               </span>
//             </div>
//           </div>
//         </Paper>
//       </motion.div>

//       <motion.div variants={itemVariants}>
//         <Paper
//           elevation={0}
//           className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 border border-dashed border-gray-300 rounded-xl"
//         >
//           <h3 className="text-sm font-bold text-gray-800 mb-3">
//             Additional Information (Optional)
//           </h3>
//           <div className="space-y-3">
//             <InputField
//               control={control}
//               name="gstDetails"
//               label="GST Number"
//               placeholder="Enter GST number if applicable"
//               error={errors.gstDetails}
//             />
//             <InputField
//               control={control}
//               name="specialRequests"
//               label="Special Requests"
//               placeholder="Any special requirements or preferences..."
//               multiline
//               rows={3}
//               error={errors.specialRequests}
//             />
//           </div>
//         </Paper>
//       </motion.div>
//     </motion.div>
//   );
// }

import { yupResolver } from "@hookform/resolvers/yup";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HotelIcon from "@mui/icons-material/Hotel";
import PetsIcon from "@mui/icons-material/Pets";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  Box,
  Divider,
  IconButton,
  Modal,
  Step,
  StepLabel,
  Stepper,
  StepConnector,
  stepConnectorClasses,
  Chip,
  Paper,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CancelButtonModal from "../../common/button/CancelButtonModal";
import CommonButton from "../../common/button/CommonButton";
import CheckBoxField from "../../common/formFields/CheckBoxField";
import DropdownField from "../../common/formFields/DropdownField";
import InputField from "../../common/formFields/InputField";
import RadioField from "../../common/formFields/RadioField";
import { bookingValidationSchema } from "./bookingValidationSchema";
import DatePickerField from "../../common/formFields/DatePickerField";
import TimePickerField from "../../common/formFields/TimePickerField";
import { format } from "date-fns";

const PremiumConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 16,
    left: "calc(-50% + 18px)",
    right: "calc(50% + 18px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
      boxShadow: "0 2px 6px rgba(16, 185, 129, 0.3)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "linear-gradient(90deg, #10b981 0%, #059669 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: "#e5e7eb",
    borderRadius: 1,
    transition: "all 0.4s ease-in-out",
  },
}));

const PremiumStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    ownerState.completed || ownerState.active ? "#10b981" : "#e5e7eb",
  zIndex: 1,
  color: "#fff",
  width: 36,
  height: 36,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.3s ease-in-out",
  boxShadow: ownerState.active ? "0 2px 12px rgba(16, 185, 129, 0.4)" : "none",
  border: ownerState.active ? "2px solid #d1fae5" : "none",
  transform: ownerState.active ? "scale(1.05)" : "scale(1)",
  ...(ownerState.completed && {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  }),
  ...(ownerState.active && {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    animation: "pulse 2s ease-in-out infinite",
  }),
  "@keyframes pulse": {
    "0%, 100%": {
      boxShadow: "0 2px 12px rgba(16, 185, 129, 0.4)",
    },
    "50%": {
      boxShadow: "0 2px 18px rgba(16, 185, 129, 0.6)",
    },
  },
}));

function PremiumStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <PersonOutlineIcon fontSize="small" />,
    2: <CalendarTodayIcon fontSize="small" />,
    3: <PersonAddIcon fontSize="small" />,
    4: <PhoneOutlinedIcon fontSize="small" />,
    5: <CheckCircleOutlineIcon fontSize="small" />,
  };

  return (
    <PremiumStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed ? (
        <CheckCircleOutlineIcon fontSize="small" />
      ) : (
        icons[String(icon)]
      )}
    </PremiumStepIconRoot>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  outline: "none",
  borderRadius: "24px",
};

const steps = [
  "Primary Guest",
  "Booking Details",
  "Add Guests",
  "Contact Info",
  "Preview",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.3 },
      scale: { duration: 0.3 },
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
    scale: 0.8,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  }),
};

const guestCardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    x: -100,
    transition: {
      duration: 0.2,
    },
  },
};



const buttonHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: { scale: 0.95 },
};

export default function BookEventForm({ open, handleClose, eventDetails }) {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState(null);
  const [additionalGuests, setAdditionalGuests] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
    getValues,
    setError,
    clearErrors,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(bookingValidationSchema[activeStep]),
    defaultValues: {
      bookingFor: "1",
      title: { value: "Mr", label: "Mr" },
      guestTitle: { value: "Mr", label: "Mr" },
      firstName: "",
      guestFirstName: "",
      lastName: "",
      guestLastName: "",
      email: "",
      countryCode: { value: "+91", label: "+91" },
      mobileNumber: "",
      specialRequests: "",
      gstDetails: "",
      isBelow12: false,
      // New fields
      checkInDate: "",
      checkInTime: "",
      checkOutDate: "",
      checkOutTime: "",
      adultMale: 0,
      adultFemale: 0,
      adultOther: 0,
      child0to6: 0,
      child7to12: 0,
      extraBed: false,
      petAllowed: false,
      petType: "",
      pricePerNight: "",
      including: "",
      excluding: "",
    },
  });

  const watchExtraBed = watch("extraBed");
  const watchPetAllowed = watch("petAllowed");

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      const currentData = getValues();
      setFormData({ ...formData, ...currentData });
      setDirection(1);
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setActiveStep((prevStep) => prevStep - 1);
  };

  console.log("checkInDate", watch("checkInDate"));

  const handleAddGuest = () => {
    const [guestTitle, guestFirstName, guestLastName] = getValues([
      "guestTitle",
      "guestFirstName",
      "guestLastName",
    ]);

    let hasError = false;

    if (!guestTitle) {
      setError("guestTitle", {
        type: "manual",
        message: "Title is required",
      });
      hasError = true;
    } else {
      clearErrors("guestTitle");
    }

    if (!guestFirstName) {
      setError("guestFirstName", {
        type: "manual",
        message: "First name is required",
      });
      hasError = true;
    } else {
      clearErrors("guestFirstName");
    }

    if (!guestLastName) {
      setError("guestLastName", {
        type: "manual",
        message: "Last name is required",
      });
      hasError = true;
    } else {
      clearErrors("guestLastName");
    }

    if (hasError) return;

    const newGuest = {
      id: Date.now(),
      guestTitle: guestTitle?.label ?? "",
      guestFirstName,
      guestLastName,
      isBelow12: getValues("isBelow12"),
    };

    setAdditionalGuests((prev) => [...prev, newGuest]);

    reset({
      ...getValues(),
      guestTitle: { value: "Mr", label: "Mr" },
      guestFirstName: "",
      guestLastName: "",
      isBelow12: false,
    });

    clearErrors(["guestTitle", "guestFirstName", "guestLastName"]);
  };

  const handleRemoveGuest = (guestId) => {
    setAdditionalGuests(
      additionalGuests.filter((guest) => guest.id !== guestId)
    );
  };

  const onSubmit = (data) => {
    const finalData = {
      ...formData,
      ...data,
      additionalGuests: additionalGuests,
      totalGuests: additionalGuests.length + 1,
    };
    console.log("Final Booking Data:", finalData);
    handleClose();
    reset();
    setActiveStep(0);
    setFormData(null);
    setAdditionalGuests([]);
  };

  const handleModalClose = () => {
    handleClose();
    reset();
    setActiveStep(0);
    setFormData(null);
    setAdditionalGuests([]);
  };

  return (
    <Modal
      open={open}
      aria-labelledby="booking-modal-title"
      onClose={handleModalClose}
      aria-describedby="booking-modal-description"
      closeAfterTransition
    >
      <Box
        sx={style}
        className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] 2xl:w-[55%] max-h-[85vh] md:max-h-[95vh] overflow-y-auto bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="flex items-center justify-between  w-full">
          <div className="relative z-10 p-2">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-lg">
                <EventNoteIcon className="text-ayuDark text-xl" />
              </div>
              <div>
                <h1 className="font-bold text-lg md:text-xl text-ayuDark drop-shadow-lg">
                  Book Service
                </h1>
                <p className="text-xs sm:text-sm text-ayuDark font-medium">
                  {eventDetails?.name || "Complete the booking process"}
                </p>
              </div>
            </motion.div>
          </div>
          <div className="z-20">
            <CancelButtonModal onClick={handleModalClose} />
          </div>
        </div>
        <Divider sx={{ borderColor: "#4a7c2c", borderWidth: 1.5 }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="h-full  bg-white "
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="px-4 sm:px-6 pt-4 pb-3 "
          >
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              connector={<PremiumConnector />}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={PremiumStepIcon}
                    sx={{
                      "& .MuiStepLabel-label": {
                        fontSize: { xs: "0.7rem", sm: "0.8rem" },
                        fontWeight: activeStep === index ? 700 : 500,
                        color: activeStep === index ? "#059669" : "#6b7280",
                        transition: "all 0.3s ease",
                      },
                      "& .MuiStepLabel-label.Mui-completed": {
                        color: "#059669",
                        fontWeight: 600,
                      },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="px-4 sm:px-6 py-3"
          >
            <div className="p-3 bg-gradient-to-br from-green-50 to-green-50 border border-ayuMid rounded-xl">
              <div className="flex items-start gap-2">
                <div className="bg-ayuMid p-1.5 rounded-lg mt-0.5">
                  <InfoOutlinedIcon className="text-white text-base" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">
                    Important Rules
                  </h3>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    <li className="flex items-start gap-1.5">
                      <span>
                        Primary guest must be at least 18 years of age
                      </span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span>
                        Accepted ID proofs: Passport, Aadhaar, Driving License,
                        or Government ID
                      </span>
                    </li>
                  </ul>
                  <div className="flex justify-end mt-2">
                    <a
                      // href="#"
                      className="text-ayuMid hover:text-ayuMid text-xs font-semibold flex items-center gap-1 transition-all hover:gap-1.5"
                    >
                      View All Rules
                      <ArrowForwardIcon sx={{ fontSize: 14 }} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 custom-scrollbar">
            <form onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {activeStep === 0 && (
                    <StepOnePrimaryGuest
                      control={control}
                      errors={errors}
                      containerVariants={containerVariants}
                      itemVariants={itemVariants}
                    />
                  )}
                  {activeStep === 1 && (
                    <StepTwoBookingDetails
                      control={control}
                      errors={errors}
                      containerVariants={containerVariants}
                      itemVariants={itemVariants}
                      watchExtraBed={watchExtraBed}
                      watchPetAllowed={watchPetAllowed}
                      eventDetails={eventDetails}
                    />
                  )}
                  {activeStep === 2 && (
                    <StepThreeAddGuests
                      additionalGuests={additionalGuests}
                      handleAddGuest={handleAddGuest}
                      handleRemoveGuest={handleRemoveGuest}
                      containerVariants={containerVariants}
                      itemVariants={itemVariants}
                      guestCardVariants={guestCardVariants}
                      control={control}
                      errors={errors}
                    />
                  )}
                  {activeStep === 3 && (
                    <StepFourContactInfo
                      control={control}
                      errors={errors}
                      containerVariants={containerVariants}
                      itemVariants={itemVariants}
                    />
                  )}
                  {activeStep === 4 && (
                    <StepFiveReviewConfirm
                      control={control}
                      errors={errors}
                      formData={formData}
                      additionalGuests={additionalGuests}
                      eventDetails={eventDetails}
                      containerVariants={containerVariants}
                      itemVariants={itemVariants}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </form>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border-t border-gray-100 px-4 sm:px-6 py-4 bg-gradient-to-t from-gray-50 to-white"
          >
            <div className="flex justify-between items-center gap-4">
              <motion.div
                variants={buttonHoverVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                <CommonButton
                  type="button"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={`
                    px-5 py-2 rounded-lg font-semibold transition-all duration-300 text-sm
                    ${
                      activeStep === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-emerald-500 text-emerald-600 hover:bg-emerald-50 shadow-sm hover:shadow-md"
                    }
                  `}
                  label={
                    <span className="flex items-center gap-1.5">
                      <ArrowBackIcon sx={{ fontSize: 18 }} />
                      Back
                    </span>
                  }
                />
              </motion.div>

              <motion.div
                variants={buttonHoverVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                {activeStep === steps.length - 1 ? (
                  <CommonButton
                    onClick={handleSubmit(onSubmit)}
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                    label={
                      <span className="flex items-center gap-1.5">
                        <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
                        Confirm
                      </span>
                    }
                  />
                ) : (
                  <CommonButton
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 text-sm"
                    label={
                      <span className="flex items-center gap-1.5">
                        Next Step
                        <ArrowForwardIcon sx={{ fontSize: 18 }} />
                      </span>
                    }
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </Box>
    </Modal>
  );
}

function StepOnePrimaryGuest({
  control,
  errors,
  containerVariants,
  itemVariants,
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <Paper
          elevation={0}
          className="p-4 bg-gradient-to-br from-amber-100 to-amber-100 border border-ayuBrown rounded-xl"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-ayuBrown p-1.5 rounded-lg">
              <PersonOutlineIcon className="text-white text-base" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">
              Who is this booking for?
            </h3>
          </div>
          <RadioField
            control={control}
            name="bookingFor"
            label=""
            dataArray={[
              { id: 1, value: "myself", label: "Myself" },
              { id: 2, value: "someone_else", label: "Someone Else" },
            ]}
          />
        </Paper>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Paper
          elevation={0}
          className="p-4 bg-green-100 border border-green-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg">
              <PersonOutlineIcon className="text-white text-base" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">
              Primary Guest Information
            </h3>
          </div>
          <p className="text-xs text-gray-600 mb-3 ml-8">
            Name should be as per official govt. ID
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            <div className="sm:col-span-1 lg:col-span-3">
              <DropdownField
                control={control}
                name="title"
                placeholder="Title"
                dataArray={[
                  { value: "Mr", label: "Mr" },
                  { value: "Mrs", label: "Mrs" },
                  { value: "Ms", label: "Ms" },
                  { value: "Dr", label: "Dr" },
                ]}
                error={errors.title}
              />
            </div>
            <div className="sm:col-span-1 lg:col-span-4">
              <InputField
                control={control}
                name="firstName"
                label="First Name"
                placeholder="Enter first name"
                error={errors.firstName}
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-5">
              <InputField
                control={control}
                name="lastName"
                label="Last Name"
                placeholder="Enter last name"
                error={errors.lastName}
              />
            </div>
          </div>
        </Paper>
      </motion.div>
    </motion.div>
  );
}

function StepTwoBookingDetails({
  control,
  errors,
  containerVariants,
  itemVariants,
  watchExtraBed,
  watchPetAllowed,
  eventDetails,
}) {
  console.log("eventDetails", eventDetails);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <Paper
          elevation={0}
          className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <CalendarTodayIcon className="text-white text-base" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">
              Check-In & Check-Out
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="bg-lime-50 p-3 rounded-lg border border-lime-200">
                <p className="text-xs font-semibold text-lime-800 mb-2 flex items-center gap-1">
                  <CalendarTodayIcon sx={{ fontSize: 14 }} />
                  Check-In Date & Time
                </p>
                <div className="space-y-2">
                  <DatePickerField
                    control={control}
                    name="checkInDate"
                    label="Check-In Date"
                    type="date"
                    error={errors.checkInDate}
                    dateTimePicker={true}
                    disablePast={true}
                  />
                  <TimePickerField
                    control={control}
                    name="checkInTime"
                    placeholder="Check-In Time"
                    format24hr={true}
                    error={errors.checkInTime}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                <p className="text-xs font-semibold text-amber-800 mb-2 flex items-center gap-1">
                  <CalendarTodayIcon sx={{ fontSize: 14 }} />
                  Check-Out Date & Time
                </p>
                <div className="space-y-2">
                  <DatePickerField
                    control={control}
                    name="checkOutDate"
                    label="Check-Out Date"
                    type="date"
                    error={errors.checkOutDate}
                    disablePast={true}
                  />
                  <TimePickerField
                    control={control}
                    name="checkOutTime"
                    placeholder="Check-Out Time"
                    format24hr={true}
                    error={errors.checkOutTime}
                  />
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Paper
          elevation={0}
          className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-purple-600 p-1.5 rounded-lg">
              <PersonOutlineIcon className="text-white text-base" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">Adult Guests</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-lime-50 to-lime-100 p-3 rounded-lg border border-lime-200">
              <p className="text-xs font-semibold text-lime-800 mb-2">Male</p>
              <InputField control={control} name="adultMale" placeholder="0" />
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-3 rounded-lg border border-pink-200">
              <p className="text-xs font-semibold text-pink-800 mb-2">Female</p>
              <InputField
                control={control}
                name="adultFemale"
                placeholder="0"
              />
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
              <p className="text-xs font-semibold text-purple-800 mb-2">
                Other
              </p>
              <InputField control={control} name="adultOther" placeholder="0" />
            </div>
          </div>
        </Paper>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Paper
          elevation={0}
          className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-yellow-600 p-1.5 rounded-lg">
              <PersonOutlineIcon className="text-white text-base" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">Child Guests</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-green-800">Age 0-6</p>
                <Chip
                  label="FREE"
                  size="small"
                  sx={{
                    backgroundColor: "#16a34a",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "12px",
                  }}
                />
              </div>
              <InputField control={control} name="child0to6" placeholder="0" />
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-3 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-orange-800">
                  Age 7-12
                </p>
                <Chip
                  label="50% OFF"
                  size="small"
                  sx={{
                    backgroundColor: "#ea580c",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                />
              </div>
              <InputField control={control} name="child7to12" placeholder="0" />
            </div>
          </div>
        </Paper>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Paper
          elevation={0}
          className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-ayuBrown p-1.5 rounded-lg">
              <HotelIcon className="text-white text-base" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">
              Additional Options
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
              <div className="space-y-2 ">
                <CheckBoxField
                  control={control}
                  name="extraBed"
                  label="Extra Bed (1 per room)"
                />
                <div className="flex justify-end">
                  <Chip
                    label="75% Charge (25% OFF)"
                    size="small"
                    sx={{
                      backgroundColor: "#d97706",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "12px",
                    }}
                  />
                </div>
              </div>
              {watchExtraBed && (
                <FormHelperText className="text-xs text-indigo-700 ml-7">
                  ✓ Extra bed will be added to your room
                </FormHelperText>
              )}
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg border border-teal-200">
              <div className="space-y-2">
                <CheckBoxField
                  control={control}
                  name="petAllowed"
                  label="Pet Allowed (Only Dog & Cat)"
                />
                <div className="flex justify-end">
                  <Chip
                    label="25% Charge (75% OFF)"
                    size="small"
                    sx={{
                      backgroundColor: "#0d9488",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "12px",
                    }}
                  />
                </div>
              </div>
              {watchPetAllowed && (
                <div className="ml-7 mt-2">
                  <DropdownField
                    control={control}
                    name="petType"
                    placeholder="Select Pet Type"
                    dataArray={[
                      { value: "dog", label: "Dog" },
                      { value: "cat", label: "Cat" },
                    ]}
                    error={errors.petType}
                  />
                  <FormHelperText className="text-xs text-teal-700 mt-1">
                    <PetsIcon sx={{ fontSize: 12 }} /> Only stay charge
                    applicable
                  </FormHelperText>
                </div>
              )}
            </div>
          </div>
        </Paper>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Paper
          elevation={0}
          className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-emerald-600 p-1.5 rounded-lg">
              <span className="text-white px-2">₹</span>
            </div>
            <h3 className="text-sm font-bold text-gray-800">Pricing Details</h3>
          </div>

          <div className="grid  lg:grid-cols-3 gap-4">
            <div>
              <InputField
                control={control}
                name="pricePerNight"
                label="Price Per Night"
                disabled={true}
                placeholder="Enter price per night"
              />
            </div>
            <div>
              <InputField
                control={control}
                name="including"
                label="Including"
                disabled={true}
                placeholder="e.g., Breakfast, WiFi, Parking"
              />
            </div>
            <div>
              <InputField
                control={control}
                name="excluding"
                label="Excluding"
                disabled={true}
                placeholder="e.g., Lunch, Dinner, Spa services"
              />
            </div>
          </div>
        </Paper>
      </motion.div>
    </motion.div>
  );
}

function StepThreeAddGuests({
  additionalGuests,
  handleAddGuest,
  handleRemoveGuest,
  containerVariants,
  itemVariants,
  guestCardVariants,
  control,
  errors,
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <Paper
          elevation={0}
          className="p-2 md:p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
        >
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg">
                <PersonAddIcon className="text-white text-base" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800">Add Guests</h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  Name should be as per official govt. ID
                </p>
              </div>
            </div>
            <Chip
              label={`${additionalGuests.length} Guest${
                additionalGuests.length !== 1 ? "s" : ""
              } Added`}
              size="small"
              sx={{
                backgroundImage: "linear-gradient(to right, #059669, #16a34a)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "12px",
                px: 1.5,
                py: 0.5,
                border: "none",
              }}
            />
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-xl border border-dashed border-gray-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 mb-4">
              <div className="sm:col-span-1 lg:col-span-3">
                <DropdownField
                  control={control}
                  name="guestTitle"
                  placeholder="Title"
                  dataArray={[
                    { value: "Mr", label: "Mr" },
                    { value: "Mrs", label: "Mrs" },
                    { value: "Ms", label: "Ms" },
                  ]}
                  error={errors.guestTitle}
                />
              </div>
              <div className="sm:col-span-1 lg:col-span-4">
                <InputField
                  control={control}
                  name="guestFirstName"
                  label="First Name"
                  placeholder="Enter first name"
                  error={errors.guestFirstName}
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-5">
                <InputField
                  control={control}
                  name="guestLastName"
                  label="Last Name"
                  placeholder="Enter last name"
                  error={errors.guestLastName}
                />
              </div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <CheckBoxField
                control={control}
                name="isBelow12"
                label="Below 12 years of age"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CommonButton
                  type="button"
                  onClick={handleAddGuest}
                  label={
                    <span className="flex items-center gap-1.5 text-sm">
                      <PersonAddIcon sx={{ fontSize: 18 }} />
                      Add Guest
                    </span>
                  }
                  className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all"
                />
              </motion.div>
            </div>
          </div>
        </Paper>
      </motion.div>

      {additionalGuests.length > 0 && (
        <motion.div variants={itemVariants}>
          <Paper
            elevation={0}
            className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
          >
            <h4 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <PersonAddIcon className="text-emerald-600 text-base" />
              Added Guests ({additionalGuests.length})
            </h4>
            <div className="space-y-2">
              <AnimatePresence>
                {additionalGuests.map((guest, index) => (
                  <motion.div
                    key={guest.id}
                    variants={guestCardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Paper
                      elevation={0}
                      className="p-3 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold w-9 h-9 rounded-lg flex items-center justify-center shadow-sm text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 text-sm">
                              {guest.guestTitle} {guest.guestFirstName}
                              {guest.guestLastName}
                            </p>
                            {guest.isBelow12 && (
                              <Chip
                                label="Below 12 years"
                                size="small"
                                className="mt-1 bg-orange-100 text-orange-700 font-semibold text-xs"
                              />
                            )}
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <IconButton
                            onClick={() => handleRemoveGuest(guest.id)}
                            size="small"
                            className="bg-red-50 hover:bg-red-100 transition-colors"
                          >
                            <DeleteOutlineIcon className="text-red-600 text-base" />
                          </IconButton>
                        </motion.div>
                      </div>
                    </Paper>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Paper>
        </motion.div>
      )}

      {additionalGuests.length === 0 && (
        <motion.div variants={itemVariants}>
          <Paper
            elevation={0}
            className="text-center py-12 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-dashed border-gray-300"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <PersonAddIcon sx={{ fontSize: 60, color: "#9ca3af", mb: 2 }} />
            </motion.div>
            <p className="text-gray-600 font-semibold text-sm">
              No additional guests added yet
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Add guests using the form above
            </p>
          </Paper>
        </motion.div>
      )}
    </motion.div>
  );
}

function StepFourContactInfo({
  control,
  errors,
  containerVariants,
  itemVariants,
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <Paper
          elevation={0}
          className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm"
        >
          <div className="flex items-center space-x-4 mb-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <PhoneOutlinedIcon className="text-white text-base" />
            </div>
            <h3 className="text-sm font-bold text-gray-800">Contact Details</h3>
          </div>
          <p className="text-xs text-gray-600 mb-4 ml-8">
            Booking confirmation will be sent to these contact details
          </p>

          <div className="space-y-4">
            <div className="relative">
              <div className="">
                <InputField
                  control={control}
                  name="email"
                  label="Email Address"
                  type="email"
                  placeholder="example@email.com"
                  error={errors.email}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-1">
                <DropdownField
                  control={control}
                  name="countryCode"
                  placeholder="Code"
                  dataArray={[
                    { value: "+91", label: "+91" },
                    { value: "+1", label: "+1" },
                    { value: "+44", label: "+44" },
                    { value: "+61", label: "+61" },
                  ]}
                  error={errors.countryCode}
                />
              </div>
              <div className="col-span-2 relative">
                <div className="">
                  <InputField
                    control={control}
                    name="mobileNumber"
                    label="Mobile Number"
                    type="tel"
                    placeholder="9876543210"
                    error={errors.mobileNumber}
                  />
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </motion.div>
    </motion.div>
  );
}

function StepFiveReviewConfirm({
  control,
  errors,
  formData,
  additionalGuests,
  eventDetails,
  containerVariants,
  itemVariants,
}) {
  const display = (val) =>
    typeof val === "object" && val !== null ? val.label : val || "N/A";

  const totalAdults =
    (parseInt(formData?.adultMale) || 0) +
    (parseInt(formData?.adultFemale) || 0) +
    (parseInt(formData?.adultOther) || 0);

  const totalChildren =
    (parseInt(formData?.child0to6) || 0) +
    (parseInt(formData?.child7to12) || 0);

  console.log("formData", formData);

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "N/A" : format(d, "dd-MM-yyyy");
  };

  const formatTime = (time) => {
    if (!time) return "N/A";
    const d = new Date(time);
    return isNaN(d.getTime()) ? "N/A" : format(d, "hh:mm a");
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-emerald-600 p-1.5 rounded-lg">
            <CheckCircleOutlineIcon className="text-white text-base" />
          </div>
          <h3 className="text-base font-bold text-gray-800">
            Review Your Booking
          </h3>
        </div>

        <Paper
          elevation={0}
          className="p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200 rounded-xl mb-3"
        >
          <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm gap-2">
            <span className="text-xl">🏨</span>
            Booking Summary
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="bg-white/70 backdrop-blur-sm p-1 rounded-lg">
              <p className="font-semibold text-gray-500 text-xs mb-1">
                Service Name
              </p>
              <p className="font-bold text-gray-800 text-sm">
                {eventDetails?.serviceName || "N/A"}
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-1 rounded-lg">
              <p className="font-semibold text-gray-500 text-xs mb-1">
                Room Type
              </p>
              <p className="font-bold text-gray-800 text-sm">
                {eventDetails?.room || "N/A"}
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-1 rounded-lg">
              <p className="font-semibold text-gray-500 text-xs mb-1">
                Check-In
              </p>

              <p className="font-bold text-gray-800 text-sm">
                {formatDate(formData?.checkInDate)} at&nbsp;
                {formatTime(formData?.checkInTime)}
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-1 rounded-lg">
              <p className="font-semibold text-gray-500 text-xs mb-1">
                Check-Out
              </p>

              <p className="font-bold text-gray-800 text-sm">
                {formatDate(formData?.checkOutDate)} at&nbsp;
                {formatTime(formData?.checkOutTime)}
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-1 rounded-lg">
              <p className="font-semibold text-gray-500 text-xs mb-1">
                Total Adults
              </p>
              <p className="font-bold text-gray-800 text-sm">
                {totalAdults} Adult(s)
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-1 rounded-lg">
              <p className="font-semibold text-gray-500 text-xs mb-1">
                Total Children
              </p>
              <p className="font-bold text-gray-800 text-sm">
                {totalChildren} Child(ren)
              </p>
            </div>
          </div>
        </Paper>

        {totalAdults > 0 && (
          <Paper
            elevation={0}
            className="p-4 bg-white border border-gray-200 rounded-xl mb-3 shadow-sm"
          >
            <h4 className="font-bold text-gray-800 mb-3 text-sm">
              Adult Guest Breakdown
            </h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-blue-50 p-2 rounded-lg text-center">
                <p className="text-gray-600">Male</p>
                <p className="font-bold text-blue-800 text-lg">
                  {formData?.adultMale || 0}
                </p>
              </div>
              <div className="bg-pink-50 p-2 rounded-lg text-center">
                <p className="text-gray-600">Female</p>
                <p className="font-bold text-pink-800 text-lg">
                  {formData?.adultFemale || 0}
                </p>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg text-center">
                <p className="text-gray-600">Other</p>
                <p className="font-bold text-purple-800 text-lg">
                  {formData?.adultOther || 0}
                </p>
              </div>
            </div>
          </Paper>
        )}
        {totalChildren > 0 && (
          <Paper
            elevation={0}
            className="p-4 bg-white border border-gray-200 rounded-xl mb-3 shadow-sm"
          >
            <h4 className="font-bold text-gray-800 mb-3 text-sm">
              Child Guest Breakdown
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-green-50 p-2 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-gray-600">Age 0-6</p>
                  <Chip
                    label="FREE"
                    size="small"
                    className="bg-green-600 text-white font-bold text-xs"
                  />
                </div>
                <p className="font-bold text-green-800 text-lg">
                  {formData?.child0to6 || 0}
                </p>
              </div>
              <div className="bg-orange-50 p-2 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-gray-600">Age 7-12</p>
                  <Chip
                    label="50% OFF"
                    size="small"
                    className="bg-amber-600 text-white font-bold text-xs"
                  />
                </div>
                <p className="font-bold text-orange-800 text-lg">
                  {formData?.child7to12 || 0}
                </p>
              </div>
            </div>
          </Paper>
        )}

        {(formData?.extraBed || formData?.petAllowed) && (
          <Paper
            elevation={0}
            className="p-4 bg-white border border-gray-200 rounded-xl mb-3 shadow-sm"
          >
            <h4 className="font-bold text-gray-800 mb-3 text-sm">
              Additional Options
            </h4>
            <div className="space-y-2">
              {formData?.extraBed && (
                <div className="flex items-center justify-between bg-amber-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <HotelIcon className="text-amber-600 text-base" />
                    <span className="text-sm font-semibold text-gray-800">
                      Extra Bed (1 per room)
                    </span>
                  </div>
                  <Chip
                    label="75% Charge"
                    size="small"
                    sx={{
                      background: "#d97706",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                    }}
                  />
                </div>
              )}
              {formData?.petAllowed && (
                <div className="flex items-center justify-between bg-teal-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <PetsIcon className="text-teal-600 text-base" />
                    <span className="text-sm font-semibold text-gray-800">
                      Pet: {display(formData?.petType)}
                    </span>
                  </div>
                  <Chip
                    label="25% Charge"
                    size="small"
                    className="bg-teal-600 text-white font-bold text-xs"
                  />
                </div>
              )}
            </div>
          </Paper>
        )}

        <Paper
          elevation={0}
          className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl mb-3 shadow-sm"
        >
          <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm gap-2">
            <span className="text-emerald-600 text-base">₹</span>
            Pricing Information
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between bg-white/70 p-2 rounded-lg">
              <span className="font-semibold text-gray-600">
                Price Per Night : 
              </span>
              <span className="font-bold text-gray-800">
                ₹{formData?.pricePerNight || "N/A"}
              </span>
            </div>
            {formData?.including && (
              <div className="bg-white/70 p-2 rounded-lg">
                <p className="font-semibold text-gray-600 mb-1">Including : </p>
                <p className="text-gray-800">{formData.including}</p>
              </div>
            )}
            {formData?.excluding && (
              <div className="bg-white/70 p-2 rounded-lg">
                <p className="font-semibold text-gray-600 mb-1">Excluding : </p>
                <p className="text-gray-800">{formData.excluding}</p>
              </div>
            )}
          </div>
        </Paper>

        <Paper
          elevation={0}
          className="p-4 bg-white border border-gray-200 rounded-xl mb-3 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <h4 className="font-bold text-gray-800 text-sm">
              Primary Guest Details
            </h4>
          </div>

          <div className="space-y-2 bg-gray-50 p-3 rounded-lg text-xs">
            <div className="flex space-x-2 items-center">
              <span className="font-semibold text-gray-600">Name :</span>
              <span className="font-bold text-gray-800">
                {display(formData?.title)} {formData?.firstName}
                {formData?.lastName}
              </span>
            </div>
            <Divider />
            <div className="flex space-x-2 items-center">
              <span className="font-semibold text-gray-600">Booking For :</span>
              <span className="font-bold text-gray-800 capitalize">
                {display(formData?.bookingFor).replace("_", " ")}
              </span>
            </div>
          </div>
        </Paper>

        {additionalGuests?.length > 0 && (
          <Paper
            elevation={0}
            className="p-4 bg-white border border-gray-200 rounded-xl mb-3 shadow-sm"
          >
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
              <PersonAddIcon className="text-emerald-600 text-base" />
              Additional Guests ({additionalGuests.length})
            </h4>

            <div className="space-y-2">
              {additionalGuests.map((guest, index) => (
                <div
                  key={guest.id}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold w-8 h-8 rounded-lg flex items-center justify-center text-xs">
                      {index + 1}
                    </div>
                    <span className="font-bold text-gray-800 text-sm">
                      {guest.guestTitle} {guest.guestFirstName}
                      {guest.guestLastName}
                    </span>
                  </div>

                  {guest?.isBelow12 && (
                    <Chip
                      label="Below 12 years"
                      size="small"
                      className="bg-orange-100 text-orange-700 font-semibold text-xs"
                    />
                  )}
                </div>
              ))}
            </div>
          </Paper>
        )}
        <Paper
          elevation={0}
          className="p-4 bg-white border border-gray-200 rounded-xl mb-3 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-ayuMid p-1.5 rounded-lg">
              <EmailOutlinedIcon className="text-white text-xs" />
            </div>
            <h4 className="font-bold text-gray-800 text-sm">
              Contact Information
            </h4>
          </div>

          <div className="space-y-2 bg-gray-50 p-3 rounded-lg text-xs">
            <div className="flex space-x-2 items-center">
              <span className="font-semibold text-gray-600">Email :</span>
              <span className="font-bold text-gray-800">
                {formData?.email || "N/A"}
              </span>
            </div>
            <Divider />
            <div className="flex space-x-2 items-center">
              <span className="font-semibold text-gray-600">Mobile :</span>
              <span className="font-bold text-gray-800">
                {display(formData?.countryCode)} {formData?.mobileNumber}
              </span>
            </div>
          </div>
        </Paper>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Paper
          elevation={0}
          className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 border border-dashed border-gray-300 rounded-xl"
        >
          <h3 className="text-sm font-bold text-gray-800 mb-3">
            Additional Information (Optional)
          </h3>
          <div className="space-y-3">
            <InputField
              control={control}
              name="gstDetails"
              label="GST Number"
              placeholder="Enter GST number if applicable"
              error={errors.gstDetails}
            />
            <InputField
              control={control}
              name="specialRequests"
              label="Special Requests"
              placeholder="Any special requirements or preferences..."
              multiline
              rows={3}
              error={errors.specialRequests}
            />
          </div>
        </Paper>
      </motion.div>
    </motion.div>
  );
}
