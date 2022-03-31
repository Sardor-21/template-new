import axios_instance from "./helpers/axios_instance";
import { Teacher_list } from "../../redux/Actions";
import notify from "../../hooks/notify";

const TeacherList = (data = {}) => {
  axios_instance
    .post("admin/get-mentors", data)
    .then((res) => {
      if (res.status == 200) {
        console.log(res);
        Teacher_list(res?.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteTeacher = async (data, history) => {
  try {
    const res = await axios_instance.post("/admin/delete-mentor", data);
    if (res.status == 200) {
      TeacherList();
      alert("O'qituvchi o'chirildi");
      history.push("/admin/mentor");
    }
  } catch (error) {
    alert("O'qituvchini o'chirib bo'lmadi yana urinib ko'ring");

    console.log(error);
  }
};

const getSingleTeacher = async (id, setData) => {
  try {
    const res = await axios_instance.get(`admin/single-teacher1/${id}`);
    if (res.status == 200) {
      setData(res.data);
    }
  } catch (error) {
    console.log(error);
  }
};

const mentorBooking = async (data, setModal) => {
  try {
    const res = await axios_instance.post("booking", data);
    if (res.status == 200) {
      setModal(false);
      notify({
        status: true,
        text: res.data.message,
      });
    }
  } catch (error) {
    console.log(error);
    notify({
      text: error.response.data.message,
    });
  }
};
const confirm_teacher = async (user_id, setData) => {
  try {
    const res = await axios_instance.put(`admin/teacher-accepted/${user_id}`);
    if (res.status == 200) {
      getSingleTeacher(user_id, setData);
      alert("O'qituvchi tasdiqlandi");
    }
  } catch (error) {
    alert("O'qituvchini tasdiqlab bo'lmadi yana urinib ko'ring");
    console.log(error);
  }
};
const confirm_cancel_teacher = async (user_id, setData) => {
  try {
    const res = await axios_instance.put(`admin/teacher-canceled/${user_id}`);
    if (res.status == 200) {
      alert("O'qituvchi tasdig'i bekor qilindi");
      getSingleTeacher(user_id, setData);
    }
  } catch (error) {
    alert("O'qituvchi tasdig'i bekor qilib bo'lmadi");
    console.log(error);
  }
};
const verify_teacher = async (user_id, setData) => {
  try {
    await axios_instance.put(`admin/teacher-verified/${user_id}`);
    getSingleTeacher(user_id, setData);
  } catch (error) {
    console.log(error);
  }
};

export {
  confirm_cancel_teacher,
  confirm_teacher,
  mentorBooking,
  getSingleTeacher,
  deleteTeacher,
  TeacherList,
  verify_teacher,
};
