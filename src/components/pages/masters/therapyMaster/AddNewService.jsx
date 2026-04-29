import React, { useState } from "react";
import { Box, Modal } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../../../common/formFields/InputField";
import DropdownField from "../../../common/formFields/DropdownField";
import RadioField from "../../../common/formFields/RadioField";
import InputArea from "../../../common/formFields/InputArea";
import CommonButton from "../../../common/button/CommonButton";
import CancelButtonModal from "../../../common/button/CancelButtonModal";
import { ModalStyle } from "../../../common/modalStyle/ModalStyle";
import PersonIcon from "@mui/icons-material/Person";
import CheckBoxField from "../../../common/formFields/CheckBoxField";
import { Spa } from "@mui/icons-material";

const dropdownObjectSchema = yup
  .object()
  .shape({
    id: yup.mixed().required(),
    label: yup.string().required(),
  })
  .nullable()
  .required("This field is required");

const validationSchema = yup.object().shape({
  selectServiceGroup: dropdownObjectSchema,
  serviceCategory: dropdownObjectSchema,
  serviceName: yup.string().trim().required("Required"),
  charges: yup
    .number()
    .transform((val, orig) => (orig === "" ? undefined : val))
    .typeError("Must be a number")
    .required("Required"),
  duration: dropdownObjectSchema,
  telemedService: yup.string().required("Required"),
  status: dropdownObjectSchema,
  isTherapy: yup.boolean(),
  isDoubles: yup.boolean(),
  localName: yup.string().trim().nullable(),
  slogan: yup.string().trim().nullable(),
  selectMedicines: yup.array().nullable(),
  selectRoom: yup.array().nullable(),
  uses: yup.string().nullable(),
  description: yup.string().nullable(),
  precautionsProcedures: yup.string().nullable(),
  mainProcedure: yup.string().nullable(),
  postProcedure: yup.string().nullable(),
  instrumentAndMaterials: yup.string().nullable(),
  instructionForPatient: yup.string().nullable(),
  instructionForRelatives: yup.string().nullable(),
  instructionForTherapist: yup.string().nullable(),
  cautiousnessPrecautions: yup.string().nullable(),
  contraindications: yup.string().nullable(),
  relatedDisordersAndRisks: yup.string().nullable(),
});

const DEFAULT_VALUES = {
  selectServiceGroup: null,
  serviceCategory: null,
  serviceName: "",
  charges: "",
  duration: null,
  telemedService: "no",
  status: null,
  isTherapy: false,
  isDoubles: false,
  localName: "",
  slogan: "",
  selectMedicines: [],
  selectRoom: [],
  uses: "",
  description: "",
  precautionsProcedures: "",
  mainProcedure: "",
  postProcedure: "",
  instrumentAndMaterials: "",
  instructionForPatient: "",
  instructionForRelatives: "",
  instructionForTherapist: "",
  cautiousnessPrecautions: "",
  contraindications: "",
  relatedDisordersAndRisks: "",
};

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

export default function AddNewService({ open, handleClose }) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  const isTherapy = watch("isTherapy");

  const handleReset = () => {
    reset(DEFAULT_VALUES);
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <Modal open={open}>
      <Box
        sx={ModalStyle}
        className="w-[95%] sm:w-[88%] lg:w-[78%] max-w-[900px] max-h-[92vh] rounded-2xl overflow-hidden flex flex-col"
      >
        <div className="bg-gradient-to-r from-teal-600 to-green-600 px-5 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-white font-bold text-[15px] sm:text-xl tracking-tight">
              Service / Therapy Creation
            </h1>
            <p className="text-teal-100 text-[11px] mt-0.5">
              Fill in the details to create a new service
            </p>
          </div>
          <CancelButtonModal onClick={handleClose} />
        </div>

        <div className="overflow-y-auto flex-1 bg-slate-50 p-3 sm:p-5">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <SectionCard
              icon={<PersonIcon sx={{ fontSize: 18 }} />}
              title="Service Details"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <DropdownField
                  control={control}
                  name="selectServiceGroup"
                  error={errors.selectServiceGroup}
                  placeholder="Select Service Group"
                />
                <DropdownField
                  control={control}
                  name="serviceCategory"
                  error={errors.serviceCategory}
                  placeholder="Service Category"
                />
                <InputField
                  control={control}
                  name="serviceName"
                  error={errors.serviceName}
                  label="Service Name"
                />
                <InputField
                  control={control}
                  name="charges"
                  error={errors.charges}
                  label="Charges"
                />
                <DropdownField
                  control={control}
                  name="duration"
                  error={errors.duration}
                  placeholder="Duration (in mins)"
                />
                <RadioField
                  control={control}
                  name="telemedService"
                  error={errors.telemedService}
                  label="Is This A Telemed Service"
                  dataArray={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />
                <DropdownField
                  control={control}
                  name="status"
                  error={errors.status}
                  placeholder="Status"
                />
                <CheckBoxField
                  control={control}
                  name="isTherapy"
                  label="Is Therapy?"
                />
                <CheckBoxField
                  control={control}
                  name="isDoubles"
                  label="Is Doubles?"
                />
                <InputField
                  control={control}
                  name="localName"
                  error={errors.localName}
                  label="Local Name"
                />
                <InputField
                  control={control}
                  name="slogan"
                  error={errors.slogan}
                  label="Slogan / Tagline"
                />
                <DropdownField
                  control={control}
                  name="selectMedicines"
                  error={errors.selectMedicines}
                  placeholder="Select Medicines"
                  isMultiSelect={true}
                />
                <DropdownField
                  control={control}
                  name="selectRoom"
                  error={errors.selectRoom}
                  placeholder="Select Room"
                  isMultiSelect={true}
                />
              </div>
            </SectionCard>

            {isTherapy && (
              <SectionCard icon={<Spa />} title={"Therapy Details"}>
                <div className="grid md:grid-cols-2 gap-2">
                  <InputArea
                    control={control}
                    name="uses"
                    error={errors.uses}
                    label="Uses / Indications"
                    minRows={2}
                    maxRows={3}
                  />
                  <InputArea
                    control={control}
                    name="description"
                    error={errors.description}
                    label="Description"
                    minRows={2}
                    maxRows={3}
                  />
                  <InputArea
                    control={control}
                    name="precautionsProcedures"
                    error={errors.precautionsProcedures}
                    label="Precautions"
                    minRows={2}
                    maxRows={3}
                  />
                  <InputArea
                    control={control}
                    name="mainProcedure"
                    error={errors.mainProcedure}
                    label="Main Procedure"
                    minRows={2}
                    maxRows={3}
                  />
                  <InputArea
                    control={control}
                    name="postProcedure"
                    error={errors.postProcedure}
                    label="Post Procedure"
                    minRows={2}
                    maxRows={3}
                  />
                  <InputArea
                    control={control}
                    name="instrumentAndMaterials"
                    error={errors.instrumentAndMaterials}
                    label="Instruments & Materials"
                    minRows={2}
                    maxRows={3}
                  />
                  <InputArea
                    control={control}
                    name="instructionForPatient"
                    error={errors.instructionForPatient}
                    label="Instruction For Patient"
                    minRows={2}
                    maxRows={3}
                  />
                  <InputArea
                    control={control}
                    name="instructionForRelatives"
                    error={errors.instructionForRelatives}
                    label="Instruction For Relatives"
                    minRows={2}
                    maxRows={3}
                  />
                  <InputArea
                    control={control}
                    name="instructionForTherapist"
                    error={errors.instructionForTherapist}
                    label="Instruction For Therapist"
                    minRows={2}
                    maxRows={3}
                  />
                  <InputArea
                    control={control}
                    name="cautiousnessPrecautions"
                    error={errors.cautiousnessPrecautions}
                    label="Cautiousness / Precautions"
                    minRows={2}
                    maxRows={3}
                  />
                  <InputArea
                    control={control}
                    name="contraindications"
                    error={errors.contraindications}
                    label="Contraindications"
                    minRows={2}
                    maxRows={3}
                  />
                  <InputArea
                    control={control}
                    name="relatedDisordersAndRisks"
                    error={errors.relatedDisordersAndRisks}
                    label="Related Disorders And Risks"
                    minRows={2}
                    maxRows={3}
                  />
                </div>
              </SectionCard>
            )}

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
                label="Save Service"
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
