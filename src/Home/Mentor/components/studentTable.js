import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { USER } from "../../../constant/imagepath_home";
import convert_date from "../../../hooks/convert_date";
const StudentTable = () => {
  const history = useHistory();

  const data = useSelector((state) => state.Reducer.teacher_of_students);
  const loading_components = useSelector(
    (state) => state.Global.loading_components
  );

  return (
    <div>
      {loading_components ? (
        "Yuklanmoqda"
      ) : data.length > 0 ? (
        <div className="card card-table">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover table-center mb-0">
                <thead>
                  <tr>
                    <th>O'quvchilar</th>
                    <th>Darslar soni</th>
                    <th className="text-center">Azo bo'lgan vaqti</th>
                    <th className="text-center">Harakat</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((v, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <h2 className="table-avatar">
                            <div
                              onClick={() =>
                                history.push(
                                  `/mentor/student-profile/${v.student_id}/${v.lesson_id}`
                                )
                              }
                              className="avatar avatar-sm mr-2"
                            >
                              <img
                                className="avatar-img rounded-circle"
                                src={
                                  v.image
                                    ? `https://teach-api.uz/teach-api/public/storage/${v.image}`
                                    : USER
                                }
                                alt="User Image"
                              />
                            </div>
                            <div
                              onClick={() =>
                                history.push(
                                  `/mentor/student-profile/${v.student_id}/${v.lesson_id}`
                                )
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {v.first_name} {v.last_name}
                              <span>{v.email}</span>
                            </div>
                          </h2>
                        </td>
                        <td>
                          {v.count_lessons} / {v.end_count_lesson}
                        </td>
                        <td className="text-center">
                          {convert_date(v.created_at)}
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              history.push(
                                `/mentor/student-profile/${v.student_id}/${v.lesson_id}`
                              )
                            }
                          >
                            Profilni ko'rish
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
      ) : (
        <p className="my-3">Sizda O'quvchilar yo'q</p>
      )}
    </div>
  );
};

export default StudentTable;
