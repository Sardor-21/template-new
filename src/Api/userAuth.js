import axios_instance from "./helpers/axios_instance";
import { LoadingOff, LoadingOn, UserData } from "../redux/Actions";

const token = localStorage.getItem("access_token");
const role = localStorage.getItem("role");
const id = localStorage.getItem("user_id");
const url = role == "mentee" ? "student/student-me" : "teacher/teacher-me";

const UserAuth = (setPath) => {
  if (token !== null) {
    LoadingOn();
    axios_instance
      .get(url + "/" + id, {})
      .then((res) => {
        if (res.status == 200) {
          UserData(res.data);
          // if (window.location.pathname !== "/") {
          //   setPath(window.location.pathname);
          // }
          setPath(`/${role}/dashboard`);
          localStorage.setItem("teacher_id", res?.data?.user?.teacher_id);
          LoadingOff();
        }
      })
      .catch((err) => {
        LoadingOff();
        setPath("/home");
      });
  } else {
    setPath("/home");
  }
};

export { UserAuth };
