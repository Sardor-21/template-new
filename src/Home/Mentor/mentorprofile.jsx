import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useSelector } from "react-redux";
import { modalTimeData } from "../../Data/index";
import TimeSelect from "../../UI/Select/TimeSelect";
import MyInput from "../../UI/Input/MyInput";
import { Swiper } from "swiper/react/swiper";
import { SwiperSlide } from "swiper/react/swiper-slide";
import StarRatings from "react-star-ratings";
import useWindowSize from "../../hooks/useWindowSize";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import {
  addFreeTime,
  getFreeTime,
  delete_free_time,
  add_free_week_time,
} from "../../Api";
import MySelect from "../../UI/Select/MySelect";
import { baseImageUrl } from "../../Api/helpers/baseUrlImage";

const MentorProfile = () => {
  const [isModal, setIsModal] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [week_id, setWeekId] = useState("1");
  const [calendar, setCalendar] = useState([]);
  const [table, setTable] = useState(1);
  const modalOpen = () => {
    setIsModal(true);
  };

  const modalClose = () => {
    setIsModal(false);
  };
  const userdata = useSelector((state) => state.Reducer.userdata);

  const addNewTime = (e) => {
    e.preventDefault();
    if (table == "1") {
      add_free_week_time(
        userdata.user.user_id,
        { week_id, time },
        setCalendar,
        modalClose
      );
      setWeekId("1");
    } else {
      if (time && date) {
        addFreeTime(
          { date, time },
          userdata.user.user_id,
          setCalendar,
          modalClose
        );
      }
    }
  };

  useEffect(() => {
    if (userdata) getFreeTime(userdata.user.user_id, setCalendar, modalClose);
  }, [userdata]);

  const { width, height } = useWindowSize();

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
                    <Link to="/mentor/dashboard">Umumiy</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Profili
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Profili</h2>
            </div>
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
                    <div
                      className={`col-12 col-sm-8 my-2 d-flex ${
                        width <= 575 && "flex-column"
                      } `}
                    >
                      <div className="mentor-img m-auto-tel mr-0 d-flex flex-wrap justify-content-center">
                        {userdata?.user?.image ? (
                          <img
                            className="pro-avatar-image"
                            src={`${baseImageUrl}${userdata?.user?.image}`}
                            alt="user_image"
                          />
                        ) : (
                          <div className="pro-avatar">
                            {userdata?.user?.first_name.slice(0, 1)}
                            {userdata?.user?.last_name.slice(0, 1)}
                          </div>
                        )}
                        <div className="rating text-center">
                          <StarRatings
                            rating={
                              userdata?.user?.rating
                                ? userdata?.user?.rating
                                : 0
                            }
                            starDimension="17px"
                            starSpacing="2px"
                            starRatedColor="#bd970a"
                          />
                        </div>
                        <div className="mentor-details m-0">
                          <p className="user-location text-center m-0">
                            <i className="fas fa-map-marker-alt me-2" />
                            {userdata?.user?.country
                              ? userdata?.user?.country
                              : "Kiritilmagan"}
                          </p>
                        </div>
                      </div>

                      <div className=" ">
                        <h4 className="  m-auto-tel">
                          {userdata?.user?.first_name}{" "}
                          {userdata?.user?.last_name}
                        </h4>
                        <div className="">
                          <p className="mentor-type m-auto-tel social-title">
                            {userdata?.user?.course_name}
                          </p>{" "}
                          <p className="mentor-type m-auto-tel social-title">
                            {userdata?.user?.email}
                          </p>
                          <div
                            className="w-100 d-flex justify-content-center justify-content-sm-start"
                            style={{ height: "40px" }}
                          >
                            <a
                              href="#infonmation-mentor"
                              className="btn-blue me-2"
                            >
                              <i className="fas fa-book-reader" />
                            </a>
                            <a href="#location" className="btn-blue me-2">
                              <i className="fas fa-map-marker-alt" />
                            </a>
                            <a href="#sectionTime" className="btn-blue">
                              <i className="fas fa-calendar-alt" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 pt-2 col-sm-4 my-2 respons-button d-flex align-items-center justify-content-center flex-wrap ">
                      <span className="hire-rate text-center">
                        {userdata?.user?.price ? userdata?.user?.price : 0} USZ
                        / soat
                      </span>
                      <Link
                        className="blue-btn-radius"
                        to="/mentor/profile-settings"
                      >
                        Tahrirlash
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Mentor Widget */}
              {/* Mentor Details Tab */}
              <div className="card">
                <div className="card-body custom-border-card">
                  {/* About Details */}
                  <div className="widget about-widget custom-about mb-0">
                    <h4 className="widget-title">Men haqimda</h4>
                    <hr />
                    {userdata?.user?.description}
                  </div>
                  {/* /About Details */}
                </div>
              </div>
              <div className="card" id="sectionTime">
                <div className="card-body custom-border-card">
                  <h4 className="card-title"> Dars vaqtlari</h4>
                  <div className="profile-box">
                    <div className="row">
                      <div className="col-lg-7 w-100">
                        <div className="form-group">
                          <label className="date-information-label">
                            Dars o'tish uchun bo'sh vaqtlaringizni shu yerdan
                            belgilashingiz mumkin
                          </label>
                          <select className="select form-control w-25">
                            <option>1 Soat</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 p-0">
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
                                                        {width > 695
                                                          ? v.day
                                                          : v.day?.slice(8)}
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
                                                                className={`timing text-white ${
                                                                  value ==
                                                                    null &&
                                                                  "d-none"
                                                                }`}
                                                                key={index}
                                                                style={{
                                                                  backgroundColor:
                                                                    "#1e88e5",
                                                                }}
                                                              >
                                                                <div className="timing_item">
                                                                  <div>
                                                                    {
                                                                      value?.time
                                                                    }
                                                                  </div>
                                                                  <div
                                                                    onClick={() =>
                                                                      delete_free_time(
                                                                        value?.id,
                                                                        userdata
                                                                          .user
                                                                          .user_id,
                                                                        setCalendar
                                                                      )
                                                                    }
                                                                  >
                                                                    <i className="fas fa-trash"></i>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            );
                                                          }
                                                        )
                                                      ) : (
                                                        <div
                                                          className="timing"
                                                          key={i}
                                                        >
                                                          <span>Bo'sh</span>
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
                        <div className="col-12 d-flex justify-content-end">
                          <button
                            className="btn btn-primary"
                            onClick={modalOpen}
                          >
                            Vaqt qo'shish
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card" id="infonmation-mentor">
                <div className="card-body custom-border-card pb-0">
                  {/* Qualification Details */}
                  <div className="widget experience-widget mb-0">
                    <h4 className="widget-title">Ma'lumoti va malakasi</h4>
                    <hr />
                    <div className="experience-box">
                      <ul className="experience-list profile-custom-list">
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Qayerni tugatgan (o'qiyapti)</span>
                              <div className="row-result">
                                {userdata?.user?.graduate
                                  ? userdata?.user?.graduate
                                  : "Kiritilmagan"}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Mutaxassisligi</span>
                              <div className="row-result">
                                {userdata?.user?.course_name
                                  ? userdata?.user?.course_name
                                  : "Kiritilmagan"}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Sertifikatlari</span>
                              <div className="row-result">
                                {userdata?.user?.certificate ? (
                                  <a
                                    href={
                                      baseImageUrl + userdata?.user?.certificate
                                    }
                                    download={
                                      baseImageUrl + userdata?.user?.certificate
                                    }
                                  >
                                    Yuklash
                                  </a>
                                ) : (
                                  "Kiritilmagan"
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Resume</span>
                              <div className="row-result">
                                {userdata?.user?.resume ? (
                                  <a
                                    href={baseImageUrl + userdata?.user?.resume}
                                    download={
                                      baseImageUrl + userdata?.user?.resume
                                    }
                                  >
                                    Yuklash
                                  </a>
                                ) : (
                                  "Kiritilmagan"
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Qaysi tilda dars o'tadi</span>
                              <div className="row-result">
                                {userdata?.user?.language
                                  ? userdata?.user?.language
                                  : "Kiritilmagan"}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Pedagogik tajribasi</span>
                              <div className="row-result">
                                <span>
                                  {userdata?.user?.experience
                                    ? userdata?.user?.experience + "yil"
                                    : "Kiritilmagan"}
                                </span>{" "}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Telefon raqami</span>
                              <div className="row-result">
                                {userdata?.user?.phone_number
                                  ? userdata?.user?.phone_number
                                  : "Kiritilmagan"}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Telegram</span>
                              <div className="row-result">
                                {userdata?.user?.telegram_number
                                  ? userdata?.user?.telegram_number
                                  : "Kiritilmagan"}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Tug'ilgan sanasi</span>
                              <div className="row-result">
                                {userdata?.user?.birth_date
                                  ? userdata?.user?.birth_date
                                  : "Kiritilmagan"}
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /Qualification Details */}
                </div>
              </div>
              <div className="card" id="location">
                <div className="card-body pb-1 custom-border-card">
                  {/* Location Details */}
                  <div className="widget awards-widget m-0">
                    <h4 className="widget-title">Manzil</h4>
                    <hr />
                    <div className="experience-box">
                      <ul className="experience-list profile-custom-list">
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Hozir qayerda yashaydi</span>
                              <div className="row-result">
                                {userdata?.user?.country
                                  ? userdata?.user?.country
                                  : "Kiritilmagan"}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Doimiy yashash manzili</span>
                              <div className="row-result">
                                {userdata?.user?.region
                                  ? userdata?.user?.region
                                  : "Kiritilmagan"}
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* /Location Details */}
                </div>
              </div>

              <div>
                {/* Breadcrumb */}

                {/* /Page Content */}
                {/* Add Time Slot Modal */}
                <Modal
                  className="modal-dialog-centered"
                  isOpen={isModal}
                  toggle={modalClose}
                >
                  <ModalHeader toggle={modalClose}>
                    {" "}
                    Bo'sh vaqtlaringizni belgilang
                  </ModalHeader>
                  <ModalBody>
                    <form>
                      <div className="hours-info">
                        <div className="row form-row hours-cont">
                          <div className="col-12 m-0 p-0">
                            <div className="form-group">
                              <label htmlFor="table" className="form-label">
                                Jadvalni tanlang
                              </label>
                              <select
                                className="form-control"
                                id="table"
                                onChange={(e) => setTable(e.target.value)}
                              >
                                <option value="1">
                                  Menda takrorlanuvchi jadval
                                </option>
                                <option value="2">
                                  Menda o'zgaruvchan jadval
                                </option>
                              </select>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="row form-row">
                              {table == "1" ? (
                                <div className="col-md-6">
                                  <MySelect
                                    setValue={setWeekId}
                                    label={"Hafta kuni"}
                                    array={[
                                      { id: "1", name: "Dushanba" },
                                      { id: "2", name: "Seshanba" },
                                      {
                                        id: "3",
                                        name: "Chorshanba",
                                      },
                                      {
                                        id: "4",
                                        name: "Payshanba",
                                      },
                                      { id: "5", name: "Juma" },
                                      { id: "6", name: "Shanba" },
                                      {
                                        id: "0",
                                        name: "Yakshanba",
                                      },
                                    ]}
                                  />
                                </div>
                              ) : (
                                table == "2" && (
                                  <div className="col-md-6">
                                    <label>Sana</label>
                                    <MyInput
                                      type={"date"}
                                      onChange={(e) => setDate(e.target.value)}
                                    />
                                  </div>
                                )
                              )}

                              <div className="col-md-6">
                                <TimeSelect
                                  label={"Soati"}
                                  array={modalTimeData}
                                  setValue={setTime}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="submit-section text-center">
                        <button
                          type="button"
                          onClick={(e) => addNewTime(e)}
                          className="btn btn-primary submit-btn"
                        >
                          Saqlash
                        </button>
                      </div>
                    </form>
                  </ModalBody>
                </Modal>
              </div>
              {/* /Mentor Details Tab */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;

{
  /* <Modal
        className="modal-dialog-centered"
        isOpen={state.isvoicecallmodal}
        toggle={() => voicecallmodalClose()}
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
                    data-dismiss="modal"
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
      </Modal> */
}

{
  /* <div className="modal fade call-modal" id="video_call">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
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
                        data-dismiss="modal"
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
            </div>
          </div>
        </div>
      </div> */
}
