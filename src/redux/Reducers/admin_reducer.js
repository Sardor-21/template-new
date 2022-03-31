import * as t from "../types";

const initialState = {
  admin_data: "",
  admin_dashboard: [],
  lead_list: [],
  teacher_list: [],
  teacher_status_list: [],
  students_list: [],
  students_course_names: [],
  admin_blog_list: [],
  admin_blog_categories: [],
};

const admin_reducer = (state = initialState, action) => {
  switch (action.type) {
    case t.ADMIN_DATA:
      return { ...state, admin_data: action.payload };
    case t.ADMIN_DASHBOARD:
      return { ...state, admin_dashboard: action.payload };
    case t.LEAD_LIST:
      return { ...state, lead_list: action.payload };
    case t.ADMIN_BLOG_LIST:
      return {
        ...state,
        admin_blog_list: action.payload.blogs,
        admin_blog_categories: action.payload.categories,
      };
    case t.TEACHER_LIST:
      return {
        ...state,
        teacher_list: action.payload.List,
        teacher_status_list: action.payload.Course_names,
      };
    case t.STUDENTS_LIST:
      return {
        ...state,
        students_list: action.payload.List,
        students_course_names: action.payload.status,
      };
    default:
      return state;
  }
};

export default admin_reducer;
