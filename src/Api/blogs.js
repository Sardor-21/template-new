import axios_instance from "./helpers/axios_instance";
import {
    LoadingOn,
    LoadingOff,
    Single_blog,
    Teacher_blogs,
    Blog_category,
} from "../redux/Actions";

const my_blog = async (id) => {
    try {
        const res = await axios_instance.get("teacher/my-blog/" + id);
        if (res.status == 200) {
            Teacher_blogs(res.data.blogs);
        }
    } catch (error) {
        console.log(error);
    }
};

const add_blog = async (data) => {
    try {
        const res = await axios_instance.post("teacher/add-blog", data);
        if (res.status == 200) {
            console.log(res);
            alert(
                "Bloglarga qo'shildi endi adminimiz tasdiqdan o'tkazsa faol blo'glar ro'yaxatiga qo'shiladi."
            );
        }
    } catch (error) {
        alert("Blogni qo'shib bo'lmadi.");
        console.log(error);
    }
};

const delete_blog = async (blog_id, id) => {
    try {
        const res = await axios_instance.delete(
            `teacher/my-blog-delete/${blog_id}`
        );
        if (res.status == 200) {
            my_blog(id);
            alert("O'chirildi");
        }
    } catch (error) {
        console.log(error);
        alert("O'chirib bo'lmadi!");
    }
};

const getBlogCategory = async () => {
    try {
        const res = await axios_instance.get("categorys");
        if (res.status == 200) {
            Blog_category(res.data.categories);
        }
    } catch (error) {
        console.log(error);
    }
};

const edit_blog = async (id, data) => {
    try {
        const res = await axios_instance.post(
            `teacher/my-blog-update/${id}?_method=PUT`,
            data
        );
        if (res.status == 200) {
            console.log(res);
            alert("Blog yangilandi");
        }
    } catch (error) {
        alert("Blogni yangilab bo'lmadi");
        console.log(error);
    }
};

const getBlogs = async (setData) => {
    LoadingOn();
    try {
        const res = await axios_instance.get("blogs");
        if (res.status == 200) {
            setData({
                blogs: res.data.blogs,
                categories: res.data.categories,
                tags: res.data.tags,
            });
            LoadingOff();
        }
    } catch (error) {
        console.log(error);
        LoadingOff();
    }
};

const single_blog = async (id) => {
    LoadingOn();
    try {
        const res = await axios_instance.get(`get-single-blog/${id}`);
        if (res.status == 200) {
            LoadingOff();
            Single_blog(res.data.blogs);
        }
    } catch (error) {
        LoadingOff();
        console.log(error);
    }
};

export {
    getBlogs,
    single_blog,
    my_blog,
    add_blog,
    delete_blog,
    edit_blog,
    getBlogCategory,
};
