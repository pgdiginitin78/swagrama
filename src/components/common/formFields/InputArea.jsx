import React from "react";
import { Controller } from "react-hook-form";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";

const Wrapper = styled("div")(({ theme, error }) => ({
  position: "relative",
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 5,
  border: `1px solid ${error ? theme.palette.error.main : theme.palette.grey[300]}`,
  padding: "6px 14px",
  transition: "0.2s ease",
  "&:focus-within": {
    border: `2px solid ${error ? theme.palette.error.main : theme.palette.primary.main}`,
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

const ErrorText = styled("p")(({ theme }) => ({
  margin: 0,
  marginTop: 4,
  fontSize: 12,
  color: theme.palette.error.main,
}));

const InnerTextarea = React.forwardRef(function InnerTextarea(
  {
    name,
    label,
    placeholder,
    minRows,
    maxRows,
    value,
    onChange,
    onBlur,
    disabled,
    error, // now an object like { type, message } from fieldState.error, or undefined
  },
  ref,
) {
  const id = React.useId();
  const isFilled = (value ?? "").toString().length > 0;
  const hasError = Boolean(error);

  return (
    <div>
      <Wrapper error={hasError}>
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
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
        />

        <StyledLabel
          htmlFor={id}
          style={{
            top: "8px",
            fontSize: "12px",
            color: disabled
              ? "lightgray"
              : hasError
                ? "#d32f2f" // theme.palette.error.main equivalent
                : "#000",
          }}
        >
          {label}
        </StyledLabel>
      </Wrapper>

      {hasError && <ErrorText id={`${id}-error`}>{error.message}</ErrorText>}
    </div>
  );
});

export default function InputArea({
  name,
  label,
  placeholder,
  defaultValue,
  control,
  minRows,
  disabled,
  maxRows,
  rules,
  ...props
}) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue || ""}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <InnerTextarea
          {...props}
          {...field}
          name={name}
          label={label}
          placeholder={placeholder}
          minRows={minRows}
          maxRows={maxRows}
          disabled={disabled}
          error={error}
        />
      )}
    />
  );
}
