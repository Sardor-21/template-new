import React, { useEffect, useState } from "react";
// import { Helmet } from "react-helmet";

import { USER, VERIFY_ICON } from "../../constant/imagepath_home";
import Sidebar from "./sidebar";
import StickyBox from "react-sticky-box";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";
import { FormGroup } from "reactstrap";
import StarRatings from "react-star-ratings";
import { getTopTeachers } from "../../Api";
import convert_date from "../../hooks/convert_date";
import { baseImageUrl } from "../../Api/helpers/baseUrlImage";

const MenteeDashboard = () => {
  const [more, setMore] = useState(false);
  const router = useHistory();
  const [phoneNumber, setPhoneNumber] = useState();
  const moreInfo = (id) => {
    setMore(id);
  };
  useEffect(() => {
    getTopTeachers();
    localStorage.removeItem("category_teacher");
  }, []);
  const teacher_list = useSelector((state) => state.Reducer.top_teacher_list);

  return (
    <>
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
                    <li className="breadcrumb-item active" aria-current="page">
                      Umumiy
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">Umumiy</h2>
              </div>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Page Content */}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-5 col-lg-4 col-xl-3">
                {/* Sidebar */}
                <StickyBox offsetTop={20} offsetBottom={20}>
                  <Sidebar />
                </StickyBox>
                {/* /Sidebar */}
              </div>
              <div className="col-md-7 col-lg-8 col-xl-9 mt-3 mt-sm-0">
                <div className="row">
                  <div className=" col-md-12 col-lg-3 dash-board-list blue">
                    <div className="dash-widget">
                      <div className="circle-bar">
                        <div className="icon-col">
                          <i className="fas fa-calendar-check" />
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h3>0</h3>
                        <h6>Hamma darslar</h6>
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-12 col-lg-3 dash-board-list yellow">
                    <div className="dash-widget">
                      <div className="circle-bar">
                        <div className="icon-col">
                          <i className="fas fa-star" />
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h3>0</h3>
                        <h6>Shu oyda o'tildi</h6>
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-12 col-lg-3 dash-board-list pink">
                    <div className="dash-widget">
                      <div className="circle-bar">
                        <div className="icon-col">
                          <i className="fas fa-graduation-cap" />
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h3>0</h3>
                        <h6>Qoldirilgan darslar</h6>
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-12 col-lg-3 dash-board-list yellow">
                    <div className="dash-widget">
                      <div className="circle-bar">
                        <div className="icon-col">
                          <i className="fas fa-users" />
                        </div>
                      </div>
                      <div className="dash-widget-info">
                        <h3>0</h3>
                        <h6>Mening do'stlarim</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 p-0 p-md-3">
                    <div className="card">
                      <div className="card-header d-flex justify-content-between align-items-center">
                        <h4 className="card-title">Umumiy </h4>{" "}
                        <Link to={"#"} className="text-info">
                          My Teacher Lug'at <i className="fas fa-arrow-right" />
                        </Link>
                      </div>
                      <div className="card-body p-0 p-md-2">
                        <div className="p-2">
                          <ul className="nav nav-tabs  nav-tabs-bottom nav-justified responseMentee text-start">
                            <li className="nav-item text-start">
                              <a
                                className="nav-link active"
                                href="#bottom-justified-tab1"
                                data-toggle="tab"
                              >
                                O'qituvchi tanlash
                              </a>
                            </li>
                            <li className="nav-item text-start">
                              <a
                                className="nav-link default"
                                href="#bottom-justified-tab2"
                                data-toggle="tab"
                              >
                                {" "}
                                Do'stlarni taklif qilish
                              </a>
                            </li>
                            <li className="nav-item text-start">
                              <a
                                className="nav-link"
                                href="#bottom-justified-tab3"
                                data-toggle="tab"
                              >
                                {" "}
                                My teacher lug'at
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="tab-content">
                          <div
                            className="tab-pane show active"
                            id="bottom-justified-tab1"
                          >
                            {/* MAVZULAR  */}
                            <div className="row m-0 p-0">
                              {teacher_list
                                ? teacher_list.map((v, i) => {
                                    return (
                                      <div
                                        className=" col-12 p-0 p-md-2  card-mentors-lg"
                                        key={i}
                                      >
                                        <div className="card rounded-3">
                                          <div className="card-body user_widged">
                                            <div className="user_info_box">
                                              <div className="info_left">
                                                {v?.verified && (
                                                  <div className="verified-icon">
                                                    <img
                                                      src={VERIFY_ICON}
                                                      style={{
                                                        width: "10px",
                                                        height: "10px",
                                                      }}
                                                      alt="verify"
                                                    />
                                                  </div>
                                                )}
                                                <Link
                                                  to={`/mentor/booking/${v.user_id}`}
                                                >
                                                  <img
                                                    src={
                                                      v.image
                                                        ? baseImageUrl + v.image
                                                        : USER
                                                    }
                                                    className="user_image"
                                                    alt="User Image"
                                                  />
                                                </Link>
                                                <div className="text info_box_rating">
                                                  <StarRatings
                                                    rating={
                                                      v?.star_raytings
                                                        ? v?.star_raytings
                                                        : 0
                                                    }
                                                    starDimension="17px"
                                                    starSpacing="0px"
                                                    starRatedColor="#bd970a"
                                                  />
                                                  <span className="d-inline-block average-rating mb-0">
                                                    ({v?.star_raytings_count})
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="info_right">
                                                <h2 className="user_name">
                                                  <Link
                                                    to={`/mentor/booking/${v.user_id}`}
                                                  >
                                                    {v?.first_name +
                                                      " " +
                                                      v?.last_name}{" "}
                                                  </Link>
                                                </h2>
                                                <div className="info_box">
                                                  <div className="info_box_left">
                                                    <p className="text">
                                                      <i className="fas fa-book text-black "></i>
                                                      {v?.course_name
                                                        ? v?.course_name
                                                        : "Kiritilmagan"}
                                                    </p>
                                                    <p className="text">
                                                      <i className="fas fa-wallet text-black"></i>{" "}
                                                      {v?.price
                                                        ? v?.price
                                                        : "0"}{" "}
                                                      UZS
                                                    </p>
                                                    <div className="text info_box_rating d-flex align-items-center">
                                                      <StarRatings
                                                        rating={
                                                          v?.star_raytings
                                                            ? v?.star_raytings
                                                            : 0
                                                        }
                                                        starDimension="17px"
                                                        starSpacing="0px"
                                                        starRatedColor="#bd970a"
                                                      />
                                                      <span className="d-inline-block average-rating mb-0">
                                                        (
                                                        {v?.star_raytings_count}
                                                        )
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="info_box_right">
                                                    <p className="text">
                                                      {" "}
                                                      <i className="fas fa-comment text-black" />{" "}
                                                      <span>
                                                        {v?.comments_count}
                                                      </span>{" "}
                                                      ta fikr
                                                    </p>
                                                    <p className="text">
                                                      {" "}
                                                      <i className="fas fa-user-graduate text-black" />{" "}
                                                      {v?.student_count}
                                                      ta o'quvchi
                                                    </p>
                                                    <div className="text">
                                                      <i className="fas fa-heart text-black" />{" "}
                                                      {v?.loyalty}% sodiqlik
                                                      <div className="far fa-question-circle loyalty ps-1 text-black m-0">
                                                        <div
                                                          className={
                                                            "loyalty_message"
                                                          }
                                                        >
                                                          Sodiqlik darajasi
                                                          ko’rsatkichi -
                                                          o’qituvchining o’z
                                                          o’quvchilarini
                                                          qanchalik olib
                                                          qolishi, ya’ni umumiy
                                                          kurs muddatini
                                                          oxirigacha yetkazib
                                                          hamma darslarni to’liq
                                                          o’tishi indeksi
                                                          hisoblanadi.
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="user_description">
                                              <p
                                                className={`text  ${
                                                  more == v.user_id
                                                    ? "show"
                                                    : ""
                                                }`}
                                              >
                                                {v?.description}
                                              </p>
                                              {v?.comments?.length > 0 ? (
                                                <div
                                                  className={
                                                    more == v.user_id
                                                      ? "about_message"
                                                      : "d-none"
                                                  }
                                                >
                                                  <div className="row w-100 m-0">
                                                    <div className="col-6 d-flex align-items-center p-0">
                                                      <img
                                                        style={{
                                                          width: "20px",
                                                          height: "20px",
                                                          borderRadius: "50%",
                                                        }}
                                                        src={
                                                          v?.comments[0].image
                                                            ? baseImageUrl +
                                                              v?.comments[0]
                                                                .image
                                                            : USER
                                                        }
                                                        alt="user"
                                                      />
                                                      <p className="user_message_name mb-0  ms-3">
                                                        {
                                                          v?.comments[0]
                                                            .first_name
                                                        }{" "}
                                                        {
                                                          v?.comments[0]
                                                            .last_name
                                                        }
                                                      </p>
                                                    </div>
                                                    <div className="col-6 text-end p-0">
                                                      <p className="m-0">
                                                        {convert_date(
                                                          v?.comments[0]
                                                            .created_at
                                                        )}
                                                      </p>
                                                    </div>
                                                  </div>
                                                  <div className="d-block w-100 mt-3">
                                                    <p className="m-0 user_message_text">
                                                      {v?.comments[0].content}
                                                      <br />

                                                      <span
                                                        className="more text-primary mt-3"
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                        onClick={() =>
                                                          router.push(
                                                            `/mentor/booking/${v.user_id}`,
                                                            {
                                                              comment:
                                                                "comment_section",
                                                            }
                                                          )
                                                        }
                                                      >
                                                        Barcha fikrlar
                                                      </span>
                                                    </p>
                                                  </div>
                                                </div>
                                              ) : (
                                                <div
                                                  className={
                                                    more == v.user_id
                                                      ? "about_message"
                                                      : "d-none"
                                                  }
                                                >
                                                  Fikirlar mavjud emas
                                                </div>
                                              )}
                                              <div className="info_show">
                                                {more == v.user_id ? (
                                                  <p
                                                    onClick={() => moreInfo(0)}
                                                  >
                                                    Yopish
                                                  </p>
                                                ) : (
                                                  <p
                                                    onClick={() =>
                                                      moreInfo(v.user_id)
                                                    }
                                                  >
                                                    Batafsil
                                                  </p>
                                                )}
                                              </div>
                                            </div>
                                            <div className="mentor-booking w-100 d-flex justify-content-end">
                                              <Link
                                                className="apt-btn p-1 "
                                                to={`/mentor/booking/${v.user_id}`}
                                              >
                                                Band qilish
                                              </Link>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Mentor Widget */}
                                      </div>
                                    );
                                  })
                                : "loading..."}
                            </div>

                            <div className=" col-12 load-more text-center">
                              <Link
                                className="btn btn-primary btn-sm"
                                to="/mentee/search/6"
                              >
                                Yana ko'rish
                              </Link>
                            </div>
                            {/* MAVZULAR  */}
                          </div>
                          <div className="tab-pane" id="bottom-justified-tab2">
                            <div>
                              <h3>Ham pul ishlang, ham bilim ulashing!</h3>
                              <p>
                                MyTeacher platformasiga andriod mobil ilova
                                orqali siz o'z yaqinlaringizni taklif qilgan
                                holda, qo'shimcha daromad olishingiz (siz
                                to'plagan pul kartangizga o'tqazib beriladi),
                                yoki yig'gan pullaringizni Myteacherda darslar
                                sotib olish uchun ishlatishingiz mumkin. Xo'sh,
                                bu qanday ishlaydi? <br /> <br />
                                <span className="py-4">
                                  1. Siz yaqin kishingizdan MyTeacher ilovasni
                                  yuklab olishlarini so'raysiz; <br />
                                  2. Ushbu bo'limda do'stingizning myteacherda
                                  ro'yxatdan o'tgan telefon raqamini kirgizasiz;{" "}
                                  <br />
                                  3. TAKLIF QILISH tugmasini bosasiz. <br />
                                  <br />{" "}
                                </span>
                                Shundan so'ng do'stingiz, o'z telefonidagi
                                MyTeacher ilovasi orqali kelgan taklifnomani
                                qabul qiladi va sizning hisobingizga 1000 so'm
                                yoziladi. Siz o'z ishlab topgan pullaringizni
                                50ming so'mga yetganda kartangizga yechib
                                olishingiz, uni jamg'arishingiz, yoki bo'lmasa
                                MyTeacherdan darslar sotib olish uchun
                                ishlatishingiz mumkin bo'ladi.
                              </p>
                            </div>
                            <FormGroup className="d-flex justify-content-center align-items-center">
                              <PhoneInput
                                international
                                defaultCountry="UZ"
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                              />

                              <button
                                type="submit"
                                className="btn ms-2 share-friend-button btn-primary"
                              >
                                Yuborish
                              </button>
                            </FormGroup>
                          </div>
                          <div className="tab-pane" id="bottom-justified-tab3">
                            <textarea
                              name="transletor"
                              id="transletor"
                              className="w-100 textArea p-3"
                              cols="30"
                              rows="10"
                            ></textarea>
                            <div className="transletor-answer p-3"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-12">
                    <h4 className="mb-4">Mavzular</h4>

                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default MenteeDashboard;
