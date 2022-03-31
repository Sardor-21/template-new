import React from "react";

const LessonTableStatusCode = () => {
  return (
    <div className="d-flex flex-wrap pb-2">
      <div className="d-flex align-items-center me-4 mb-2 mb-md-0">
        <button className="btn btn-warning pending me-2 h-100"></button>
        Dars kutilmoqda
      </div>
      <div className="d-flex align-items-center  me-4 mb-2 mb-md-0">
        <button className="btn btn-success accept me-2 h-100"></button>
        Dars o'tildi
      </div>
      <div className="d-flex align-items-center  me-4 mb-2 mb-md-0">
        <button className="btn btn-danger  reject me-2 h-100"></button>
        Dars o'tilmadi
      </div>
    </div>
  );
};

export default LessonTableStatusCode;
