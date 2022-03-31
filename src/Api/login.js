import notify from "../hooks/notify";
import { LoadingOff, LoadingOn, UserData } from "../redux/Actions";
import axios_instance from "./helpers/axios_instance";

const login = (data, history) => {
  LoadingOn();
  axios_instance
    .post("login", data)
    .then((res) => {
      if (res.status) {
        UserData(res.data);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("access_token", res.data.token);
        localStorage.setItem("user_id", res.data.user.id);
        localStorage.setItem("teacher_id", res?.data?.user?.teacher_id);
        history.push(`/${res.data.user.role}/dashboard`);
        window.location.reload();
        LoadingOff();
        notify({ text: "Muvaffaqiyatli", status: true });
      }
    })
    .catch((err) => {
      LoadingOff();
      notify({
        text: "Telefon raqam yoki parolda hatolik bor",
      });
      console.log(err);
    });
};

export { login };
