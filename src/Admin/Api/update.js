import { LoadingOff, LoadingOn, UserData } from "../../redux/Actions";
import axios_instance from "./helpers/axios_instance";
import { single_lead } from "../Api";
import { getSingleTeacher } from "./teacherApi";

const UpdateStudent = (data, id, setData) => {
  if (data) {
    axios_instance
      .post(`admin/update-lead/${id}?_method=PUT`, data)
      .then((res) => {
        if (res.status == 200) {
          UserData(res.data);
          alert("Malumotlaringiz saqlandi");
          single_lead(id, setData);
        }
      })
      .catch((err) => {
        alert("Malumotlaringiz saqlanmadi");
        console.log(err);
      });
  } else {
    console.log("Malumotlaringiz to'liq kiritilmagan.");
  }
};

const UpdateTeacher = (data, id, setData) => {
  LoadingOn();
  if (data) {
    axios_instance
      .post(`admin/update-teacher-profile/${id}?_method=PUT`, data)
      .then((res) => {
        console.log(res);
        LoadingOff();
        getSingleTeacher(id, setData);
        alert("Malumotlaringiz saqlandi");
      })
      .catch((err) => {
        alert("Malumotlaringiz saqlanmadi");
        console.log(err);
        LoadingOff();
      });
  } else {
    console.log("Malumotlaringiz to'liq kiritilmagan.");
  }
};

export { UpdateStudent, UpdateTeacher };
