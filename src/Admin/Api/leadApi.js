import { Lead_list } from "../../redux/Actions";
import axios_instance from "./helpers/axios_instance";

const getLead = (url = "lead-list") => {
  axios_instance
    .get(`admin/${url}`)
    .then((res) => {
      if (res.status == 200) {
        console.log(res);
        Lead_list(res.data?.leads_list);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const addLead = (data) => {
  axios_instance
    .post("create-student", data)
    .then((res) => {
      if (res.status == 200) {
        getLead();
        alert("Lead qo'shildi");
      }
    })
    .catch((error) => {
      console.log(error);
      alert("Lead qo'shib bo'lmadi yana urinib ko'ring");
    });
};

const deleteLead = async (data, history) => {
  try {
    const res = await axios_instance.post("/admin/delete-student", data);
    if (res.status == 200) {
      getLead();
      alert("Lead o'chirildi");
      history.push("/admin/lead");
    }
  } catch (error) {
    console.log(error);
    alert("Leadni o'chirib bo'lmadi yana urinib ko'ring");
  }
};

const single_lead = async (id, setData) => {
  try {
    const res = await axios_instance.get(`/admin/get-student/${id}`);
    if (res.status == 200) {
      setData(res.data.user);
    }
  } catch (error) {
    console.log(error);
  }
};

const add_text_lead = async (lead_id, text) => {
  try {
    const res = await axios_instance.post(`admin/lead-action/${lead_id}`, text);
    console.log(res);
    if (res.status == 200) {
      alert("Harakat yangilandi");
      getLead();
    }
  } catch (error) {
    console.log(error);
    alert("Harakatni yangilab bo'lmadi");
  }
};

const attach_mentor = async (data, setModal2) => {
  try {
    const res = await axios_instance.post(`admin/attach-mentor`, data);
    if (res.status == 200) {
      alert("O'qituvchiga biriktirildi");
      setModal2(false);
    }
  } catch (error) {
    alert("O'qituvchiga biriktirib bo'lmadi");
  }
};

const getTeacherLeadProfile = async (setMentors) => {
  try {
    const res = await axios_instance.get("admin/get-mentors-accepted");
    setMentors(res.data);
  } catch (error) {}
};

export {
  getLead,
  addLead,
  deleteLead,
  single_lead,
  add_text_lead,
  attach_mentor,
  getTeacherLeadProfile,
};
