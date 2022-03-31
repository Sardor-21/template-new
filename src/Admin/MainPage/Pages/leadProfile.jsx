import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { AVATAR_01 } from "../../imagepath";
import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import Ratings from "../Main/rating";
import {
  single_lead,
  comment_User,
  UpdateStudent,
  TeacherList,
  mentorBooking,
  deleteLead,
  attach_mentor,
  getTeacherLeadProfile,
} from "../../Api";
import { getFreeTime } from "../../../Api";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";
import FormGroup from "../../UI/input/MyInput";
import MySelect from "../../UI/select/MySelect";
import { aboutUsdata, jobData, levelData } from "../../../Data";
import "bootstrap/dist/css/bootstrap.css";
import { useMemo } from "react";
import Free_time_calendar from "../../../components/free_time_calendar/free_time_calendar";
import conver_hour from "../../../hooks/conver_hour";
import { baseImageUrl } from "../../../Api/helpers/baseUrlImage";

const LeadProfile = () => {
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = useState({ iseditmodal: false });
  const [search, setSearch] = useState("");
  const [mentors, setMentors] = useState([]);

  const search_teachers = useMemo(() => {
    return mentors.filter(
      (v) =>
        v?.first_name.toLowerCase().includes(search.toLowerCase()) ||
        v?.last_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, mentors]);
  const editModalClose = () => {
    setState({ iseditmodal: false });
  };
  const { lead_id } = useParams();

  const [data, setData] = useState({});
  const [comment, setComment] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [job, setJob] = useState("Talaba");
  const [about_us, setAboutUs] = useState("Telegram");
  const [experience, setExperience] = useState("Boshlang'ich");
  const [target, setTarget] = useState("");
  const commentSubmit = (e) => {
    e.preventDefault();
    comment_User({ user_id: lead_id, comment }, lead_id, data?.role, setData);
    setComment("");
  };
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    getTeacherLeadProfile(setMentors);
    single_lead(lead_id, setData);
  }, [location.pathname]);

  const editLead = () => {
    setFirstName(data?.first_name);
    setLastName(data?.last_name);
    setPhoneNumber(data?.phone_number);
    setEmail(data?.email);
    setTelegram(data?.telegram_number);
    setBirthDate(data?.birth_date);
    setRegion(data?.region);
    setCountry(data?.country);
    setJob(data?.job ? data?.job : "Talaba");
    setExperience(data?.experience ? data?.experience : "Boshlang'ich");
    setAboutUs(data?.about_us ? data?.about_us : "Telegram");
    setTarget(data?.target);
    setState({ iseditmodal: true });
  };

  const updateLeadProfile = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("first_name", first_name);
    fd.append("last_name", last_name);
    fd.append("about_us", about_us);
    fd.append("phone_number", phone_number);
    fd.append("email", email);
    fd.append("telegram_number", telegram);
    fd.append("birth_date", birth_date);
    fd.append("region", region);
    fd.append("country", country);
    fd.append("job", job);
    fd.append("experience", experience);
    fd.append("target", target);
    UpdateStudent(fd, lead_id, setData);
  };

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [postData, setPostData] = useState({
    student_id: data?.user_id,
    teacher_id: "",
    course_name: "",
    date_id: "",
  });
  const openModal = (user_id, course_name) => {
    setModal(true);
    getFreeTime(user_id, setCalendar);
    setPostData({
      teacher_id: JSON.stringify(user_id),
      course_name: course_name,
      date_id: "",
    });
  };
  const closeModal = () => {
    setModal(false);
    setModal2(false);
  };

  const [active, setActive] = useState({});
  const time_choose = (idx, id, index) => {
    setPostData({
      ...postData,
      student_id: parseInt(lead_id),
      date_id: calendar[idx].dayOfWeek[id].hours[index]?.id,
      date: calendar[idx].dayOfWeek[id].day,
      time: calendar[idx].dayOfWeek[id].hours[index].time,
    });
    setActive({ ...active, idx, id, index });
  };

  // course_name: "IELTS";
  // date: "2022-02-23";
  // date_id: "495,d";
  // student_id: 278;
  // teacher_id: "189";
  // time: "16:00";

  const booking = () => {
    mentorBooking(postData, setModal);
  };

  const delete_lead = () => {
    deleteLead(
      { student_id: data?.student_id, user_id: data?.user_id },
      history
    );
  };

  const [teacher, setTeacher] = useState("");
  const [teacher_price, setTeacherPrice] = useState(0);
  const [count_lesson, setCountLesson] = useState(0);
  const [month_lesson_count, setMonthLessonCount] = useState(0);

  const openModal2 = (teacher_id) => {
    setModal2(true);
    let teacher = search_teachers.filter((v) => v.user_id == teacher_id)[0];
    setTeacher(teacher);
    setTeacherPrice(teacher.price);
  };

  const price_preview = (lesson_count) => {
    setCountLesson(lesson_count);
    setMonthLessonCount(lesson_count);
    setTeacherPrice(teacher.price * lesson_count);
  };

  const count_price_lesson = (lesson_count) => {
    setCountLesson(lesson_count);
    setTeacherPrice(teacher.price * lesson_count);
  };

  return (
    <div className="page-wrapper">
      <Modal isOpen={modal} toggle={closeModal} size="xl" centered={true}>
        <ModalHeader toggle={closeModal}>
          O'qituvchining bosh vaqtlari
        </ModalHeader>
        <ModalBody>
          <Free_time_calendar
            data={calendar}
            time_choose={time_choose}
            date_id={active}
          />
          <div className="col-12 d-flex justify-content-center px-2">
            <button className={`btn btn-primary`} onClick={booking}>
              Saqlash
            </button>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={modal2} toggle={closeModal} centered>
        <ModalHeader toggle={closeModal}>
          Doimiy darslarga biriktirish
        </ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="month-count">Oylik darslar soni</label>
                <select
                  className="form-control"
                  onChange={(e) => price_preview(e.target.value)}
                >
                  <option value="1">Tanlang</option>
                  <option value="8">Oyma-oy (haftada 2 marta)</option>
                  <option value="12">Oyma-oy (haftada 3 marta)</option>
                  <option value="16">Oyma-oy (haftada 4 marta)</option>
                  <option value="20">Oyma-oy (haftada 5 marta)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="lesson-count">Darslar soni</label>
                <input
                  type="number"
                  value={count_lesson || ""}
                  className="form-control"
                  onChange={(e) => count_price_lesson(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 d-flex align-items-center">
              <h4 className="m-0">{teacher_price} so'm</h4>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary mx-auto"
            onClick={() =>
              attach_mentor(
                {
                  student_id: parseInt(lead_id),
                  teacher_id: teacher.user_id,
                  count_lessons: parseInt(count_lesson),
                  month_lesson_count: parseInt(month_lesson_count),
                },
                setModal2
              )
            }
          >
            Saqlash
          </button>
        </ModalFooter>
      </Modal>

      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">Lead profili</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin/index">Admin</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/admin/lead">Lead</Link>
                </li>
                <li className="breadcrumb-item active">Lead profili</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-md-12">
            <div className="profile-header">
              <div className="row align-items-center">
                <div className="col-auto profile-image">
                  <a href="#">
                    <img
                      className="rounded-circle"
                      alt="User Image"
                      src={
                        data?.image
                          ? baseImageUrl + data?.image
                          : AVATAR_01
                      }
                    />
                  </a>
                </div>
                <div className="col ml-md-n2 profile-user-info">
                  <h4 className="user-name text-start text-black mb-0">
                    {data?.first_name} {data?.last_name}
                  </h4>
                  <h6 className="text-muted">{data?.email}</h6>
                  <div className="pb-3">
                    <i className="fa fa-map-marker" />{" "}
                    {data?.region ? data?.region : "Kiritilmagan"}
                  </div>
                  <div className="about-text">
                    {data?.target ? data?.target : "Kritilmagan"}
                  </div>
                </div>
                <div
                  className="col-auto profile-btn btn btn-danger"
                  onClick={delete_lead}
                >
                  <i className="fas fa-trash-alt"></i>
                </div>
              </div>
            </div>
            <div className="profile-menu">
              <ul className="nav nav-tabs nav-tabs-solid">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#per_details_tab"
                  >
                    Qisqacha ma'lumot
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#password_tab"
                  >
                    Parol
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#comment_tab">
                    "Comment" qoldirish
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#add_teacher_tab"
                  >
                    O'qituvchi biriktirish
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#teacher_tab">
                    O'qituvchilari
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content profile-tab-cont">
              {/* Personal Details Tab */}
              <div className="tab-pane fade show active" id="per_details_tab">
                {/* Personal Details */}
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title d-flex justify-content-between">
                          <span>Shaxsiy ma'lumotlari</span>
                          <a
                            className="edit-link"
                            data-toggle="modal"
                            onClick={editLead}
                            href="#edit_personal_details"
                          >
                            <i className="fa fa-edit mr-1" />
                            Taxrirlash
                          </a>
                        </h5>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">
                            Ism familiyasi
                          </p>
                          <p className="col-sm-10">
                            {data?.first_name} {data?.last_name}
                          </p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">
                            Tug'ilgan sanasi
                          </p>
                          <p className="col-sm-10">
                            {data?.birth_date
                              ? data?.birth_date
                              : "Kiritilmagan"}
                          </p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">
                            Email
                          </p>
                          <p className="col-sm-10">{data?.email}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0 mb-sm-3">
                            Telefon raqami
                          </p>
                          <p className="col-sm-10">{data?.phone_number}</p>
                        </div>
                        <div className="row">
                          <p className="col-sm-2 text-muted mb-0">Manzili</p>
                          <div className="col-sm-10 mb-0">
                            <p className="mb-1 fw-bold">Qayerdan</p>
                            <p className="mb-1">
                              {data?.region ? data?.region : "Kiritilmagan"}
                            </p>
                            <p className="mb-1 fw-bold">Hozir qayerda</p>
                            <p>
                              {data?.country ? data?.country : "Kiritilmagan"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Personal Details */}
              </div>
              {/* /Personal Details Tab */}
              {/* Change Password Tab */}
              <div id="password_tab" className="tab-pane fade">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Parolni o'zgartirish</h5>
                    <div className="row">
                      <div className="col-md-10 col-lg-6">
                        <form>
                          <div className="form-group">
                            <label>Yangi Parol</label>
                            <input type="password" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Parolni takrorlang</label>
                            <input type="password" className="form-control" />
                          </div>
                          <button className="btn btn-primary" type="submit">
                            Saqlash
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Add comment for mentee Tab */}
              <div id="comment_tab" className="tab-pane fade">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6  ">
                        <form onSubmit={commentSubmit}>
                          <div className="form-group">
                            <label>Izoh qoldirish</label>
                            <input
                              value={comment || ""}
                              onChange={(e) => setComment(e.target.value)}
                              type="text"
                              className="form-control"
                            />
                          </div>
                          <button
                            // onClick={addComment}
                            className={`btn btn-primary`}
                            type="submit"
                          >
                            Saqlash
                          </button>
                        </form>
                      </div>
                      <div className="col-md-6">
                        <div
                          style={{ cursor: "pointer" }}
                          className="p-3 mt-4 d-flex align-items-center"
                          onClick={() => setOpenComment(!openComment)}
                        >
                          Izohlarni ko'rish ({data?.comments?.length}) ta
                          <i
                            style={{
                              color: `#009DA6`,
                              transition: "0.5s ease",
                            }}
                            className={`fas fa-chevron-up ms-2 ${
                              openComment ? "rotate" : ""
                            }`}
                          ></i>
                        </div>
                      </div>
                      <div className={`col-12 mt-3`}>
                        {data?.comments?.length > 0
                          ? data?.comments?.map((value, index) => {
                              return (
                                <div
                                  key={index}
                                  style={{
                                    transition: ".5s ease",
                                  }}
                                  className={`card ${
                                    openComment
                                      ? "comment_open px-3 pt-2 my-2"
                                      : "comment_close"
                                  }`}
                                >
                                  <div className="card_body">
                                    <p>
                                      {index + 1}. {value.comment}
                                    </p>
                                  </div>
                                  <div className="card_footer text-end">
                                    <p className="mb-0">
                                      {value.created_at?.slice(0, 10)}
                                    </p>
                                    <small className="mb-0 text-secondary">
                                      {conver_hour(value.created_at)}
                                    </small>
                                  </div>
                                </div>
                              );
                            })
                          : "Hozircha izoh yoq !"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Change Password Tab */}
              <div id="add_teacher_tab" className="tab-pane fade">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12   admin-card overflow-auto ">
                        <div className="search_panel w-100 d-flex justify-content-center mb-3 align-items-center">
                          <input
                            type="text"
                            className="form-control w-100 admin-mentor-search"
                            placeholder="Qidiruv..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                        {search_teachers.length > 0 ? (
                          <table className="table table-hover table-center mb-0">
                            <thead>
                              <tr>
                                <th>Ism Familiyasi</th>
                                <th>Fanlari</th>
                                <th>Darajasi</th>
                                <th>Narxi</th>
                                <th>Biriktirish</th>
                              </tr>
                            </thead>
                            <tbody>
                              {search_teachers.map((v, i) => (
                                <tr key={i}>
                                  <td>
                                    <h2 className="table-avatar">
                                      <Link
                                        to={`/admin/mentor-profile/${v?.user_id}`}
                                        className="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          className="avatar-img rounded-circle"
                                          src={
                                            v.image
                                              ? `${baseImageUrl}${v.image}`
                                              : AVATAR_01
                                          }
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link
                                        to={`/admin/mentor-profile/${v?.user_id}`}
                                      >
                                        {v.first_name} {v.last_name}
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>{v.course_name}</td>
                                  <td>
                                    <Ratings rating={v.rating} />
                                  </td>
                                  <td>{v.price}</td>
                                  <td>
                                    <div className="btn-group ms-3">
                                      <button
                                        type="button"
                                        className="btn btn-primary text-white "
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      >
                                        Biriktirish
                                      </button>

                                      <ul
                                        className="dropdown-menu w-75"
                                        aria-labelledby="dropdownMenuButton1"
                                      >
                                        <li>
                                          <div
                                            className="dropdown-item"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              openModal(
                                                v.user_id,
                                                v.course_name
                                              )
                                            }
                                          >
                                            Sinov darsiga
                                          </div>
                                        </li>
                                        <li>
                                          <div
                                            className="dropdown-item"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              openModal2(v.user_id)
                                            }
                                          >
                                            Doimiy darslarga
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          "O'qituvchilar topilmadi"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="teacher_tab" className="tab-pane fade">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12   admin-card overflow-auto ">
                        <div className="search_panel w-100 d-flex justify-content-center mb-3 align-items-center">
                          <input
                            type="text"
                            className="form-control w-100 admin-mentor-search"
                            placeholder="Qidiruv..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                        {search_teachers.length > 0 ? (
                          <table className="table table-hover table-center mb-0">
                            <thead>
                              <tr>
                                <th>Ism Familiyasi</th>
                                <th>Fanlari</th>
                                <th>Darajasi</th>
                                <th>Narxi</th>
                                <th>Biriktirish</th>
                              </tr>
                            </thead>
                            <tbody>
                              {search_teachers.map((v, i) => (
                                <tr key={i}>
                                  <td>
                                    <h2 className="table-avatar">
                                      <Link
                                        to={`/admin/mentor-profile/${v?.user_id}`}
                                        className="avatar avatar-sm mr-2"
                                      >
                                        <img
                                          className="avatar-img rounded-circle"
                                          src={
                                            v.image
                                              ? `${baseImageUrl}${v.image}`
                                              : AVATAR_01
                                          }
                                          alt="User Image"
                                        />
                                      </Link>
                                      <Link
                                        to={`/admin/mentor-profile/${v?.user_id}`}
                                      >
                                        {v.first_name} {v.last_name}
                                      </Link>
                                    </h2>
                                  </td>
                                  <td>{v.course_name}</td>
                                  <td>
                                    <Ratings rating={v.rating} />
                                  </td>
                                  <td>{v.price}</td>
                                  <td>
                                    <div className="btn-group ms-3">
                                      <button
                                        type="button"
                                        className="btn btn-primary text-white "
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      >
                                        Biriktirish
                                      </button>

                                      <ul
                                        className="dropdown-menu w-75"
                                        aria-labelledby="dropdownMenuButton1"
                                      >
                                        <li>
                                          <div
                                            className="dropdown-item"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              openModal(
                                                v.user_id,
                                                v.course_name
                                              )
                                            }
                                          >
                                            Sinov darsiga
                                          </div>
                                        </li>
                                        <li>
                                          <div
                                            className="dropdown-item"
                                            style={{ cursor: "pointer" }}
                                            onClick={() =>
                                              openModal2(v.user_id)
                                            }
                                          >
                                            Doimiy darslarga
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          "O'qituvchilar topilmadi"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="modal-dialog-centered"
        isOpen={state.iseditmodal}
        toggle={() => editModalClose()}
      >
        <ModalHeader toggle={() => editModalClose()}>
          O'quvchi malumotlari
        </ModalHeader>
        <ModalBody>
          <form onSubmit={updateLeadProfile}>
            <div className="row form-row">
              <div className="col-12 col-sm-6">
                <FormGroup
                  label={"Ism"}
                  type={"text"}
                  value={first_name}
                  setValue={setFirstName}
                  className={"text-capitalize"}
                />
              </div>
              <div className="col-12 col-sm-6">
                <FormGroup
                  label={"Familiya"}
                  type={"text"}
                  value={last_name}
                  setValue={setLastName}
                  className={"text-capitalize"}
                />
              </div>
              <div className="col-12">
                <FormGroup
                  label={"Tug'ilgan sana"}
                  value={birth_date}
                  setValue={setBirthDate}
                  type={"date"}
                />
              </div>
              <div className="col-12 col-sm-6">
                <FormGroup
                  label={"Email"}
                  type={"email"}
                  value={email}
                  setValue={setEmail}
                />
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Telefon raqami</label>
                  <PhoneInput
                    international
                    defaultCountry="UZ"
                    value={phone_number}
                    onChange={setPhoneNumber}
                  />
                </div>
              </div>
              <div className="col-sm-12">
                <FormGroup
                  label={"Telegram akkauntingiz yoki raqamingiz"}
                  type={"text"}
                  value={telegram}
                  setValue={setTelegram}
                />
              </div>
              <div className="col-12 col-sm-6">
                <FormGroup
                  label={"Qayerdansiz"}
                  type={"text"}
                  value={region}
                  setValue={setRegion}
                />
              </div>
              <div className="col-12 col-sm-6">
                <FormGroup
                  label={"Hozir qayerdasiz"}
                  type={"text"}
                  value={country}
                  setValue={setCountry}
                />
              </div>
              <div className="col-12 col-sm-6">
                <MySelect
                  label={"Kasbingiz"}
                  array={jobData}
                  setValue={setJob}
                />
              </div>
              <div className="col-12 col-sm-6">
                <MySelect
                  label={"Hozirgi bilim darajangiz"}
                  array={levelData}
                  setValue={setExperience}
                />
              </div>
              <div className="col-12">
                <MySelect
                  label={"Biz haqimizda qayerdan eshitdingiz"}
                  array={aboutUsdata}
                  setValue={setAboutUs}
                />
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label>Maqsadingiz</label>
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="10"
                    value={target || ""}
                    onChange={(e) => setTarget(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Saqlash
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LeadProfile;
