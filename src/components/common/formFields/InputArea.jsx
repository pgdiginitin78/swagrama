import React from "react";
import { Controller } from "react-hook-form";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 10,
  border: `1px solid ${theme.palette.grey[300]}`,
  padding: "6px 14px",
  transition: "0.2s ease",
  "&:focus-within": {
    border: `2px solid ${theme.palette.primary.main}`,
  },
}));

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  resize: "none",
  border: "none",
  outline: "none",
  background: "transparent",
  paddingTop: "20px",
  paddingBottom: "10px",
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.body1.fontSize,
  lineHeight: theme.typography.body1.lineHeight,
  color: theme.palette.text.primary,
  overflowY: "auto",
}));

const StyledLabel = styled("label")(({ theme }) => ({
  position: "absolute",
  left: 14,
  top: 18,
  fontSize: 14,
  color: theme.palette.text.secondary,
  fontWeight: 500,
  pointerEvents: "none",
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
}));

const InnerTextarea = React.forwardRef(function InnerTextarea(
  { name, label, placeholder, minRows, maxRows, value, onChange, onBlur },
  ref,
) {
  const id = React.useId();
  const isFilled = (value ?? "").toString().length > 0;

  return (
    <Wrapper>
      <StyledTextarea
        id={id}
        name={name}
        ref={ref}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={isFilled ? placeholder : ""}
        minRows={minRows}
        maxRows={maxRows}
      />

      <StyledLabel
        htmlFor={id}
        style={{
          top: "8px",
          fontSize: "12px",
        }}
      >
        {label}
      </StyledLabel>
    </Wrapper>
  );
});

export default function InputArea({
  name,
  label,
  placeholder,
  defaultValue,
  control,
  minRows,
  maxRows,
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      render={({ field }) => (
        <InnerTextarea
          {...props}
          {...field}
          name={name}
          label={label}
          placeholder={placeholder}
          minRows={minRows}
          maxRows={maxRows}
        />
      )}
    />
  );
}
