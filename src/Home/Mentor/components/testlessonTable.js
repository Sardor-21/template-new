import React, { useEffect, useState } from "react";
import {
  changeBookingTime,
  getFreeTime,
  test_lesson_accepted,
} from "../../../Api";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Free_time_calendar from "../../../components/free_time_calendar/free_time_calendar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { USER } from "../../../constant/imagepath_home";
import LessonTableStatusCode from "./lessonTableStatusCode";

const TestlessonTable = () => {
  const [modal, setModal] = useState(false);
  const [activeTime, setActive] = useState({});
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState({});
  const modalToggle = (id) => {
    setValue({ ...value, lesson_id: id });
    setModal(true);
  };

  const save = () => {
    changeBookingTime(value, setModal, userdata?.user?.user_id);
  };
  const userdata = useSelector((state) => state.Reducer.userdata);

  const time_choose = (idx, id, index) => {
    setValue({
      ...value,
      teacher_id: userdata?.user?.user_id,
      date_id: calendar[idx].dayOfWeek[id].hours[index]?.id,
      date: calendar[idx].dayOfWeek[id].day,
      time: calendar[idx].dayOfWeek[id].hours[index].time,
    });
    setActive({ ...activeTime, idx, id, index });
  };

  useEffect(() => {
    if (userdata) {
      getFreeTime(userdata?.user?.user_id, setCalendar);
    }
  }, [userdata]);
  const loading_components = useSelector(
    (state) => state.Global.loading_components
  );
  const data = useSelector((state) => state.Reducer.testLessonData);

  return (
    <div>
      {loading_components ? (
        "Yuklanmoqda"
      ) : data.length > 0 ? (
        <div>
          <div className="card card-table">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-center mb-0">
                  <thead>
                    <tr>
                      <th>O'quvchilar</th>
                      <th>Dars sanasi</th>
                      <th className="text-center">Dars vaqti</th>
                      <th className="text-center">Harakat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((value, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <h2 className="table-avatar">
                              <Link
                                // to={`/mentor/mentee-profile/${value.student_id}`}
                                to={"#"}
                                className="avatar avatar-sm mr-2"
                              >
                                <img
                                  className="avatar-img me-0 rounded-circle"
                                  src={`${
                                    value.image
                                      ? `https://teach-api.uz/storage/${value.image}`
                                      : USER
                                  }`}
                                  alt="User Image"
                                />
                              </Link>
                              <Link
                                // to={`/mentor/mentee-profile/${value.student_id}`}
                                to={"#"}
                              >
                                {value.first_name} {value.last_name}
                                <span>{value.email}</span>
                              </Link>
                            </h2>
                          </td>
                          <td>{value.date}</td>
                          <td className="text-center">
                            <span
                              className={` rounded-3 text-white p-2 ${
                                (value.status == 0 && "bg-warning") ||
                                (value.status == 1 && "bg-success") ||
                                (value.status == 2 && "bg-primary") ||
                                (value.status == 3 && "bg-danger")
                              }`}
                            >
                              {value.time}
                            </span>
                          </td>
                          <td className="text-center">
                            <div className="btn-group dropleft">
                              <button
                                type="button"
                                className="btn btn-sm bg-info-light"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i
                                  className="fa fa-ellipsis-v"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <div className="dropdown-menu dropdown-menu-right">
                                <ul className="p-0 m-0">
                                  <li
                                    onClick={() =>
                                      modalToggle(value.id, value.student_id)
                                    }
                                    className={`mb-2 dropdown-item ${
                                      (value.status == 1 && "disabled") ||
                                      (value.status == 3 && "disabled")
                                    }`}
                                    style={{ cursor: "pointer" }}
                                  >
                                    Vaqtni o'zgartirish
                                  </li>
                                  <li
                                    className={`dropdown-item ${
                                      (value.status == 1 && "disabled") ||
                                      (value.status == 3 && "disabled")
                                    }`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      test_lesson_accepted(
                                        value.id,
                                        userdata?.user?.user_id
                                      )
                                    }
                                  >
                                    O'tildi
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <LessonTableStatusCode />
        </div>
      ) : (
        <p>Sinov darslaringiz yo'q</p>
      )}
      <Modal
        isOpen={modal}
        toggle={() => setModal(false)}
        size="xl"
        centered={true}
      >
        <ModalHeader toggle={() => setModal(false)}>
          <div>Tahrirlash</div>
        </ModalHeader>
        <ModalBody>
          <Free_time_calendar
            data={calendar}
            time_choose={time_choose}
            date_id={activeTime}
          />
          <div className="text-center">
            <button className="btn btn-primary" onClick={() => save()}>
              Saqlash
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TestlessonTable;
