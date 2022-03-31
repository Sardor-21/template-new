import { Admindata } from "../../redux/Actions";
import axios_instance from "./helpers/axios_instance";
const token = localStorage.getItem("admin_token");

const logout = (history) => {
  axios_instance
    .post("logout", token)
    .then((res) => {
      if (res.data.success) {
        history.push("/admin_login");
        localStorage.clear();
        alert("Success");
      } else {
        alert("Texnik xatolik yuz berdi.");
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Error", err);
    });
};

const Admin_login = (data, history) => {
  axios_instance
    .post("login", data)
    .then((res) => {
      if (res.status == 200) {
        Admindata(res.data);
        localStorage.setItem("admin_token", res.data.token);
        localStorage.setItem("admin_role", res.data.user.role);
        history.push("/admin/index");
        window.location.reload();
      }
    })
    .catch((err) => {
      alert("Login yoki paro'lingiz xato.");
      console.log(err);
    });
};

export { Admin_login, logout };
