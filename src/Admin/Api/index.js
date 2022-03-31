import {
  changePassword,
  get_admin_profile,
  get_admin_dashboard,
  comment_User,
} from "./admin";
import {
  getTestLesson,
  deleteTestLesson,
  accepted_test_tesson,
  canceled_test_tesson,
} from "./getApi";
import {
  getLead,
  addLead,
  deleteLead,
  single_lead,
  add_text_lead,
  attach_mentor,
  getTeacherLeadProfile,
} from "./leadApi";
import { Admin_login, logout } from "./Login_Logout";
import { get_students } from "./students";
import {
  confirm_cancel_teacher,
  confirm_teacher,
  mentorBooking,
  getSingleTeacher,
  deleteTeacher,
  TeacherList,
  verify_teacher,
} from "./teacherApi";
import { add_team, get_team, edit_team, delete_team } from "./team_api";
import { UpdateStudent, UpdateTeacher } from "./update";
import {
  get_blog,
  admin_delete_blog,
  edit_admin_blog,
  admin_add_blog,
  admin_active_blog,
  admin_in_active_blog,
  admin_update_blog,
} from "./blog";

export {
  changePassword,
  get_admin_profile,
  get_admin_dashboard,
  getTestLesson,
  deleteTestLesson,
  getLead,
  addLead,
  comment_User,
  deleteLead,
  single_lead,
  Admin_login,
  logout,
  get_students,
  confirm_cancel_teacher,
  confirm_teacher,
  mentorBooking,
  getSingleTeacher,
  deleteTeacher,
  TeacherList,
  add_team,
  get_team,
  edit_team,
  delete_team,
  UpdateStudent,
  UpdateTeacher,
  admin_active_blog,
  admin_in_active_blog,
  admin_update_blog,
  admin_add_blog,
  get_blog,
  admin_delete_blog,
  edit_admin_blog,
  accepted_test_tesson,
  canceled_test_tesson,
  add_text_lead,
  attach_mentor,
  getTeacherLeadProfile,
  verify_teacher,
};
