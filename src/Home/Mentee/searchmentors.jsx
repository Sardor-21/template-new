import React, { useEffect, useState, useMemo } from "react";
import { USER, VERIFY_ICON } from "../../constant/imagepath_home";
import StickyBox from "react-sticky-box";
import { Link, withRouter, useParams, useHistory } from "react-router-dom";
import { getAllTeachers, getCategoryTeachers } from "../../Api";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import convert_date from "../../hooks/convert_date";
import { baseImageUrl } from "../../Api/helpers/baseUrlImage";
// import { Avatar } from "antd";
// import { Checkbox, FormControlLabel } from "@mui/material";

const Search = () => {
  const router = useHistory();
  const [more, setMore] = useState(false);
  const { id } = useParams();
  const top_teacher_list = useSelector(
    (state) => state?.Reducer.top_teacher_list
  );

  const userdata = useSelector((state) => state?.Reducer.userdata);
  const filterCourses = useSelector((state) => state.Reducer.courses_filter);
  const loading = useSelector((state) => state.Global.loading);

  const [value, setValue] = useState([10000, 150000]);
  const [select, setSelect] = useState("");
  const [price, setPrice] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [to, from] = value;
  const moreInfo = (id) => {
    setMore(id);
  };
  const sortPrice = (price) => {
    setPrice(price);
    if (id <= 5)
      getCategoryTeachers(id, {
        price,
      });
    else {
      getAllTeachers({
        price,
      });
    }
  };

  const filterData = useMemo(() => {
    if (select) {
      let courses = top_teacher_list?.filter((v) => v.course_name == select);
      return courses?.filter((v) => v.price >= to && v.price <= from);
    } else if (price > 1) {
      return top_teacher_list;
    } else {
      return top_teacher_list?.filter((v) => v.price >= to && v.price <= from);
    }
  }, [top_teacher_list, value, select, sortPrice]);

  const data = filterData;

  useEffect(() => {
    localStorage.setItem("category_teacher", id);
    if (id <= 5) {
      getCategoryTeachers(id);
    } else {
      getAllTeachers();
    }
  }, []);
  const register = (id) => {
    router.push("/register");
    localStorage.setItem("teacher_booking_id", id);
  };
  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-8 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Asosiy</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Qidiruv
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">
                Qidiruv bo'yicha <span>{data?.length}</span> ta o'qituvchi
                topildi{" "}
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 p-2">
              {/* Search Filter */}
              <StickyBox offsetTop={75} offsetBottom={20}>
                <div className="card search-filter">
                  <h5 className="fw-bold text-center mt-2">
                    Ustozlarni saralash
                  </h5>
                  <div className="card-header d-flex px-3 py-1">
                    <div className="card-body p-0 mb-2 me-2">
                      <select
                        value={select}
                        onChange={(e) => setSelect(e.target.value)}
                        className="form-control"
                        name="select"
                      >
                        <option value="">Fan nomi</option>
                        {filterCourses?.map((value, index) => {
                          return (
                            <option key={index} value={value.name}>
                              {value.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="filter-widget">
                      <select className="select form-control">
                        <option>Saralash</option>
                        <option className="sorting">Reyting</option>
                        <option className="sorting">Narx</option>
                        <option className="sorting">Eng yangi</option>
                        <option className="sorting">Fikrlarga ko'ra</option>
                      </select>
                    </div>
                  </div>
                  <Box sx={{ width: "90%", margin: "0 auto" }}>
                    <p className="mt-1 mb-0 text-center">
                      Narx bo'yicha saralash
                    </p>
                    <Slider
                      value={value}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      min={10000}
                      max={150000}
                      step={5000}
                    />{" "}
                    <div className=" card-header py-2 d-flex w-100 justify-content-between mb-2 ">
                      <div className="text-primary text-center d-flex align-items-center flex-wrap">
                        <h5 className="mb-0 w-100 text-center text-primary">
                          {to}
                        </h5>{" "}
                        <br />
                        <p className="text-dark mb-0 w-100 text-center">
                          so'mdan
                        </p>
                      </div>
                      <div className="text-primary text-center d-flex align-items-center flex-wrap">
                        <h5 className="mb-0 w-100 text-center text-primary">
                          {from}
                        </h5>{" "}
                        <br />
                        <p className="text-dark mb-0 w-100 text-center">
                          so'mgacha
                        </p>
                      </div>
                    </div>
                  </Box>
                  <Box sx={{ width: "90%", margin: "0 auto" }}>
                    <div className="d-flex py-2 justify-content-between">
                      <select
                        className="form-control"
                        onChange={(e) => sortPrice(e.target.value)}
                      >
                        <option value="1">Soatbay</option>
                        <option value="8">Oyma-oy (haftada 2 marta)</option>
                        <option value="12">Oyma-oy (haftada 3 marta)</option>
                        <option value="16">Oyma-oy (haftada 4 marta)</option>
                        <option value="20">Oyma-oy (haftada 5 marta)</option>
                      </select>
                    </div>
                  </Box>
                </div>
              </StickyBox>
              {/* /Search Filter */}
            </div>

            <div
              className="col-lg-9 p-2 px-md-2"
              style={{ minHeight: "400px" }}
            >
              <div className="row w-100 p-0 m-0">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
                    <h1
                      style={{ color: "#1E88E5" }}
                      className="text-center mt-5"
                    >
                      Yuklanmoqda...
                    </h1>
                  </div>
                ) : data?.length > 0 ? (
                  data.map((v, i) => {
                    return (
                      <div
                        className="col-xxl-6 col-12 p-0 p-md-2  card-mentors-lg"
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
                                      style={{ width: "10px", height: "10px" }}
                                      alt="verify"
                                    />
                                  </div>
                                )}
                                <div
                                  className="cursor_pointer"
                                  onClick={
                                    !userdata &&
                                    !localStorage.getItem("access_token")
                                      ? () => register(v.user_id)
                                      : () =>
                                          router.push(
                                            `/mentor/booking/${v.user_id}`
                                          )
                                  }
                                >
                                  <img
                                    src={
                                      v.image ? baseImageUrl + v.image : USER
                                    }
                                    className="user_image"
                                    alt="User Image"
                                  />
                                </div>
                                <div className="text info_box_rating">
                                  <StarRatings
                                    rating={
                                      v?.star_raytings ? v?.star_raytings : 0
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
                                <h2
                                  className="user_name cursor_pointer"
                                  onClick={
                                    !userdata &&
                                    !localStorage.getItem("access_token")
                                      ? () => register(v.user_id)
                                      : () =>
                                          router.push(
                                            `/mentor/booking/${v.user_id}`
                                          )
                                  }
                                >
                                  {v?.first_name + " " + v?.last_name}{" "}
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
                                      {v?.price ? v?.price : "0"} UZS
                                    </p>
                                    <div className="text info_box_rating d-flex align-items-center">
                                      <StarRatings
                                        rating={
                                          v?.star_raytings
                                            ? v?.star_raytings
                                            : 0
                                        }
                                        starDimension="17px"
                                        starSpacing="-5px"
                                        starRatedColor="#bd970a"
                                      />
                                      <span className="d-inline-block average-rating mb-0">
                                        ({v?.star_raytings_count})
                                      </span>
                                    </div>
                                  </div>
                                  <div className="info_box_right">
                                    <p className="text">
                                      {" "}
                                      <i className="fas fa-comment text-black" />{" "}
                                      <span>{v?.comments_count}</span> ta fikr
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
                                        <div className={"loyalty_message"}>
                                          Sodiqlik darajasi ko’rsatkichi -
                                          o’qituvchining o’z o’quvchilarini
                                          qanchalik olib qolishi, ya’ni umumiy
                                          kurs muddatini oxirigacha yetkazib
                                          hamma darslarni to’liq o’tishi indeksi
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
                                  more == v.user_id ? "show" : ""
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
                                              v?.comments[0].image
                                            : USER
                                        }
                                        alt="user"
                                      />
                                      <p className="user_message_name mb-0  ms-3">
                                        {v?.comments[0].first_name}{" "}
                                        {v?.comments[0].last_name}
                                      </p>
                                    </div>
                                    <div className="col-6 text-end p-0">
                                      <p className="m-0">
                                        {v?.comments[0].created_at?.slice(
                                          0,
                                          10
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="d-block w-100 mt-3">
                                    <p className="m-0 user_message_text">
                                      {v?.comments[0].content}
                                      <br />

                                      <span
                                        className="more text-primary mt-3 cursor_pointer"
                                        style={{ cursor: "pointer" }}
                                        onClick={
                                          !userdata &&
                                          !localStorage.getItem("access_token")
                                            ? () => register(v.user_id)
                                            : () =>
                                                router.push(
                                                  `/mentor/booking/${v.user_id}`,
                                                  { comment: "comment_section" }
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
                                  <p onClick={() => moreInfo(0)}>Yopish</p>
                                ) : (
                                  <p onClick={() => moreInfo(v.user_id)}>
                                    Batafsil
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="mentor-booking w-100 d-flex justify-content-end">
                              <div
                                className="btn btn-primary p-1 cursor_pointer"
                                onClick={
                                  !userdata &&
                                  !localStorage.getItem("access_token")
                                    ? () => register(v.user_id)
                                    : () =>
                                        router.push(
                                          `/mentor/booking/${v.user_id}`
                                        )
                                }
                              >
                                Band qilish
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Mentor Widget */}
                      </div>
                    );
                  })
                ) : (
                  "O'qituvchilar topilmadi!"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default withRouter(Search);
