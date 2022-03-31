import axios from "axios";
import { LoadingOff, LoadingOn, Register_on, UserData } from "../redux/Actions";
import notify from "../hooks/notify";
const register = (data, history, url) => {
  if (data.password.length < 8 && data.password_confirmation.length < 8) {
    notify({
      text: "Parolingiz uzunligi 8 ta belgidan kam bo'lmasligi lozim.",
    });
  } else if (data.password.trim() !== data.password_confirmation.trim()) {
    notify({
      text: "Parrollaringiz bir biriga mos kelmayabdi",
    });
  } else if (data.phone_number?.length > 13) {
    notify({
      text: "Telefon raqamingiz 13 ta belgidan oshib ketdi",
    });
  } else {
    LoadingOn();
    axios
      .post(`https://teach.myteacher.uz/api/${url}`, data)
      .then((res) => {
        if (res.status == 200) {
          UserData(res.data);
          localStorage.setItem("access_token", res.data.token);
          localStorage.setItem("role", res.data.user.role);
          localStorage.setItem("user_id", res.data.user.id);
          history.push(`/${res.data.user.role}/profile-settings`);
          Register_on();
          LoadingOff();
        }
      })
      .catch((err) => {
        if (err?.response?.status == 403) {
          notify({
            text: "Siz kiritgan email yoki telefon raqam orqali oldin ro'yxatdan o'tilgan",
          });
        }
        console.log(err.response.status);
        localStorage.clear();
        LoadingOff();
      });
  }
};

export { register };
