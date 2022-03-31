import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { lesson_accepted, today_lesson } from "../../../Api";
import { baseImageUrl } from "../../../Api/helpers/baseUrlImage";
import { USER } from "../../../constant/imagepath_home";
import LessonTableStatusCode from "./lessonTableStatusCode";

const TodayLessonTable = () => {
  const history = useHistory();
  const loading_components = useSelector(
    (state) => state.Global.loading_components
  );
  const userdata = useSelector((state) => state.Reducer.userdata);
  const [todayLesson, setTodayLesson] = useState([]);
  useEffect(() => {
    if (userdata) {
      today_lesson(userdata?.user?.user_id, setTodayLesson);
    }
  }, [userdata]);
  return (
    <div className="row">
      <div className="col-md-12">
        <h4 className="mb-4">Bugungi Darslar</h4>
        {loading_components ? (
          "Yuklanmoqda"
        ) : todayLesson.length > 0 ? (
          <div>
            <div className="card card-table">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover table-center mb-0">
                    <thead>
                      <tr>
                        <th>Ism Familya</th>
                        <th> Dars sanasi</th>
                        <th className="text-center">Dars vaqti</th>
                        <th className="text-center">Mavzu</th>
                        <th className="text-center">Harakat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todayLesson.map((v, i) => {
                        return (
                          <tr key={i}>
                            <td>
                              <h2 className="table-avatar">
                                <div
                                  className="avatar cursor_pointer"
                                  onClick={() =>
                                    history.push(
                                      `/mentor/student-profile/${v.student_id}/${v.lesson_id}`
                                    )
                                  }
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={
                                      v.image
                                        ? `${baseImageUrl}${v.image}`
                                        : USER
                                    }
                                    alt="User Image"
                                  />
                                </div>
                                <div
                                  className="cursor_pointer"
                                  onClick={() =>
                                    history.push(
                                      `/mentor/student-profile/${v.student_id}/${v.lesson_id}`
                                    )
                                  }
                                >
                                  {v.first_name + " " + v.last_name}
                                  <span>{v.email}</span>
                                </div>
                              </h2>
                            </td>
                            <td>{v.date}</td>
                            <td className={`text-center`}>
                              <span className={`${v.status}`}>{v.time}</span>
                            </td>
                            <td className="text-center">{v.theme}</td>
                            <td className="text-center">
                              <button
                                className={`btn btn-primary ${
                                  v.status == "reject" || v.status == "accept"
                                    ? "disabled"
                                    : ""
                                }`}
                                onClick={() =>
                                  lesson_accepted(
                                    v.id,
                                    userdata?.user?.user_id,
                                    setTodayLesson
                                  )
                                }
                              >
                                O'tildi
                              </button>
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
          "Darslar mavjud emas"
        )}
      </div>
    </div>
  );
};

export default TodayLessonTable;
