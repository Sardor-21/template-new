import axios_instance from "./helpers/axios_instance";
import { LoadingOff, LoadingOn, Student_test_lesson } from "../redux/Actions";
import notify from "../hooks/notify";
const student_test_lesson = async (id) => {
  try {
    const res = await axios_instance.post(`student/my-test-lessons/${id}`);
    if (res.status == 200) {
      Student_test_lesson(res.data.lessons);
    }
  } catch (error) {
    console.log(error);
  }
};

const test_lesson_stars = async (
  test_lesson_id,
  data,
  student_id,
  modal_close
) => {
  try {
    const res = await axios_instance.post(
      `student/test-lesson-assessment/${test_lesson_id}`,
      data
    );
    if (res.status == 200) {
      // alert("Bahoyingiz uchun raxmat");
      student_test_lesson(student_id);
      modal_close();
    }
  } catch (error) {
    console.log(error);
    // alert("");
  }
};

// const get_single_student = () => {
//   LoadingOn();
//   try {
//     const res = axios_instance.get();
//     if (res.status == 200) {
//       LoadingOff();
//     }
//   } catch (error) {
//     console.log(error);
//     LoadingOff();
//   }
// };

const student_teachers = async (student_id, setMyTeachers) => {
  try {
    const res = await axios_instance.get(`student/myteachers/${student_id}`);
    setMyTeachers(res.data.teachers);
  } catch (error) {
    console.log(error);
  }
};

const comment_and_rated_teacher = async (
  teacher_id,
  close_rate_modal,
  data
) => {
  try {
    await axios_instance.post(`student/commit-to-teacher/${teacher_id}`, data);
    alert("Izohingiz uchun raxmat");
    close_rate_modal();
  } catch (error) {
    alert("Izoh yozib bo'lmadi");
  }
};

const get_student_lessons = async (setLessons) => {
  try {
    const res = await axios_instance.get(`student/student-lessons`);
    console.log(res);
    setLessons(res.data);
  } catch (e) {
    console.log(e);
  }
};

const student_my_order = async (data) => {
  try {
    const res = await axios_instance.post(
      `https://teach-api.uz/api/student/create-order`,
      data
    );
    if (res.status == 200) {
      console.log(res);
      window.open(
        `https://teach-api.uz/pay/${res.data.paysys}/${res.data.key}/${res.data.amount}`
      );
    }
  } catch (error) {
    notify({
      text: "Error",
    });
  }
};

export {
  student_test_lesson,
  test_lesson_stars,
  student_teachers,
  comment_and_rated_teacher,
  get_student_lessons,
  student_my_order,
};
