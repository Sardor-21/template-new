import React, { useState } from "react";
import { USER } from "../../constant/imagepath_home";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { useEffect } from "react";
import { student_teachers, comment_and_rated_teacher } from "../../Api";
import convert_date from "../../hooks/convert_date";
import { baseImageUrl } from "../../Api/helpers/baseUrlImage";

const MenteeProfile = () => {
  const userdata = useSelector((state) => state.Reducer.userdata);

  const [rate_modal, setRateModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [teacher_id, setTeacherId] = useState();
  const [my_teachers, setMyTeachers] = useState([]);

  const open_rate_modal = (id) => {
    setTeacherId(id);
    setRateModal(true);
  };

  const close_rate_modal = () => {
    setRateModal(false);
    setRating(0);
  };
  const changeRating = (id) => {
    setRating(id);
  };

  useEffect(() => {
    if (userdata) {
      student_teachers(userdata.user.user_id, setMyTeachers);
    }
    return () => setMyTeachers("");
  }, [userdata]);

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
                    <Link to="/mentee/dashboard">Umumiy</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Profil
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Profil</h2>
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
                  <div className="row w-100 d-flex m-0 align-items-center justify-content-between">
                    <div className="col-12 col-sm-8 my-2">
                      <div className="row">
                        <div className="col-sm-4 d-flex align-items-center responsive_mentee_profil justify-content-center ">
                          {userdata?.user?.image ? (
                            <img
                              className="pro-avatar-image"
                              src={`http://teach-api.uz/storage/${userdata?.user?.image}`}
                              alt="user_image"
                            />
                          ) : (
                            <div className="pro-avatar ">
                              {userdata?.user?.first_name.slice(0, 1)}
                              {userdata?.user?.last_name.slice(0, 1)}
                            </div>
                          )}
                        </div>
                        <div className="col-sm-8 ps-0 d-flex flex-wrap align-items-center  responsive_mentee_profil  ">
                          <div className=" ">
                            <h4 className="w-100">
                              {userdata?.user?.first_name}{" "}
                              {userdata?.user?.last_name}
                            </h4>
                            <p className="user-location m-0">
                              <i className="fas fa-map-marker-alt me-2" />
                              {userdata?.user?.country
                                ? userdata?.user?.country
                                : " Kiritilmagan"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 my-2 col-sm-4 respons-button ">
                      <Link
                        className="blue-btn-radius"
                        to="/mentee/profile-settings"
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
                    {userdata?.user?.target ? (
                      userdata?.user?.target
                    ) : (
                      <p className="my-3">Kiritilmagan</p>
                    )}
                  </div>
                  {/* /About Details */}
                </div>
              </div>
              <div className="card">
                <div className="card-body custom-border-card pb-0">
                  {/* Personal Details */}
                  <div className="widget education-widget mb-0">
                    <h4 className="widget-title"> Shaxsiy ma'lumotlar</h4>
                    <hr />
                    <div className="experience-box">
                      <ul className="experience-list profile-custom-list">
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Kasbingiz</span>
                              <div className="row-result">
                                {userdata?.user?.job
                                  ? userdata?.user?.job
                                  : "Kiritilmagan"}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Tug'ilgan kuni</span>
                              <div className="row-result">
                                {userdata?.user?.birth_date
                                  ? userdata?.user?.birth_date
                                  : "Kiritilmagan"}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Telefon raqam</span>
                              <div className="row-result">
                                {userdata?.user?.phone_number
                                  ? userdata?.user?.phone_number
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
                {/* /About Details */}
              </div>
              <div className="card">
                <div className="card-body custom-border-card pb-0">
                  <div className="widget experience-widget mb-0">
                    <h4 className="widget-title">O'rganishdan maqsad</h4>
                    <hr />
                    <div className="experience-box">
                      <ul className="experience-list profile-custom-list">
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Hozirgi bilm daraja</span>
                              <div className="row-result">
                                {userdata?.user?.experience
                                  ? userdata?.user?.experience
                                  : "Kiritilmagan"}
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>O'rganilayotgan fan</span>
                              <div className="row-result">Mathematics</div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Maqsad qilingan daraja</span>
                              <div className="row-result">Yuqori</div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="experience-content">
                            <div className="timeline-content">
                              <span>Ajratilgan vaqt</span>
                              <div className="row-result">5-oy</div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* /Personal Details */}
              </div>
              <div className="card">
                <div className="card-body custom-border-card pb-0">
                  <div className="widget experience-widget mb-0">
                    <h4 className="widget-title">O'qituvchilarim</h4>
                    <hr />
                    <div className="card-table mb-3">
                      <div className="card-body">
                        <div className="table-responsive">
                          {my_teachers.length > 0 ? (
                            <table className="table table-hover table-center mb-0">
                              <thead>
                                <tr>
                                  <th>O'qituvchi:</th>
                                  <th>Fan nomi</th>
                                  <th className="text-center">
                                    To'lov qilingan sana
                                  </th>
                                  <th className="text-center">Harakat</th>
                                </tr>
                              </thead>
                              <tbody>
                                {my_teachers.map(
                                  ({
                                    first_name,
                                    email,
                                    last_name,
                                    created_at,
                                    teacher_id,
                                    image,
                                    name,
                                  }) => (
                                    <tr key={teacher_id}>
                                      <td>
                                        <h2 className="table-avatar">
                                          <div className="avatar avatar-sm mr-2">
                                            <img
                                              className="avatar-img rounded-circle"
                                              src={baseImageUrl + image}
                                              alt="User Image"
                                            />
                                          </div>
                                          <div>
                                            {first_name + " " + last_name}
                                            <span>{email}</span>
                                          </div>
                                        </h2>
                                      </td>
                                      <td>{name}</td>
                                      <td className="text-center">
                                        <span>{convert_date(created_at)}</span>
                                      </td>
                                      <td className="text-center">
                                        <div
                                          className="btn btn-sm bg-info-light"
                                          onClick={() =>
                                            open_rate_modal(teacher_id)
                                          }
                                        >
                                          Baholash
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          ) : (
                            "Sizda o'quvchilar mavjud emas"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Personal Details */}
              </div>
            </div>
            {/* /Mentor Details Tab */}
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={rate_modal} toggle={close_rate_modal} centered>
        <ModalHeader toggle={close_rate_modal}>
          O'qituvchingizni baholang
        </ModalHeader>
        <ModalBody>
          <div className="row m-0">
            <div className="col-12 d-flex align-items-center flex-column justify-content-center">
              <StarRatings
                rating={rating}
                starRatedColor="#F7E800"
                starHoverColor="#F7E800"
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"
                starDimension="40px"
              />
              <h2 className="text-center mt-4">{rating} baho</h2>
            </div>
            <div className="col-12">
              <div className="form-group">
                <textarea
                  value={comment || ""}
                  onChange={(e) => setComment(e.target.value)}
                  type="text"
                  rows={4}
                  className="form-control"
                  placeholder="Izoh qoldirish"
                ></textarea>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary mx-auto"
            onClick={() =>
              comment_and_rated_teacher(teacher_id, close_rate_modal, {
                student_id: userdata.user.user_id,
                content: comment,
                stars_rated: rating,
              })
            }
          >
            Saqlash
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MenteeProfile;
