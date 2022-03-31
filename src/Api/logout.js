import notify from "../hooks/notify";
import { ClearData } from "../redux/Actions";
import axios_instance from "./helpers/axios_instance";

const logout = (history) => {
  const token = localStorage.getItem("access_token");
  axios_instance
    .post("logout", token)
    .then((res) => {
      if (res.data.success) {
        ClearData();
        localStorage.clear();
        notify({
          text: "Muvaffaqiyatli",
          status: true,
          time: 2000,
        });
        setTimeout(() => {
          history.push("/home");
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err);
      notify({
        text: "Texnik xatolik yuz berdi yana urinib ko'ring",
      });
    });
};

export { logout };
