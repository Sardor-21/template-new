import React, { useMemo, useEffect, useState } from "react";
// import { Helmet } from "react-helmet";
import Sidebar from "./sidebar";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import {
  student_test_lesson,
  test_lesson_stars,
  get_student_lessons,
} from "../../Api";
import { useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import StarRatings from "react-star-ratings";
import { USER } from "../../constant/imagepath_home";
import { baseImageUrl } from "../../Api/helpers/baseUrlImage";

const Favorites = () => {
  const userdata = useSelector((state) => state.Reducer.userdata);
  const test_lesson = useSelector((state) => state.Reducer.student_test_lesson);
  // const [status, setStatus] = useState(false);
  const [rating, setRating] = useState(0);
  const [lessons, setLessons] = useState([]);
  const [modal, setModal] = useState(false);
  const filter_lesson = useMemo(() => {
    const lesson = test_lesson.filter((v) => v?.is_rated == 1)[0];
    if (lesson?.is_rated == 1) {
      setModal(true);
    }
    return lesson;
  }, [test_lesson]);
  useEffect(() => {
    if (userdata) {
      get_student_lessons(setLessons);
      student_test_lesson(userdata?.user?.user_id);
    }
  }, [userdata]);
  const modal_close = () => {
    setModal(false);
  };
  const changeRating = (rating) => {
    setRating(rating);
  };
  const post_stars = () => {
    test_lesson_stars(
      filter_lesson?.id,
      {
        teacher_id: filter_lesson.teacher_id,
        stars_rated: rating,
      },
      userdata?.user?.user_id,
      modal_close
    );
    console.log({
      teacher_id: filter_lesson.teacher_id,
      stars_rated: rating,
    });
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
                    Dars
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Dars</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              {/* Sidebar */}
              <StickyBox offsetTop={20} offsetBottom={20}>
                <Sidebar />
              </StickyBox>
              {/* /Sidebar */}
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Darslar bo'limi</h4>
                </div>
                <div className="card-body">
                  <ul className="nav nav-tabs nav-tabs-bottom d-block d-sm-flex  nav-justified">
                    <li className="nav-item text-start">
                      <a
                        className="nav-link active"
                        href="#bottom-justified-tab1"
                        data-toggle="tab"
                      >
                        Sinov darslari
                      </a>
                    </li>
                    <li className="nav-item text-start d-flex justify-content-center align-items-center">
                      <a
                        className="nav-link"
                        href="#bottom-justified-tab2"
                        data-toggle="tab"
                      >
                        Darslar
                      </a>
                    </li>
                    <li className="nav-item text-start">
                      <a
                        className="nav-link"
                        href="#bottom-justified-tab3"
                        data-toggle="tab"
                      >
                        Uyga vazifalar
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane show active"
                      id="bottom-justified-tab1"
                    >
                      {/* Sinov darsi  */}

                      <div className="  card-table">
                        <div className="card-body">
                          <div className="table-responsive">
                            {test_lesson?.length > 0 ? (
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>O'qituvchi ism familiyasi</th>
                                    <th>Fan nomi</th>
                                    <th>Dars kuni</th>
                                    <th className="text-center">Dars vaqti</th>
                                    {/* <th className="text-center">Harakat</th> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  {test_lesson.map((lesson, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>
                                          <h2 className="table-avatar">
                                            <Link
                                              to={`/mentor/booking/${lesson?.user_id}`}
                                              className="avatar avatar-sm mr-2"
                                            >
                                              <img
                                                className="avatar-img rounded-circle"
                                                src={
                                                  lesson?.image
                                                    ? `${baseImageUrl}${lesson?.image}`
                                                    : `${baseImageUrl}${lesson?.image}`
                                                }
                                                alt="User Image"
                                              />
                                            </Link>
                                            <Link
                                              to={`/mentor/booking/${lesson?.user_id}`}
                                            >
                                              {lesson?.first_name +
                                                " " +
                                                lesson?.last_name}
                                            </Link>
                                          </h2>
                                        </td>
                                        <td>{lesson?.course_name}</td>
                                        <td>{lesson?.date}</td>
                                        <td className="text-center">
                                          <span
                                            className={`text-white p-2 rounded-3 ${
                                              (lesson.status == 0 &&
                                                "bg-warning") ||
                                              (lesson.status == 1 &&
                                                "bg-success") ||
                                              (lesson.status == 2 &&
                                                "bg-primary") ||
                                              (lesson.status == 3 &&
                                                "bg-danger")
                                            }`}
                                          >
                                            {lesson?.time}
                                          </span>
                                        </td>
                                        {/* <td className="text-center">
                                          <Link
                                            to={`/mentor/booking/${lesson?.user_id}`}
                                            className="btn btn-sm bg-info-light"
                                          >
                                            <i className="far fa-eye" />
                                            View
                                          </Link>
                                        </td> */}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            ) : (
                              "Sinov darslari mavjud emas"
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Sinov darsi  */}
                    </div>
                    <div className="tab-pane" id="bottom-justified-tab2">
                      {/* Mavzular  */}

                      <div className="  card-table">
                        <div className="card-body">
                          <div className="table-responsive">
                            {lessons.length > 0 ? (
                              <table className="table table-hover table-center mb-0">
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>O'qituvchi</th>
                                    <th>Mavzu</th>
                                    <th>Dars sanasi</th>
                                    <th className="text-center">Dars vaqti</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {lessons.map((v, i) => {
                                    return (
                                      <React.Fragment key={i}>
                                        {v.lessons.map((value, index) => (
                                          <tr key={value.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                              <h2 className="table-avatar">
                                                <Link
                                                  to={`/mentor/booking/${v.teacher_id}`}
                                                  className="avatar avatar-sm mr-2"
                                                >
                                                  <img
                                                    className="avatar-img rounded-circle"
                                                    src={`${baseImageUrl}${v.teacher.image}`}
                                                    alt="User Image"
                                                  />
                                                </Link>
                                                <Link
                                                  to={`/mentor/booking/${v.teacher_id}`}
                                                >
                                                  {v.teacher.first_name +
                                                    " " +
                                                    v.teacher.last_name}
                                                  <span>
                                                    {v.teacher.course_name}
                                                  </span>
                                                </Link>
                                              </h2>
                                            </td>
                                            <td>
                                              <span>{value.theme}</span>
                                            </td>
                                            <td>{value.date}</td>
                                            <td className="text-center">
                                              <span
                                                className={`${
                                                  (value.status == 14 &&
                                                    "pending") ||
                                                  (value.status == 19 &&
                                                    "accept") ||
                                                  (value.status == 17 &&
                                                    "change-lesson")
                                                }`}
                                              >
                                                {value.time}
                                              </span>
                                            </td>
                                          </tr>
                                        ))}
                                      </React.Fragment>
                                    );
                                  })}
                                </tbody>
                              </table>
                            ) : (
                              "Sizda darslar mavjud emas"
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Mavzular  */}
                    </div>
                    <div className="tab-pane" id="bottom-justified-tab3">
                      Tab content 3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={modal} toggle={modal_close} centered>
          <ModalHeader toggle={modal_close}>
            O'qituvchi darsini baholang
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-12">
                <h2 className="text-center">
                  {filter_lesson?.first_name + " " + filter_lesson?.last_name}
                </h2>
                <h4 className="text-center">{filter_lesson?.course_name}</h4>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <StarRatings
                  rating={rating}
                  starRatedColor="#BD970A"
                  starHoverColor="#BD970A"
                  changeRating={changeRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="40px"
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-secondary me-2" onClick={modal_close}>
              Ortga qaytish
            </button>
            <button className="btn btn-primary" onClick={post_stars}>
              Baholash
            </button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Favorites;
