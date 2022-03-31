import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { AVATAR_01, USER } from "../../imagepath";
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { MdVerifiedUser } from "react-icons/md";
import {
  confirm_cancel_teacher,
  confirm_teacher,
  deleteTeacher,
  getSingleTeacher,
  comment_User,
  UpdateTeacher,
  verify_teacher,
} from "../../Api";
import { getCourses, getFreeTime } from "../../../Api";
import FormGroup from "../../UI/input/MyInput";
import MySelect from "../../UI/select/MySelect";
import PhoneInput from "react-phone-number-input";
import {
  aboutUsdata,
  experienceData,
  languageData,
  priceData,
} from "../../../Data";
import { useSelector } from "react-redux";
import AvatarImageCropper from "react-avatar-image-cropper";
// Import Swiper React components
import { Swiper } from "swiper/react/swiper";
import { SwiperSlide } from "swiper/react/swiper-slide";

import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import { baseImageUrl } from "../../../Api/helpers/baseUrlImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MentorProfile = () => {
  const history = useHistory();
  const [calendar, setCalendar] = useState([]);

  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [telegram_number, setTelegramNumber] = useState("");
  const [description, setDescription] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [language, setLanguage] = useState(["O'zbek"]);
  const [languages, setLanguages] = useState([]);
  const [graduate, setGraduate] = useState("");
  const [course_id, setCourseId] = useState(1);
  const [price, setPrice] = useState("");
  const [experience, setExperience] = useState("1-3");
  const [about_us, setAboutUs] = useState("Telegram");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [certificate, setCertificate] = useState("");
  const [imgmodal, setImgModal] = useState(false);
  const [resume, setResume] = useState("");
  const { mentor_id } = useParams();
  const location = useLocation();
  const [data, setData] = useState({});

  const edit = () => {
    const courses_id = courses_list.filter(
      (c) => c.name == data?.user?.course_name
    )[0]?.id;
    console.log(courses_id);
    setEmail(data?.user?.email);
    setFirstName(data?.user?.first_name);
    setLastName(data?.user?.last_name);
    setPhoneNumber(data?.user?.phone_number);
    setTelegramNumber(data?.user?.telegram_number);
    setDescription(data?.user?.description);
    setPrice(data?.user?.price ? data?.user?.price : 10000);
    setExperience(data?.user?.experience ? data?.user?.experience : "1-3");
    setCountry(data?.user?.country);
    setRegion(data?.user?.region);
    setAboutUs(data?.user?.about_us ? data?.user?.about_us : "Telegram");
    setGraduate(data?.user?.graduate);
    setBirthDate(data?.user?.birth_date);
    setCourseId(courses_id ? courses_id : 1);

    setState({ iseditmodal: true });
  };

  const apply = (file) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImgModal(false);
    };
    reader.readAsDataURL(file);
  };

  const courses_list = useSelector((state) => state.Reducer.courses_list);

  const handleLanguageAdd = (e) => {
    const languagea = [...languages];
    languagea.filter((v) => v == e).length == 0 && languagea.push(e);
    setLanguages(languagea);
    setLanguage(languagea);
  };

  const handleLanguageDelete = (p) => {
    const languaged = [...languages];
    const filterData = languaged.filter((v) => v !== p);
    setLanguages(filterData);
    setLanguage(languaged);
  };

  useEffect(() => {
    getSingleTeacher(mentor_id, setData);
    getFreeTime(mentor_id, setCalendar);
  }, [location.pathname]);

  useEffect(() => {
    getCourses();
  }, []);

  const [state, setState] = useState({
    iseditmodal: false,
  });
  const [comment, setComment] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const commentSubmit = (e) => {
    e.preventDefault();
    comment_User(
      { user_id: mentor_id, comment },
      mentor_id,
      data?.user?.role,
      setData
    );
    setComment("");
  };

  const editModalClose = () => {
    setState({ iseditmodal: false });
  };

  const deleteLanguages = (v) => {
    const clone = [...language];
    if (clone.length > 1) {
      setLanguage(clone?.filter((value) => value !== v));
    }
  };

  const save = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("email", email);
    fd.append("first_name", first_name);
    fd.append("last_name", last_name);
    fd.append("phone_number", phone_number);
    fd.append("telegram_number", telegram_number);
    fd.append("course_id", course_id);
    fd.append("price", price);
    fd.append("description", description);
    fd.append("experience", experience);
    fd.append("country", country);
    fd.append("region", region);
    fd.append("about_us", about_us);
    fd.append("graduate", graduate);
    fd.append("birth_date", birth_date);
    fd.append("language", language);
    fd.append("offert_price", 1);
    fd.append("resume", resume);
    fd.append("certificate", certificate);
    fd.append("image", image);
    UpdateTeacher(fd, mentor_id, setData);
  };

  const delete_user = () => {
    deleteTeacher(
      {
        user_id: mentor_id,
        teacher_id: null,
      },
      history
    );
  };

  const handleImg = () => {
    setImgModal(true);
  };
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col">
              <h3 className="page-title">O'qituvchi profili</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin/index">Admin</Link>
                </li>
                <li className="breadcrumb-item active">O'qituvchi profili</li>
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
                        data?.user?.image
                          ? baseImageUrl + data?.user?.image
                          : AVATAR_01
                      }
                    />
                  </a>
                </div>
                <div className="col ml-md-n2 profile-user-info">
                  <h4 className="user-name text-start text-black mb-0">
                    {data?.user?.first_name} {data?.user?.last_name}
                  </h4>
                  <h6 className="text-muted">{data?.user?.email}</h6>
                  <div className="pb-3">
                    <i className="fa fa-map-marker" />{" "}
                    {data?.user?.region ? data?.user?.region : "Kiritilmagan"}
                  </div>
                </div>
                <div className="col-auto d-flex flex-wrap justify-content-between flex-column">
                  <button
                    className={`btn btn-${
                      data?.user?.verified == 1 ? "success" : "secondary"
                    }`}
                    onClick={() => verify_teacher(mentor_id, setData)}
                  >
                    <MdVerifiedUser />
                  </button>
                  <button
                    className={`btn btn-${
                      data?.user?.status_id == 10 ? "success" : "secondary"
                    }  mt-2`}
                    onClick={() => {
                      data?.user?.status_id == 10
                        ? confirm_cancel_teacher(mentor_id, setData)
                        : confirm_teacher(mentor_id, setData);
                    }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button
                    className=" profile-btn btn btn-danger mt-2"
                    onClick={delete_user}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
                <div className="col-auto profile-btn"></div>
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
                  <a className="nav-link" data-toggle="tab" href="#time">
                    Bosh vaqtlari
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#students">
                    O'quvchilari
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
                          <span>Qisqacha malumot</span>
                          <a
                            className="edit-link"
                            data-toggle="modal"
                            onClick={edit}
                            href="#edit_personal_details"
                          >
                            <i className="fa fa-edit mr-1" />
                            Taxrirlash
                          </a>
                        </h5>
                        <div className="row">
                          <div className="col-sm-4 col-md-3 mb-0 mb-sm-3">
                            <p className="text-muted">Ism familiyasi</p>
                            <p>
                              {data?.user?.first_name} {data?.user?.last_name}
                            </p>
                          </div>
                          <div className="col-sm-4 col-md-3 mb-0 mb-sm-3">
                            <p className="text-muted">Tug'ilgan sanasi</p>
                            <p>
                              {data?.user?.birth_date
                                ? data?.user?.birth_date
                                : "Kiritilmagan"}
                            </p>
                          </div>
                          <div className="col-sm-4 col-md-3 mb-0 mb-sm-3">
                            <p className="text-muted">Email</p>
                            <p>{data?.user?.email}</p>
                          </div>
                          <div className="col-sm-4 col-md-3 mb-0 mb-sm-3">
                            <p className="text-muted">Telefon raqami</p>
                            <p>
                              {data?.user?.phone_number
                                ? data?.user?.phone_number
                                : "Kiritilmagan"}
                            </p>
                          </div>
                          <div className="col-sm-4 col-md-3 mb-0 mb-sm-3">
                            <p className="text-muted">Narxi</p>
                            <p>
                              {data?.user?.price
                                ? data?.user?.price + "so'm"
                                : "Kiritilmagan"}
                            </p>
                          </div>
                          <div className="col-sm-4 col-md-3 mb-0 mb-sm-3">
                            <p className="text-muted">Fan nomi</p>
                            <p>
                              {data?.user?.course_name
                                ? data?.user?.course_name
                                : "Kiritilmagan"}
                            </p>
                          </div>
                          <div className="col-sm-4 col-md-3 mb-0 mb-sm-3">
                            <p className="text-muted">Qayerdan</p>
                            <p>
                              {data?.user?.region
                                ? data?.user?.region
                                : "Kiritilmagan"}
                            </p>
                          </div>
                          <div className="col-sm-4 col-md-3 mb-0 mb-sm-3">
                            <p className="text-muted">Hozirgi manzili</p>
                            <p>
                              {data?.user?.country
                                ? data?.user?.country
                                : "Kiritilmagan"}
                            </p>
                          </div>
                          <div className="col-sm-4 col-md-3 mb-0 mb-sm-3">
                            <p className="text-muted"> Resume</p>
                            <p>
                              {data?.user?.resume ? (
                                <a
                                  href={`${baseImageUrl}${data?.user?.resume}`}
                                  download={`${baseImageUrl}${data?.user?.resume}`}
                                  target="_blank"
                                >
                                  Yuklash
                                </a>
                              ) : (
                                "Kiritilmagan"
                              )}
                            </p>
                          </div>
                          <div className="col-sm-4 col-md-3 mb-0 mb-sm-3">
                            <p className="text-muted"> Certificat</p>
                            <p>
                              {data?.user?.certificate ? (
                                <a
                                  href={`${baseImageUrl}${data?.user?.certificate}`}
                                  download={`${baseImageUrl}${data?.user?.certificate}`}
                                  target="_blank"
                                >
                                  Yuklash
                                </a>
                              ) : (
                                "Kiritilmagan"
                              )}
                            </p>
                          </div>
                          <div className="col-12">
                            <p className="text-muted"> O'qituvchi haqida</p>
                            <p>
                              {data?.user?.description
                                ? data?.user?.description
                                : `Kiritilmagan`}
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
                    <h5 className="card-title">Change Password</h5>
                    <div className="row">
                      <div className="col-md-10 col-lg-6">
                        <form>
                          <div className="form-group">
                            <label>Old Password</label>
                            <input type="password" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>New Password</label>
                            <input type="password" className="form-control" />
                          </div>
                          <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" />
                          </div>
                          <button className="btn btn-primary" type="submit">
                            Save Changes
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
                            <label>"Comment" qoldirish</label>
                            <input
                              type="text"
                              className="form-control"
                              value={comment || ""}
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </div>
                          <button className="btn btn-primary" type="submit">
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
                          Izohlarni ko'rish ({data?.adminComments?.length}) ta
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
                      <div className="col-md-12">
                        <div className={`col-12 mt-3`}>
                          {data?.adminComments?.length > 0
                            ? data?.adminComments?.map((value, index) => {
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
                                        {value.created_at.slice(0, 10)}
                                      </p>
                                      <small className="mb-0 text-secondary">
                                        {value.created_at.slice(11, 16)}
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
              </div>
              <div id="time" className="tab-pane fade">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12">
                        <div className="calendarMentor">
                          <Swiper navigation={true} className="mySwiper">
                            {calendar.length > 0 &&
                              calendar.map((v, i) => {
                                return (
                                  <SwiperSlide key={i}>
                                    <div className="card booking-schedule schedule-widget">
                                      {/* Schedule Header */}
                                      <div className="schedule-header">
                                        <div className="row">
                                          <div className="col-md-12">
                                            {/* Day Slot */}
                                            <div className="day-slot">
                                              <ul>
                                                {v.dayOfWeek.map((v, i) => (
                                                  <li key={i}>
                                                    <span>{v.weekDay}</span>
                                                    <span className="slot-date">
                                                      <small className="slot-year">
                                                        {v.day}
                                                      </small>
                                                    </span>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                            {/* /Day Slot */}
                                          </div>
                                        </div>
                                      </div>
                                      {/* /Schedule Header */}
                                      {/* Schedule Content */}
                                      <div className="schedule-cont">
                                        <div className="row">
                                          <div className="col-md-12">
                                            {/* Time Slot */}
                                            <div className="time-slot">
                                              <ul className="clearfix">
                                                {v.dayOfWeek.map((v, i) => {
                                                  return (
                                                    <li key={i}>
                                                      {v.hours.length > 0 &&
                                                      v.hours[0] !== null ? (
                                                        v.hours.map(
                                                          (value, index) => {
                                                            return (
                                                              <div
                                                                className="mb-2"
                                                                key={index}
                                                              >
                                                                {value !==
                                                                  null && (
                                                                  <div
                                                                    className={`timing`}
                                                                    key={index}
                                                                  >
                                                                    <span>
                                                                      {
                                                                        value?.time
                                                                      }
                                                                    </span>
                                                                  </div>
                                                                )}
                                                              </div>
                                                            );
                                                          }
                                                        )
                                                      ) : (
                                                        <div
                                                          className="timing"
                                                          key={i}
                                                          style={{
                                                            cursor: "pointer",
                                                          }}
                                                        >
                                                          <span>Vaqt yo'q</span>
                                                        </div>
                                                      )}
                                                    </li>
                                                  );
                                                })}
                                              </ul>
                                            </div>
                                            {/* /Time Slot */}
                                          </div>
                                        </div>
                                      </div>
                                      {/* /Schedule Content */}
                                    </div>
                                  </SwiperSlide>
                                );
                              })}
                          </Swiper>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="students" className="tab-pane fade">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>#ID</th>
                            <th>Ism familiyasi</th>
                            <th>Darslar soni</th>
                            <th>Telefon raqami</th>
                            <th>Darsga yozilgan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.students?.map((v, i) => {
                            return (
                              <tr key={i}>
                                <td>{v.student_id}</td>
                                <td>
                                  <h2 className="table-avatar">
                                    <Link
                                      to={`/admin/leadProfile/${v.student_id}`}
                                      className="avatar avatar-sm mr-2"
                                    >
                                      <img
                                        className="avatar-img rounded-circle"
                                        src={
                                          v?.image
                                            ? `${baseImageUrl}${v.image}`
                                            : USER
                                        }
                                        alt="User Image"
                                      />
                                    </Link>
                                    <Link
                                      to={`/admin/leadProfile/${v.student_id}`}
                                    >
                                      {v.first_name} {v.last_name}
                                    </Link>
                                  </h2>
                                </td>
                                <td>
                                  {v.count_lessons + "/" + v.end_count_lesson}
                                </td>
                                <td>{v.phone_number}</td>
                                <td>{v.created_at}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Change Password Tab */}
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="modal-dialog-centered "
        isOpen={state.iseditmodal}
        size="lg"
        toggle={() => editModalClose()}
      >
        <ModalHeader toggle={() => editModalClose()}>
          Shaxsiy ma'lumotlar
        </ModalHeader>
        <ModalBody>
          <form>
            <div className="row form-row">
              <div className="col-12">
                <div className="change-avatar">
                  <div className="profile-img">
                    <img
                      src={
                        imagePreview
                          ? imagePreview
                          : data?.user?.image
                          ? `${baseImageUrl}${data?.user?.image}`
                          : USER
                      }
                      alt="User Image"
                    />
                  </div>
                  <div className="upload-img">
                    <div className="change-photo-btn" onClick={handleImg}>
                      <span className="m-0">
                        <i className="fa fa-upload" />
                        Rasm yuklash
                      </span>
                    </div>
                    <small className="form-text text-muted">
                      Format:JPG, GIF yoki PNG. Maximum: 2MB
                    </small>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 mt-3">
                <FormGroup
                  type={"text"}
                  value={first_name}
                  setValue={setFirstName}
                  label={"Ism"}
                />
              </div>
              <div className="col-12 col-sm-6 mt-3">
                <FormGroup
                  type={"text"}
                  value={last_name}
                  setValue={setLastName}
                  label={"Familya"}
                />
              </div>
              <div className="col-12 col-sm-6">
                <FormGroup
                  type={"date"}
                  value={birth_date}
                  setValue={setBirthDate}
                  label={"Tug'ilgan sana"}
                />
              </div>
              <div className="col-12 col-sm-6">
                <FormGroup
                  type={"email"}
                  value={email}
                  setValue={setEmail}
                  label={"Email"}
                />
              </div>
              <div className="col-12 col-sm-6">
                <MySelect
                  label={"Fan nomi"}
                  setValue={setCourseId}
                  array={courses_list}
                />
              </div>

              <div className="col-12 col-sm-6">
                <label>Telefon raqam</label>
                <PhoneInput
                  international
                  defaultCountry="UZ"
                  value={phone_number}
                  onChange={setPhoneNumber}
                />
              </div>
              <div className="col-12 col-sm-6">
                <MySelect
                  label={"Tajribangiz"}
                  setValue={setExperience}
                  array={experienceData}
                />
              </div>

              <div className="col-12 col-sm-6">
                <FormGroup
                  type={"text"}
                  value={telegram_number}
                  setValue={setTelegramNumber}
                  label={"Telegram akkaunt yoki telefon raqamingiz"}
                />
              </div>

              <div className="col-12 col-sm-12">
                <MySelect
                  label={"Qaysi tillarda dars o'ta olasiz?"}
                  setValue={handleLanguageAdd}
                  itemDelete={handleLanguageDelete}
                  array={languageData}
                />
              </div>

              {language?.length > 0 && (
                <div className="col-12 d-flex flex-wrap my-3">
                  {language?.map((v) => (
                    <div className="mx-2 mb-2" key={v}>
                      {v}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => deleteLanguages(v)}
                        className="ms-1 text-danger"
                      >
                        <i className="fa fa-times"></i>
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="col-12 col-sm-12">
                <MySelect
                  label={"Bir soat darsingiz uchun qancha pul olmoqchisiz?"}
                  setValue={setPrice}
                  array={priceData}
                />
              </div>

              <div className="col-12 col-sm-6 mt-2">
                <MySelect
                  label={"Biz haqimizda qayerdan eshitdingiz?"}
                  setValue={setAboutUs}
                  array={aboutUsdata}
                />
              </div>

              <div className="col-12 col-sm-6">
                <FormGroup
                  type={"text"}
                  value={graduate}
                  setValue={setGraduate}
                  label={"Qayerni bitirgansiz yoki o'qiyabsiz?"}
                />
              </div>

              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Resume yuklash</label>
                  <input
                    className="form-control"
                    type={"file"}
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Sertifikat yuklash (agar bo'lsa)</label>
                  <input
                    className="form-control"
                    type={"file"}
                    onChange={(e) => setCertificate(e.target.files[0])}
                  />
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <FormGroup
                  type={"text"}
                  value={region}
                  setValue={setRegion}
                  label={"Qayerdansiz"}
                />
              </div>

              <div className="col-12 col-sm-6">
                <FormGroup
                  type={"text"}
                  value={country}
                  setValue={setCountry}
                  label={"Hozir qayerdasiz"}
                />
              </div>

              <div className="col-12 col-sm-12">
                <div className="form-group">
                  <label>
                    O’quvchilar sizni tanlashlari uchun o’zingizning dars o’tish
                    uslubingiz haqida to’liqroq ma’lumot bering. Sifatli e’lon
                    sifatli mijozlarni chaqiradi.
                  </label>
                  <textarea
                    className="form-control"
                    value={description || ""}
                    onChange={(e) => setDescription(e.target.value)}
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
            </div>
            <button
              onClick={save}
              type="submit"
              className="btn btn-primary btn-block mt-2"
            >
              Saqlash
            </button>
          </form>

          {imgmodal && (
            <div className={`modalimg`} onClick={() => setImgModal(false)}>
              <div
                style={{
                  borderRadius: "15px",
                  width: "250px",
                  height: "250px",
                  margin: "auto",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <AvatarImageCropper
                  text={"Rasm yuklash"}
                  setImgModal={setImgModal}
                  apply={apply}
                  isBack={true}
                />
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MentorProfile;
