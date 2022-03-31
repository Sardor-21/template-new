import { dispatch } from "../store";
import * as t from "../types";

const Lead_list = (data) => {
  dispatch({ type: t.LEAD_LIST, payload: data });
};
const Teacher_list = (data) => {
  dispatch({ type: t.TEACHER_LIST, payload: data });
};
const Admindata = (data) => {
  dispatch({ type: t.ADMIN_DATA, payload: data });
};
const Admin_dashboard = (data) => {
  dispatch({ type: t.ADMIN_DASHBOARD, payload: data });
};
const Students_list = (data) => {
  dispatch({ type: t.STUDENTS_LIST, payload: data });
};
const Admin_blog_list = (data) => {
  dispatch({ type: t.ADMIN_BLOG_LIST, payload: data });
};
export {
  Lead_list,
  Teacher_list,
  Admindata,
  Admin_dashboard,
  Students_list,
  Admin_blog_list,
};
