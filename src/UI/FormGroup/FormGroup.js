import React from "react";

const FormGroup = ({
  label,
  value,
  setValue,
  type,
  error,
  className,
  eye,
  inputType,
  changeInputPassword,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={inputType ? inputType : type}
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
        className={`form-control  ${className}`}
      />
      {eye && (
        <span
          style={{ marginRight: "10px" }}
          className={`mt-2 ${
            inputType == "password" ? "fas fa-eye " : "fas fa-eye-slash"
          } toggle-password`}
          onClick={changeInputPassword}
        />
      )}
      {error && <p className="text-danger mt-2"> Bu joyni to'ldirish shart!</p>}
    </div>
  );
};

export default FormGroup;
