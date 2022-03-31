import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import click from "../assets/payicon/click_01.png";
import payme from "../assets/payicon/payme_01.png";
import "bootstrap/dist/css/bootstrap.css";
import { baseImageUrl } from "../../Api/helpers/baseUrlImage";
import {
  comment_to_teacher,
  getFreeTime,
  getSingleTeacher,
  mentorBooking,
  student_my_order,
} from "../../Api";
import StarRatings from "react-star-ratings";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import useWindowSize from "../../hooks/useWindowSize";

import { USER } from "../../constant/imagepath_home";
import convert_date from "../../hooks/convert_date";
import scroll_to_top from "../../hooks/scroll_to_top";
import scroll_to_section from "../../hooks/scroll_to_section";
import Free_time_calendar from "../../components/free_time_calendar/free_time_calendar";
import { VERIFY_ICON } from "../../constant/imagepath_home";

const MentorBooking = () => {
  const [calendar, setCalendar] = useState([]);
  const { mentor_id } = useParams();
  const [data, setData] = useState({});
  const [reply_comment_id, setReplyCommentId] = useState(null);
  const [isModal, setModal] = useState(false);
  const scroll_section = useRef(null);
  const location = useLocation();
  const [comment, setComment] = useState("");
  const userdata = useSelector((state) => state.Reducer.userdata);
  const [booking_btn, setBookingBtn] = useState(-1);
  const [activeTime, setActive] = useState({});
  const [state, setState] = useState({
    student_id: userdata.user_id,
    teacher_id: mentor_id,
    course_name: data?.course_name,
    date_id: -1,
  });

  const time_choose = (idx, id, index) => {
    setState({
      student_id: userdata?.user?.user_id,
      teacher_id: mentor_id,
      course_name: data?.course_name,
      date_id: calendar[idx].dayOfWeek[id].hours[index]?.id,
      date: calendar[idx].dayOfWeek[id].day,
      time: calendar[idx].dayOfWeek[id].hours[index].time,
    });
    setActive({ ...activeTime, idx, id, index });
    setBookingBtn(idx);
  };

  const [payme_data, setPaymeData] = useState({});
  // const booking = () => {
  //   setModal(true)
  //   setBookingBtn(-1)
  // }
  // // const [page, setPage] = useState("");
  // const pay_student = (url) => {
  //   student_my_order({
  //     user_id: parseInt(userdata?.user?.user_id),
  //     mentee_first_name: userdata?.user?.first_name,
  //     mentee_last_name: userdata?.user?.last_name,
  //     teacher_id: parseInt(mentor_id),
  //     driver: url,
  //     amount: 40000,
  //     lesson_time: state.date + ' ' + state.time,
  //   })
  // }

  useEffect(() => {
    getSingleTeacher(mentor_id, setData);
    getFreeTime(mentor_id, setCalendar);
    if (location?.state?.comment) {
      scroll_to_section(scroll_section);
    } else {
      scroll_to_top();
    }
    localStorage.removeItem("teacher_booking_id");
  }, []);

  const close_modal = () => {
    setModal(false);
  };
  const cancel_reply_comment = () => {
    setReplyCommentId(null);
    setComment("");
  };

  return (
    <div>
      {/* <Modal isOpen={isModal} toggle={close_modal} centered>
        <ModalHeader toggle={close_modal}>To'lov tizimini tanlang</ModalHeader>
        <ModalBody>
          <div className="pay_click">
            <div
              className="card p-3 mb-0 me-2"
              style={{ borderRadius: '1rem' }}
              onClick={() => pay_student('click')}
            >
              <img src={click} alt="pay_icon" className="payIcon" />
              <small>Click orqali to'lash</small>
            </div>
            <div className="card p-3 mb-0" onClick={() => pay_student('payme')}>
              <img src={payme} alt="pay_icon" className="payIcon" />
              <small>Payme orqali to'lash</small>
            </div>
          </div>
          <div className="d-flex flex-column align-items-center mt-4">
            <h4>Sizda "Click" yoki "Payme" yo'qmi?</h4>
            <button
              className="btn btn-primary mx-auto"
              onClick={() => {
                mentorBooking(state, mentor_id, setCalendar, setModal)
                setActive({})
              }}
            >
              Boshqa usulda to'lash
            </button>
          </div>
        </ModalBody>
      </Modal> */}
      <Modal isOpen={isModal} toggle={close_modal} centered>
        <ModalBody>
          <div>
            <h3 className="text-center">
              Rahmat! Sizni sinov darsiga yozib qo’ydik, tez orada
              menejerlarimiz siz bilan bog’lanishadi.
            </h3>
            <button
              className="btn btn-primary mt-2 mx-auto d-block"
              onClick={() => {
                window.location.reload();
              }}
            >
              Tushunarli
            </button>
          </div>
        </ModalBody>
      </Modal>

      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/home">Asosiy</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    O'qituvchi kabineti
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">O'qituvchi kabineti</h2>
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

              <div className="card col-12  mr-auto ml-auto p-0">
                <div className="card-body">
                  <div className="mentor-widget justify-content-center flex-wrap row justify-content-sm-between">
                    <div className="col-12 col-sm-6 col-md-8">
                      <div className="d-flex justify-content-center flex-wrap align-items-center justify-content-md-start w-100">
                        <div className="mentor-img d-flex flex-wrap justify-content-center">
                          {data?.image ? (
                            <img
                              className="avatar pro-avatar"
                              src={`${baseImageUrl}${data?.image}`}
                              alt="avatar"
                            />
                          ) : (
                            <div className="pro-avatar">
                              {data?.first_name?.slice(0, 1)}
                              {data?.last_name?.slice(0, 1)}
                            </div>
                          )}
                          <div className="rating text-center">
                            <StarRatings
                              rating={data?.star_raytings}
                              starDimension="17px"
                              starSpacing="2px"
                              starRatedColor="yellow"
                            />
                          </div>

                          <div className="mentor-details m-0">
                            <p className="user-location m-0">
                              <i className="fas fa-map-marker-alt me-2" />
                              {data?.country ? data?.country : "Kiritilmagan"}
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column justify-content-center  justify-content-md-start  align-items-center align-items-md-start">
                          <h4 className="mb-0">
                            {data?.first_name} {data?.last_name}{" "}
                            {data?.verified && (
                              <img
                                src={VERIFY_ICON}
                                style={{ width: "20px", height: "20px" }}
                                alt="verify"
                              />
                            )}
                          </h4>
                          <p className="mentor-type mb-0">
                            {data?.course_name}
                          </p>
                          <div className="d-flex flex-wrap w-100 w-sm-75 justify-content-center justify-content-md-start">
                            <p className="mentor-type w-100 text-center text-md-left ">
                              {data?.email ? data?.email : "Kiritilmagan"}
                            </p>
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
                    <div className="col-12 col-sm-6 col-md-4">
                      <div className="d-flex align-items-center flex-wrap h-100 justify-content-center">
                        <div className="hireme-btn text-center">
                          <span className="hire-rate text-center pb-0">
                            {data?.price
                              ? data?.price + "so'm/ soat"
                              : "Kiritilmagan"}
                          </span>
                          <span className="text-center mentor-type">
                            Sinov darsi 40000 so'm
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Mentor Widget */}
              {/* Mentor Details Tab */}
              {/* Schedule Widget */}
              <div className="card">
                <div className="card-body custom-border-card pb-0">
                  <h4 className="widget-title">
                    O'qituvchining bo'sh vaqtini tanlash
                  </h4>
                  <p>
                    Quyidagi jadvaldan o'qituvchining bo'sh vaqtiga qarab sinov
                    darsi uchun vaqt tanlashingiz mumkin
                  </p>
                  <Free_time_calendar
                    data={calendar}
                    time_choose={time_choose}
                    date_id={activeTime}
                  />
                  <div className="submit-section mt-3 proceed-btn text-right">
                    <div className="row">
                      <div className="col-12 col-sm-6 d-flex  order-1 order-md-0 justify-content-center justify-content-md-start align-items-center">
                        <img className="payIcon me-3" src={click} alt="click" />
                        <img className="payIcon" src={payme} alt="payme" />
                      </div>
                      <div className="col-12 col-sm-6 d-flex align-items-center order-0 order-md-1 justify-content-center justify-content-md-end">
                        <div
                          className={`btn btn-primary submit-btn ${
                            booking_btn >= 0 ? "" : "disabled"
                          }`}
                          onClick={() => {
                            mentorBooking(
                              state,
                              mentor_id,
                              setCalendar,
                              setModal
                            );
                          }}
                        >
                          Sinov darsiga yozilish
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-body custom-border-card pb-0">
                  {/* About Details */}
                  <div className="widget about-widget custom-about mb-0">
                    <h4 className="widget-title">O'qituvchi haqida</h4>
                    <p className="mb-0 py-3 w-100">
                      {data?.description ? data?.description : "Kiritilmagan"}
                    </p>
                  </div>
                  {/* /About Details */}
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
                                {data?.graduate
                                  ? data?.graduate
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
                                {data?.course_name
                                  ? data?.course_name
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
                                {data?.certificate ? (
                                  <a
                                    href={baseImageUrl + data?.certificate}
                                    download={baseImageUrl + data?.certificate}
                                    target={"_blank"}
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
                                {data?.language
                                  ? data?.language
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
                                  {data?.experience
                                    ? data?.experience + "yil"
                                    : "Kiritilmagan"}
                                </span>{" "}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Tug'ilgan sanasi</span>
                              <div className="row-result">
                                {data?.birth_date
                                  ? data?.birth_date
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
                                {data?.country ? data?.country : "Kiritilmagan"}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Doimiy yashash manzili</span>
                              <div className="row-result">
                                {data?.region ? data?.region : "Kiritilmagan"}
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
              <div className="card" ref={scroll_section}>
                <div className="card-body custom-border-card">
                  {/* Location Details */}
                  <div className="widget awards-widget m-0">
                    <h4 className="widget-title">Commentlar</h4>
                    <hr />
                    {data?.comments?.length > 0 ? (
                      <div className="content">
                        <div className="container p-0 p-sm-2">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="doc-review review-listing">
                                {/* Review Listing */}
                                <ul className="comments-list">
                                  {/* Comment List */}

                                  {data?.comments?.map((v, i) => (
                                    <li key={i}>
                                      <div className="comment">
                                        <img
                                          className="avatar rounded-circle"
                                          alt="User Image"
                                          src={
                                            v.image
                                              ? `${baseImageUrl}${v.image}`
                                              : USER
                                          }
                                        />
                                        <div className="comment-body w-100">
                                          <div className="meta-data d-flex justify-content-between">
                                            <div>
                                              <span className="comment-author">
                                                {v.first_name +
                                                  " " +
                                                  v.last_name}
                                              </span>
                                              <span className="comment-date">
                                                {convert_date(v.created_at)}
                                              </span>
                                            </div>
                                            <div className="review-count rating">
                                              <StarRatings
                                                rating={5}
                                                starDimension="17px"
                                                starSpacing="0px"
                                                starRatedColor="yellow"
                                              />
                                            </div>
                                          </div>
                                          <p className="recommended">
                                            <i className="far fa-thumbs-up" />
                                            Tavsiya qilingan ustoz
                                          </p>
                                          <p className="comment-content">
                                            {v.content}
                                          </p>
                                          <div className="comment-reply">
                                            <span
                                              className="comment-btn cursor_pointer"
                                              onClick={() =>
                                                setReplyCommentId(v.id)
                                              }
                                            >
                                              <i className="fas fa-reply me-2" />
                                              Javob yozish
                                            </span>
                                            {reply_comment_id == v.id && (
                                              <div className="w-100 mt-2 mb-4">
                                                <div className="d-flex align-items-center">
                                                  <img
                                                    src={
                                                      userdata?.user?.image
                                                        ? `${baseImageUrl}${userdata?.user?.image}`
                                                        : USER
                                                    }
                                                    className="avatar rounded-circle mr-2"
                                                    alt="user"
                                                  />
                                                  <input
                                                    type="text"
                                                    value={comment || ""}
                                                    onChange={(e) =>
                                                      setComment(e.target.value)
                                                    }
                                                    className="form-control"
                                                    placeholder="Javob yozish"
                                                  />
                                                </div>
                                                <div className="text-right mt-2">
                                                  <button
                                                    className="btn btn-light mr-2"
                                                    onClick={
                                                      cancel_reply_comment
                                                    }
                                                  >
                                                    Bekor qilish
                                                  </button>
                                                  <button
                                                    className="btn btn-primary"
                                                    onClick={() =>
                                                      comment_to_teacher(
                                                        v.id,
                                                        {
                                                          student_id:
                                                            userdata.user
                                                              .user_id,
                                                          comment,
                                                        },
                                                        mentor_id,
                                                        setData,
                                                        cancel_reply_comment
                                                      )
                                                    }
                                                  >
                                                    Jo'natish
                                                  </button>
                                                </div>
                                              </div>
                                            )}

                                            <p className="recommend-btn">
                                              <span>Tavsiya qilasizmi?</span>
                                              <a href="#" className="like-btn">
                                                <i className="far fa-thumbs-up" />{" "}
                                                Ha
                                              </a>
                                              <a
                                                href="#"
                                                className="dislike-btn"
                                              >
                                                <i className="far fa-thumbs-down" />{" "}
                                                Yo'q
                                              </a>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      {/* Comment Reply */}
                                      {v?.reply?.length > 0 &&
                                        v?.reply?.map((reply, index) => (
                                          <ul
                                            className="comments-reply"
                                            key={index}
                                          >
                                            {/* Comment Reply List */}
                                            <li>
                                              <div className="comment">
                                                <img
                                                  className="avatar rounded-circle"
                                                  alt="User Image"
                                                  src={
                                                    reply.image
                                                      ? `${baseImageUrl}${reply.image}`
                                                      : USER
                                                  }
                                                />
                                                <div className="comment-body">
                                                  <div className="meta-data">
                                                    <span className="comment-author">
                                                      {reply.first_name +
                                                        " " +
                                                        reply.last_name}
                                                    </span>
                                                    <span className="comment-date">
                                                      {convert_date(
                                                        reply.created_at
                                                      )}
                                                    </span>
                                                  </div>
                                                  <p className="comment-content">
                                                    {reply.comment}
                                                  </p>
                                                </div>
                                              </div>
                                            </li>
                                            {/* /Comment Reply List */}
                                          </ul>
                                        ))}

                                      {/* /Comment Reply */}
                                    </li>
                                  ))}

                                  {/* /Comment List */}
                                </ul>
                                {/* /Comment List */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      "Commentlar mavjud emas"
                    )}
                  </div>
                  {/* /Location Details */}
                </div>
              </div>
              {/* /Mentor Details Tab */}
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default MentorBooking;
