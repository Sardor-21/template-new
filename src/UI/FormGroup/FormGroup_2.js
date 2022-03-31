import React from "react";

const FormGroup = ({
  label,
  value,
  setValue,
  type,
  name,
  error,
  className,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        value={value || ""}
        name={name}
        onChange={(e) => setValue(e)}
        className={`form-control  ${className}`}
      />
      {error && <p className="text-danger mt-2"> Bu joyni to'ldirish shart!</p>}
    </div>
  );
};

export default FormGroup;
