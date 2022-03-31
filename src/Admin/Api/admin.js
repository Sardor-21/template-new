import {getSingleTeacher, single_lead} from "../Api";
import {Admindata, Admin_dashboard} from "../../redux/Actions/Admin_actions";
import axios_instance from "./helpers/axios_instance";

const changePassword = async (id) => {
    try {
        const res = await axios_instance.put("admin/change-password/" + id);
        if (res.status == 200) {
        }
    } catch (error) {
        console.log(error);
    }
};

const get_admin_profile = async () => {
    try {
        const res = await axios_instance.get("/admin/admin-profile");
        if (res.status == 200) {
            Admindata(res.data.user[0]);
            
        }
    } catch (error) {
        console.log(error);
    }
};

const get_admin_dashboard = async () => {
    try {
        const res = await axios_instance.get("/admin/get-dashboard");
        if (res.status == 200) {
            Admin_dashboard(res.data);
        }
    } catch (error) {
        console.log(error);
    }
};

const comment_User = (data, id, role, setData) => {
    console.log(role);
    axios_instance
        .post("admin/add-comment-user", data)
        .then((res) => {
            if (res.status == 200) {
                if (role == "mentee") {
                    single_lead(id, setData);
                } else {
                    getSingleTeacher(id, setData);
                }
                alert("Foydalanuvchiga comment qo'shildi");
            }
        })
        .catch((err) => {
            alert("Foydalanuvchiga comment qo'shib bo'lmadi");

            console.log(err);
        });
};

export {changePassword, get_admin_profile, get_admin_dashboard, comment_User};
