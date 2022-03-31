import { dispatch } from "../store";
import * as t from "../types";
import {TEACHER_SINGLE_STUDENT} from "../types";
const UserData = (data) => {
  const action = { type: t.USERDATA, payload: data };
  dispatch(action);
};
const ClearData = () => {
  const action = { type: t.CLEARDATA };
  dispatch(action);
};
const TestLessonData = (data) => {
  const action = { type: t.TEST_LESSON_DATA, payload: data };
  dispatch(action);
};
const TeacherStudents = (data) => {
  const action = { type: t.TEACHER_STUDENTS, payload: data };
  dispatch(action);
};
const TopTeacherList = (data) => {
  dispatch({ type: t.TOP_TEACHER_LIST, payload: data });
};
const Home_Category_list_id = (data) => {
  dispatch({ type: t.HOME_CATEGORY_LIST_ID, payload: data });
};
const Courses_filter = (data) => {
  dispatch({ type: t.COURSES_FILTER, payload: data });
};
const Teacher_blogs = (data) => {
  dispatch({ type: t.TEACHER_BLOGS, payload: data });
};
const Courses_List = (data) => {
  dispatch({ type: t.COURSES_LIST, payload: data });
};

const Blog_category = (data) => {
  dispatch({ type: t.BLOG_CATEGORY, payload: data });
};
const Student_test_lesson = (data) => {
  dispatch({ type: t.STUDENTS_TEST_LESSON, payload: data });
};

const Teacher_single_students = (data) => {
  dispatch({type: t.TEACHER_SINGLE_STUDENT, payload: data})
}

export {
  UserData,
  ClearData,
  TestLessonData,
  TeacherStudents,
  TopTeacherList,
  Home_Category_list_id,
  Courses_filter,
  Teacher_blogs,
  Courses_List,
  Blog_category,
  Student_test_lesson,
  Teacher_single_students
};
