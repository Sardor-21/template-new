import React, { useState, useEffect } from "react";
import { USER } from "../../constant/imagepath_home";
// import ModalPage from "../components/modal/Modal";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  lesson_accepted,
  teacher_class_schedule,
  teacher_single_student,
  update_teacher_class_schedule,
} from "../../Api";
import TimeSelect from "../../UI/Select/TimeSelect";
import { modalTimeData } from "../../Data";
import notify from "../../hooks/notify";
import LessonTableStatusCode from "./components/lessonTableStatusCode";

const StudentProfile = () => {
  const [state, setState] = useState({
    isvoicecallmodal: false,
    isvideocallmodal: false,
    iseditModal: false,
  });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [theme, setTitle] = useState("");
  const [edit_modal, setEditModal] = useState(false);
  const [edit_lesson_id, setEditLessonId] = useState("");

  const location = useLocation();
  const userdata = useSelector((state) => state.Reducer.userdata);

  const student = useSelector((state) => state.Reducer.teacher_single_student);
  const { id, lesson_id } = useParams();
  useEffect(() => {
    teacher_single_student(id, lesson_id);
  }, [location.pathname]);
  const edit_time_and_date_and_title = (id) => {
    const lesson = student.lessons.filter((v) => v.id == id)[0];
    setTitle(lesson.theme);
    setDate(lesson.date);
    setTime(lesson.time);
    setEditLessonId(id);
    setEditModal(true);
  };

  const handleModalClose = () => {
    setEditModal(false);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Asosiy</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/mentor/mentee-list">O'quvchilarim</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    O'quvchi profili
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">O'quvchi profili</h2>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-10">
                {/* Mentor Widget */}
                <div className="card">
                  <div className="card-body">
                    <div className="row w-100 m-0 d-flex align-items-center justify-content-between">
                      <div className="col-12 col-sm-8 my-2">
                        <div className=" d-flex align-items-center flex-wrap justify-content-center justify-content-md-start">
                          <div className="mentor-img mr-0 d-flex flex-wrap flex-column flex-sm-row align-items-center justify-content-center">
                            {student?.student?.image ? (
                              <img
                                className="pro-avatar-image"
                                src={`https://teach-api.uz/teach-api/public/storage/${student?.student?.image}`}
                              />
                            ) : (
                              <div className="pro-avatar">
                                {student?.student?.first_name?.slice(0, 1)}
                                {student?.student?.last_name?.slice(0, 1)}
                              </div>
                            )}
                            <div className="mentor-details m-0">
                              <i className="fas fa-map-marker-alt me-2" />
                              {student?.student?.country
                                ? student?.student?.country
                                : "Kiritilmagan"}
                            </div>
                          </div>
                          <div className="user-info-cont d-flex align-items-center flex-column align-items-sm-start">
                            <h4 className="">
                              {student?.student?.first_name}{" "}
                              {student?.student?.last_name}
                            </h4>
                            <div className="mentor-action">
                              <p className="mentor-type social-title">
                                {student?.student?.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <div className="col-12 col-sm-4 my-2 respons-button d-flex align-items-center justify-content-center flex-wrap ">
                        <a href="#" className="blue-btn-radius">
                          Bog'lanish{" "}
                        </a>
                      </div> */}
                    </div>
                  </div>
                </div>
                {/* /Mentor Widget */}
                {/* Mentor Details Tab */}
                <div className="card">
                  <div className="card-body custom-border-card">
                    {/* About Details */}
                    <div className="widget about-widget custom-about mb-0">
                      <h4 className="widget-title">Qisqacha ma'lumot</h4>
                      <hr />
                      {student?.student?.target
                        ? student?.student?.target
                        : "Kiritilmagan"}
                    </div>
                    {/* /About Details */}
                  </div>
                </div>

                <div className="card">
                  <div className="card-body custom-border-card">
                    {/* Personal Details */}
                    <div className="widget education-widget mb-0">
                      <h4 className="widget-title">Shaxsiy malumotlari</h4>
                      <hr />
                      <div className="experience-box">
                        <ul className="experience-list profile-custom-list">
                          <li>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <span>Tug'ilgan sana</span>
                                <div className="row-result">
                                  {student?.student?.birth_date
                                    ? student?.student?.birth_date
                                    : "Kiritilmagan"}
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <span>Hozirgi bilim darajasi</span>
                                <div className="row-result">
                                  {student?.student?.experience
                                    ? student?.student?.experience
                                    : "Kiritilmagan"}
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <span>Kasbi</span>
                                <div className="row-result">
                                  {student?.student?.job
                                    ? student?.student?.job
                                    : "Kiritilmagan"}
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <span>Qayerdan</span>
                                <div className="row-result">
                                  {student?.student?.region
                                    ? student?.student?.region
                                    : "Kiritilmagan"}
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="experience-content">
                              <div className="timeline-content">
                                <span>Hozir qayerda</span>
                                <div className="row-result">
                                  {student?.student?.country
                                    ? student?.student?.country
                                    : "Kiritilmagan"}
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* /Personal Details */}
                  </div>
                </div>
                <div className="card">
                  <div className="card-body custom-border-card pb-0">
                    <h4 className="widget-title">
                      Mavzularni kiritish. Kiritishingiz mumkin bo'lgan darslar
                      soni:{" "}
                      <span className="text-primary">
                        {student.lesson_count}
                      </span>{" "}
                      ta
                    </h4>
                    <hr />
                    {/* Form Lesson Date and time */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        teacher_class_schedule(
                          {
                            theme,
                            time: time,
                            date,
                          },
                          id,
                          lesson_id
                        );
                      }}
                    >
                      <div className="row">
                        <div className="col-12 col-md-6">
                          <div className="form-group">
                            <label>Dars sanasi</label>
                            <input
                              defaultValue={date || ""}
                              onChange={(e) => setDate(e.target.value)}
                              type="date"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6">
                          <TimeSelect
                            label={"Dars vaqti"}
                            array={modalTimeData}
                            setValue={setTime}
                          />
                        </div>

                        <div className="col-12">
                          <div className="form-group">
                            <label>Mavzu</label>
                            <input
                              placeholder="Mavzu"
                              value={theme || ""}
                              onChange={(e) => setTitle(e.target.value)}
                              type="text"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-12 d-flex align-items-center justify-content-center p-3">
                          <button
                            className={`btn btn-primary ${
                              student.lesson_count == 0 && "disabled"
                            } `}
                            type="submit"
                          >
                            Saqlash
                          </button>
                        </div>
                      </div>
                    </form>
                    {/* /Form Lesson Date and time */}

                    {/* Table Date and Time */}
                    {student?.lessons?.length > 0 && (
                      <div className="tab-pane show active" id="mentee-list">
                        <div className="card card-table">
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>Dars sanasi</th>
                                    <th className="text-center">Dars vaqti</th>
                                    <th>Mavzu</th>
                                    <th className="text-center">Harakat</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {student?.lessons?.map((v, i) => (
                                    <tr key={i}>
                                      <td>{i + 1}</td>
                                      <td>{v.date}</td>
                                      <td className="text-center">
                                        <span
                                          className={`${
                                            (v.status == 14 && "pending") ||
                                            (v.status == 19 && "accept")
                                          }`}
                                        >
                                          {v.time}
                                        </span>
                                      </td>
                                      <td>{v.theme}</td>
                                      <td className="text-center">
                                        <div className="btn-group ms-3">
                                          <button
                                            type="button"
                                            className="btn btn-secondary text-white "
                                            data-toggle="dropdown"
                                            // aria-haspopup="true"
                                            // aria-expanded="false"
                                          >
                                            <i className="fas fa-edit"></i>
                                          </button>

                                          <ul
                                            className="dropdown-menu rounded-3"
                                            aria-labelledby="dropdownMenuButton1"
                                          >
                                            <li
                                              className={`w-100 d-block px-3 py-1 ${
                                                v.status == 19 && "disabled"
                                              }`}
                                              style={{ cursor: "pointer" }}
                                              onClick={() =>
                                                v.status == 19
                                                  ? notify({
                                                      text: "Tahrirlash mumkin emas",
                                                    })
                                                  : edit_time_and_date_and_title(
                                                      v.id
                                                    )
                                              }
                                            >
                                              Tahrirlash
                                            </li>
                                            <li
                                              className="w-100 d-block px-3 py-1 cursor_pointer"
                                              onClick={() =>
                                                lesson_accepted(
                                                  v.id,
                                                  id,
                                                  lesson_id
                                                )
                                              }
                                            >
                                              O'tildi
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* /Table Date and Time */}
                    <LessonTableStatusCode />
                  </div>
                </div>
                {/* /Mentor Details Tab */}
              </div>
              {/* /Mentor Widget */}
              {/* Mentor Details Tab */}
              {/* <ModalPage /> */}

              {/* /Mentor Details Tab */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
      {/* Voice Call Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={state.isvoicecallmodal}
        // toggle={() => voicecallmodalClose()}
      >
        <ModalBody>
          <div className="call-box incoming-box">
            <div className="call-wrapper">
              <div className="call-inner">
                <div className="call-user">
                  <img alt="User Image" src={USER} className="call-avatar" />
                  <h4>Jonathan Doe</h4>
                  <span>Connecting...</span>
                </div>
                <div className="call-items">
                  <a
                    href=""
                    className="btn call-item call-end"
                    student-dismiss="modal"
                    aria-label="Close"
                  >
                    <i className="material-icons">call_end</i>
                  </a>
                  <Link
                    to="/Pages/voice-call"
                    className="btn call-item call-start"
                  >
                    <i className="material-icons">call</i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* /Voice Call Modal */}
      {/* Video Call Modal */}
      <div className="modal fade call-modal" id="video_call">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              {/* Incoming Call */}
              <div className="call-box incoming-box">
                <div className="call-wrapper">
                  <div className="call-inner">
                    <div className="call-user">
                      <img
                        className="call-avatar"
                        src={USER}
                        alt="User Image"
                      />
                      <h4>Dr. Darren Elder</h4>
                      <span>Calling ...</span>
                    </div>
                    <div className="call-items">
                      <a
                        href=""
                        className="btn call-item call-end"
                        student-dismiss="modal"
                        aria-label="Close"
                      >
                        <i className="material-icons">call_end</i>
                      </a>
                      <Link
                        to="/Pages/video-call"
                        className="btn call-item call-start"
                      >
                        <i className="material-icons">videocam</i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Incoming Call */}
            </div>
          </div>
        </div>
      </div>
      {/* Edit Lesson Date and Time Modal */}
      <Modal
        className="modal-dialog-centered"
        isOpen={edit_modal}
        toggle={() => handleModalClose()}
      >
        <ModalHeader toggle={() => handleModalClose()}>Taxrirlash</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label>Dars sanasi</label>
                <input
                  type="date"
                  className="form-control"
                  value={date || ""}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <TimeSelect
                label={"Dars vaqti"}
                array={modalTimeData}
                setValue={setTime}
              />
            </div>
            <div className="col-12">
              <div className="form-group">
                <label> Mavzu </label>
                <input
                  className="form-control"
                  value={theme || ""}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                />
              </div>
            </div>
            <div className="col-12 d-flex align-items-center justify-content-center p-3">
              <button
                className="btn btn-primary"
                onClick={() =>
                  update_teacher_class_schedule(
                    {
                      theme,
                      date,
                      time,
                    },
                    edit_lesson_id,
                    id,
                    lesson_id,
                    handleModalClose,
                    setTitle,
                    setDate
                  )
                }
              >
                Saqlash
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* /Edit Lesson Date and Time Modal */}
      {/* Video Call Modal */}
    </div>
  );
};

export default StudentProfile;
