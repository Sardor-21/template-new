import {
  Courses_filter,
  Courses_List,
  Home_Category_list_id,
  TopTeacherList,
  LoadingOff,
  LoadingOn,
} from "../redux/Actions";
import axios_instance from "./helpers/axios_instance";

const getCourses = async () => {
  try {
    const res = await axios_instance.get("courses");
    if (res.status == 200) {
      Courses_List(res.data);
    }
  } catch (error) {
    console.log(error);
  }
};
const getHomeCategory = async () => {
  try {
    LoadingOn();
    const res = await axios_instance.get("home-category");
    if (res.status == 200) {
      Home_Category_list_id(res.data.categories);
      LoadingOff();
    }
  } catch (error) {
    console.error(error);
  }
};
const getHomeTeam = async (setTeam) => {
  try {
    const res = await axios_instance.get("home-team");
    if (res.status == 200) {
      setTeam(res.data.teams);
    }
  } catch (error) {
    console.error(error);
  }
};
const getTopTeachers = async (setLoading) => {
  try {
    const res = await axios_instance.get("top-teachers");
    if (res.status == 200) {
      TopTeacherList(res.data.teachers);
      if (setLoading) {
        setLoading(false);
      }
    }
  } catch (error) {
    console.error(error);
    if (setLoading) {
      setLoading(false);
    }
  }
};
const getAllTeachers = async (data = { price: 1 }) => {
  LoadingOn();
  try {
    const res = await axios_instance.post("all-teachers", data);
    if (res.status == 200) {
      TopTeacherList(res.data.teachers);
      Courses_filter(res.data.courses);
      LoadingOff();
    }
  } catch (error) {
    console.error(error);
    LoadingOff();
  }
};

const getCategoryTeachers = async (id, data = { price: 1 }) => {
  LoadingOn();
  try {
    const res = await axios_instance.post(`categorySearchTeacher/${id}`, data);
    if (res.status == 200) {
      TopTeacherList(res.data.teachers);
      Courses_filter(res.data.courses);
      LoadingOff();
    }
  } catch (error) {
    console.error(error);
    LoadingOff();
  }
};

const getHomeStatistcs = async (setStatistcs) => {
  try {
    const res = await axios_instance.get("home-statistics");
    if (res.status == 200) {
      setStatistcs(res.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export {
  getCourses,
  getHomeCategory,
  getHomeTeam,
  getTopTeachers,
  getHomeStatistcs,
  getAllTeachers,
  getCategoryTeachers,
};
