import {
  getBlogs,
  single_blog,
  my_blog,
  add_blog,
  delete_blog,
  edit_blog,
  getBlogCategory,
} from "./blogs";

import {
  getCourses,
  getHomeCategory,
  getHomeTeam,
  getTopTeachers,
  getHomeStatistcs,
  getAllTeachers,
  getCategoryTeachers,
} from "./getApi";

import { login } from "./login";
import { logout } from "./logout";
import { register } from "./register";
import { UserAuth } from "./userAuth";
import {
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
  add_free_week_time
} from "./teacherApi";
import { UpdateStudent, UpdateTeacher } from "./updateApi";
import {
  student_test_lesson,
  test_lesson_stars,
  student_teachers,
  comment_and_rated_teacher,
  get_student_lessons,
  student_my_order
} from "./students";
export {
  test_lesson_stars,
  getBlogs,
  single_blog,
  my_blog,
  add_blog,
  delete_blog,
  edit_blog,
  getBlogCategory,
  getCourses,
  getHomeCategory,
  getHomeTeam,
  getTopTeachers,
  getHomeStatistcs,
  getAllTeachers,
  getCategoryTeachers,
  login,
  logout,
  register,
  UserAuth,
  myStudents,
  delete_free_time,
  testLessons,
  getFreeTime,
  getSingleTeacher,
  addFreeTime,
  mentorBooking,
  changeBookingTime,
  test_lesson_accepted,
  UpdateStudent,
  UpdateTeacher,
  student_test_lesson,
  teacher_single_student,
  student_teachers,
  comment_and_rated_teacher,
  teacher_class_schedule,
  update_teacher_class_schedule,
  get_student_lessons,
  lesson_accepted,
  comment_to_teacher,
  student_my_order,
  today_lesson,
  add_free_week_time
};
