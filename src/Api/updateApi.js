import notify from "../hooks/notify";
import { LoadingOff, LoadingOn } from "../redux/Actions";
import axios_instance from "./helpers/axios_instance";
const teacher_booking_id = localStorage.getItem("teacher_booking_id");

const UpdateStudent = (data, id, history) => {
  if (data) {
    axios_instance
      .post(`student/update-student/${id}?_method=PUT`, data)
      .then((res) => {
        if (res.status == 200) {
          notify({
            text: "Malumotlaringiz saqlandi",
            status: true,
            time: 1000,
          });
          setTimeout(() => {
            if (teacher_booking_id)
              return history.push(`/mentor/booking/${teacher_booking_id}`);
            history.push("/mentee/mentee-profile");
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        notify({
          text: "Malumotlaringiz saqlanmadi",
        });
        console.log(err);
      });
  } else {
    console.log("Malumotlaringiz to'liq kiritilmagan.");
  }
};

const UpdateTeacher = (data, id, history) => {
  LoadingOn();
  if (data) {
    axios_instance
      .post(`teacher/update-teacher/${id}?_method=PUT`, data)
      .then((res) => {
        console.log(res);
        LoadingOff();
        notify({
          text: "Malumotlaringiz saqlandi",
          status: true,
          time: 1000,
        });
        setTimeout(() => {
          history.push("/mentor/mentor-profile");
          window.location.reload();
        }, 2000);
      })
      .catch((err) => {
        notify({
          text: "Malumotlaringiz saqlanmadi",
        });
        console.log(err);
        LoadingOff();
      });
  } else {
    console.log("Malumotlaringiz to'liq kiritilmagan.");
  }
};

export { UpdateStudent, UpdateTeacher };
