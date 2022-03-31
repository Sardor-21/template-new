import { Admin_blog_list } from "../../redux/Actions";
import axios_instance from "./helpers/axios_instance";

const get_blog = async () => {
  try {
    const res = await axios_instance.get("admin/get-blog");
    if (res.status == 200) {
      Admin_blog_list(res.data);
    }
  } catch (error) {
    console.log(error);
  }
};

const admin_add_blog = async (data) => {
  try {
    const res = await axios_instance.post("admin/admin-add-blog", data);
    if (res.status == 200) {
      console.log(res);
      alert("Blog qo'shildi");
    }
  } catch (error) {
    alert("Blog qo'shib bo'lmadi yana urinib ko'ring");

    console.log(error);
  }
};
const admin_update_blog = async (id, data) => {
  try {
    const res = await axios_instance.post(
      `admin/blog-update/${id}?_method=PUT`,
      data
    );
    if (res.status == 200) {
      alert("Blog yangilandi");
    }
  } catch (error) {
    alert("Blogni yangilab bo'lmadi yana urinib ko'ring");

    console.log(error);
  }
};

const admin_delete_blog = async (blog_id) => {
  try {
    const res = await axios_instance.delete(`admin/blog-delete/${blog_id}`);
    if (res.status == 200) {
      get_blog();
      alert("Blog o'chirildi");
    }
  } catch (error) {
    console.log(error);
    alert("Blog o'chirib bo'lmadi yana urinib ko'ring");
  }
};
const admin_active_blog = async (blog_id) => {
  try {
    const res = await axios_instance.put(`admin/blog-accepted/${blog_id}`);
    if (res.status == 200) {
      get_blog();
      alert("Blog activlashtirildi");
    }
  } catch (error) {
    console.log(error);
    alert("Blogni activlashtirib bo'lmadi yana urinib ko'ring");
  }
};
const admin_in_active_blog = async (blog_id) => {
  try {
    const res = await axios_instance.put(`admin/blog-canceled/${blog_id}`);
    if (res.status == 200) {
      get_blog();
      alert("Blogni inactivlashtirildi");
    }
  } catch (error) {
    console.log(error);

    alert("Blogni inactivlashtirib bo'lmadi yana urinib ko'ring");
  }
};

const edit_admin_blog = async (blog_id) => {
  try {
    const res = await axios_instance.put(`admin/blog-update/${blog_id}`);
    if (res.status == 200) {
      alert("Blog yangilandi");
    }
  } catch (error) {
    alert("Blogni yangilab bo'lmadi yana urinib ko'ring");

    console.log(error);
  }
};

export {
  get_blog,
  admin_delete_blog,
  edit_admin_blog,
  admin_add_blog,
  admin_active_blog,
  admin_in_active_blog,
  admin_update_blog,
};
