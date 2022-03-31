import axios from "axios";

const baseURL = "https://teach.myteacher.uz/api/";

const axios_instance = axios.create({
  baseURL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("admin_token"),
  },
});

export default axios_instance;
