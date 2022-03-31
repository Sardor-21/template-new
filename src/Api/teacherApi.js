import {
  TestLessonData,
  TeacherStudents,
  Loading_components_on,
  Loading_components_off,
  Teacher_single_students,
} from "../redux/Actions";
import notify from "../hooks/notify";
import axios_instance from "./helpers/axios_instance";

const myStudents = (teacherId) => {
  Loading_components_on();
  axios_instance
    .get(`teacher/my_students/${teacherId}`)
    .then((res) => {
      if (res.status == 200) {
        Loading_components_off();
        TeacherStudents(res.data);
      }
    })
    .catch((err) => {
      Loading_components_off();
    });
};

const testLessons = (id) => {
  Loading_components_on();
  axios_instance
    .post(`teacher/test_lessons/${id}`)
    .then((res) => {
      if (res.status == 200) {
        Loading_components_off();
        TestLessonData(res.data.lessons);
      }
    })
    .catch((err) => {
      Loading_components_off();
    });
};

const getFreeTime = async (id, setCalendar, modalClose = null) => {
  try {
    const res = await axios_instance.get(`get-free-time/${id}`);
    if (res.status) {
      if (modalClose !== null) {
        modalClose();
      }
      setCalendar(res.data);
    }
  } catch (error) {}
};

const addFreeTime = async (data, id, setCalendar, modalClose) => {
  try {
    const res = await axios_instance.post(`teacher/add-free-time/${id}`, data);
    if (res.status == 200) {
      getFreeTime(id, setCalendar, modalClose);
      notify({
        text: res.data.message,
        status: true,
      });
    }
  } catch (error) {
    notify({
      text: error.response.data.message,
    });
  }
};

const add_free_week_time = async (id, data, setCalendar, modalClose) => {
  try {
    const res = await axios_instance.post(`teacher/add-week-time/${id}`, data);
    notify({
      text: res.data.message,
      status: true,
    });
    getFreeTime(id, setCalendar, modalClose);
  } catch (error) {
    notify({
      text: error.response.data.message,
    });
  }
};

const delete_free_time = async (id, teacher_id, setCalendar) => {
  try {
    const res = await axios_instance.delete(`/teacher/delete-free-time/${id}`);
    if (res.status == 200) {
      alert("O'chirildi");
      getFreeTime(teacher_id, setCalendar);
    }
  } catch (error) {
    alert("O'chirib bo'lmadi yana urinib ko'ring");
  }
};

const getSingleTeacher = async (id, setData) => {
  try {
    const res = await axios_instance.post(`single-teacher/${id}`);
    if (res.status == 200) {
      setData(res.data.single_teacher);
    }
  } catch (error) {}
};

const mentorBooking = async (data, teacher_id, setCalendar, setModal) => {
  try {
    const res = await axios_instance.post("booking", data);
    if (res.status == 200) {
      getFreeTime(teacher_id, setCalendar);
      setModal(true);
      // notify({
      //   text: res.data.message,
      //   status: true,
      // })
    }
  } catch (error) {
    notify({
      text: error.response.data.message,
    });
    setModal(false);
  }
};

const changeBookingTime = async (data, setModal, teacher_id) => {
  try {
    const res = await axios_instance.put(`teacher/update-test-lesson/`, data);
    if (res.status == 200) {
      setModal(false);
      testLessons(teacher_id);
      notify({
        text: res.data.message,
        status: true,
      });
    }
  } catch (error) {
    notify({
      text: error.response.data.message,
    });
  }
};
const test_lesson_accepted = async (test_lesson_id, teacher_id) => {
  try {
    const res = await axios_instance.post(
      `teacher/test-lesson-accepted/${test_lesson_id}?_method=PUT`
    );
    if (res.status == 200) {
      testLessons(teacher_id);
      alert("Tasdiqlandi");
    }
  } catch (error) {
    alert("Tasdiqlanmadi yana bir bor urinib ko'ring");
  }
};

const teacher_single_student = async (student_id, lesson_id) => {
  try {
    const res = await axios_instance.get(
      `teacher/get-single-student-to-teacher/${student_id}/${lesson_id}`
    );
    Teacher_single_students(res.data);
  } catch (error) {}
};

const teacher_class_schedule = async (data, student_id, lesson_id) => {
  try {
    const res = await axios_instance.post(
      "teacher/class-schedule/" + lesson_id,
      data
    );
    if (res.status == 200) {
      notify({
        text: "O'quvchiga dars belgilandi",
        status: 200,
      });
      teacher_single_student(student_id, lesson_id);
    }
  } catch (error) {
    notify({
      text: error?.response?.data?.message,
    });
  }
};

const update_teacher_class_schedule = async (
  data,
  id,
  student_id,
  lesson_id,
  handleModalClose,
  setTitle,
  setDate
) => {
  try {
    const res = await axios_instance.post(
      `teacher/update-class-schedule/${id}`,
      data
    );
    if (res.status == 200) {
      notify({
        text: "O'zgarishlar saqlandi",
        status: 200,
      });
      handleModalClose();
      teacher_single_student(student_id, lesson_id);
      setTitle("");
      setDate("");
    }
  } catch (error) {
    notify({
      text: "O'zgarishlar saqlanmadi",
    });
    handleModalClose();
  }
};

const lesson_accepted = async (id, teacher_id, setTodayLesson) => {
  try {
    const res = await axios_instance.put(`teacher/lesson-accepted/${id}`);
    if (res.status) {
      notify({
        text: "Dars o'tildi",
        status: 200,
      });
      today_lesson(teacher_id, setTodayLesson);
    }
  } catch (e) {
    notify({
      text: e.response.data.message,
    });
  }
};

const comment_to_teacher = async (
  id,
  data,
  mentor_id,
  setData,
  cancel_reply_comment
) => {
  try {
    const res = await axios_instance.post(
      `student/commit-to-teacher-reply/${id}`,
      data
    );
    if (res.status == 200) {
      getSingleTeacher(mentor_id, setData);
      notify({
        text: "Comment qo'shildi",
        status: 200,
      });
      cancel_reply_comment();
    }
  } catch (error) {
    notify({
      text: "Comment qoldirib bo'lmadi",
    });
  }
};

const today_lesson = async (teacher_id, setTodayLesson) => {
  Loading_components_on();
  try {
    const res = await axios_instance.get(`teacher/today-lesson/${teacher_id}`);
    if (res.status == 200) {
      Loading_components_off();
      setTodayLesson(res.data.lessons);
    }
  } catch (error) {
    Loading_components_off();
  }
};

export {
  myStudents,
  testLessons,
  getFreeTime,
  getSingleTeacher,
  addFreeTime,
  mentorBooking,
  changeBookingTime,
  test_lesson_accepted,
  delete_free_time,
  teacher_single_student,
  teacher_class_schedule,
  update_teacher_class_schedule,
  lesson_accepted,
  comment_to_teacher,
  today_lesson,
  add_free_week_time,
};
