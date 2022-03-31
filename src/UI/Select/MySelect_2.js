import React from "react";

const MySelect = ({ label, setValue, array, name, error }) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <select
        className="form-control"
        name={name}
        onChange={(e) => setValue(e)}
      >
        {array?.length > 0 &&
          array != {} &&
          array?.map((v, i) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
      </select>
      {error && <p className="text-danger mt-2"> Bu joyni to'ldirish shart!</p>}
    </div>
  );
};

export default MySelect;
