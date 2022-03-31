import axios from "axios";

export const baseURL = "https://teach.myteacher.uz/api/";

const axios_instance = axios.create({
  baseURL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  },
});

export default axios_instance;
