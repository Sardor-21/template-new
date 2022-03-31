import React, { useState, useEffect } from "react";
import { USER } from "../../constant/imagepath_home";
import Sidebar from "./sidebar";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import MySelect from "../../UI/Select/MySelect";
import AvatarImageCropper from "react-avatar-image-cropper";
import { useSelector } from "react-redux";
import {
  add_blog,
  edit_blog,
  getBlogCategory,
  my_blog,
  getCourses,
} from "../../Api";
import BlogValidation from "./components/blogValidation";

const BlogAdd = () => {
  const [tag_id, setTag_id] = useState(1);
  const [category_id, setCategory_id] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgmodal, setImgModal] = useState(false);
  const [images, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  const selectBlog = useSelector((state) => state.Reducer.courses_list);
  const blog_category = useSelector((state) => state.Reducer.blog_category);
  const apply = (file) => {
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImgModal(false);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    getCourses();
    getBlogCategory();
  }, []);

  const userdata = useSelector((state) => state.Reducer.userdata);
  const teacher_blogs = useSelector((state) => state.Reducer.teacher_blogs);
  const blog_id = localStorage.getItem("teacher_blog_id");

  const filter = () => {
    const blogs_filter = teacher_blogs.filter(
      (value) => value.id == blog_id
    )[0];
    const blogs_category_id = blog_category.filter(
      (value) => value?.name == blogs_filter?.category
    )[0]?.id;
    const blogs_tag_id = selectBlog.filter(
      (value) => value?.name == blogs_filter?.tag
    )[0]?.id;
    setTitle(blogs_filter?.title);
    setContent(blogs_filter?.content);
    setTitle(blogs_filter?.title);
    setContent(blogs_filter?.content);
    setCategory_id(blogs_category_id);
    setTag_id(blogs_tag_id);
    setImagePreview(`https://teach-api.uz/storage/${blogs_filter?.image}`);
  };

  useEffect(() => {
    if (blog_id && userdata) {
      my_blog(userdata?.user?.user_id);
      filter();
    }
    return () => {
      localStorage.removeItem("teacher_blog_id");
    };
  }, []);

  const addBlog = () => {
    let image = imagePreview ? imagePreview : image;
    if (
      Object.keys(
        BlogValidation({
          user_id: userdata?.user?.user_id,
          tag_id,
          category_id,
          title,
          content,
          image,
        })
      ).length == 0
    ) {
      const data = new FormData();
      data.append("user_id", userdata?.user?.user_id);
      data.append("category_id", category_id);
      data.append("tag_id", tag_id);
      data.append("title", title);
      data.append("content", content);
      data.append("image", images);
      if (blog_id > 0) {
        edit_blog(blog_id, data);
      } else {
        add_blog(data);
      }
    } else {
      setErrors(
        BlogValidation({
          user_id: userdata?.user?.user_id,
          tag_id,
          category_id,
          title,
          content,
          image,
        })
      );
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row  align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/app/index">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog qo'shish
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Blog qo'shish</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row ">
            <div className="col-md-5 col-lg-4 col-xl-3">
              {/* Sidebar */}
              <StickyBox offsetTop={20} offsetBottom={20}>
                <Sidebar />
              </StickyBox>
              {/* /Sidebar */}
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9 custom-edit-service">
              <div className="row ">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="pb-3">Blog qo'shish</h3>
                      <div>
                        <div className="service-fields mb-3">
                          <div className="row">
                            <div className="col-12 col-lg-12">
                              <div className="form-group">
                                <label>
                                  Blog sarlavhasi
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  className="form-control"
                                  type="text"
                                />
                                {errors.title && (
                                  <p className="text-danger">
                                    Bu joyni to'ldirish shart!
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label>
                                  Kategoriyalar{" "}
                                  <span className="text-danger">*</span>
                                </label>

                                <MySelect
                                  setValue={setCategory_id}
                                  array={blog_category}
                                  error={errors?.category_id}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="form-group">
                                <label>
                                  Teglar <span className="text-danger">*</span>
                                </label>

                                <MySelect
                                  setValue={setTag_id}
                                  array={selectBlog}
                                  error={errors?.tag_id}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="service-fields mb-3">
                          <h4 className="heading-2">Blog tafsilotlari</h4>
                          <div className="row">
                            <div className="col-lg-12">
                              <div className="form-group">
                                <label>
                                  Matn <span className="text-danger">*</span>
                                </label>
                                <textarea
                                  id="about"
                                  className="form-control service-desc"
                                  name="about"
                                  value={content}
                                  onChange={(e) => setContent(e.target.value)}
                                />
                                {errors.content && (
                                  <p className="text-danger">
                                    Bu joyni to'ldirish shart!
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="service-fields ">
                          <h4 className="heading-2">Blog Rasmlari </h4>
                          <div className="row blog-grid-row">
                            <div className="col-sm-12 col-md-6">
                              {imgmodal && (
                                <div
                                  className={`modalimg`}
                                  onClick={() => setImgModal(false)}
                                >
                                  <div
                                    style={{
                                      borderRadius: "15px",
                                      width: "250px",
                                      height: "250px",
                                      margin: "auto",
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <AvatarImageCropper
                                      text={"Rasm yuklash"}
                                      setImgModal={setImgModal}
                                      apply={apply}
                                      isBack={true}
                                    />
                                  </div>
                                </div>
                              )}
                              <div
                                onClick={() => setImgModal(true)}
                                className="service-upload d-flex flex-column justify-content-center align-items-center m-0"
                                style={{
                                  minHeight: "300px",
                                }}
                              >
                                <i className="fas fa-cloud-upload-alt " />
                                <button className="btn btn-primary mt-2 mx-auto">
                                  Rasmni yuklash *
                                </button>
                              </div>
                              {errors.image && (
                                <p className="text-danger">
                                  Rasm qo'yish shart!
                                </p>
                              )}
                            </div>

                            <div className="col-sm-12 col-md-6">
                              <div className="blog grid-blog">
                                <div className="blog-image">
                                  <a href="/app/Blog/blog-details">
                                    <img
                                      className="img-fluid"
                                      style={{
                                        height: "300px",
                                        objectFit: "cover",
                                      }}
                                      src={
                                        (imagePreview && imagePreview) ||
                                        "/3143a95cf5fc2abc870591cfc55e2a15.jpg"
                                      }
                                      alt="Post Image"
                                    />
                                  </a>
                                </div>
                                <div className="blog-content">
                                  <ul className="entry-meta meta-item">
                                    <li>
                                      <div className="post-author">
                                        <a href="/app/Mentee/mentor-profile">
                                          <img
                                            src={
                                              userdata?.user?.image
                                                ? `https://teach-api.uz/storage/${userdata?.user?.image}`
                                                : USER
                                            }
                                            alt="Post Author"
                                          />{" "}
                                          <span>
                                            {userdata?.user?.first_name +
                                              " " +
                                              userdata?.user?.last_name}
                                          </span>
                                        </a>
                                      </div>
                                    </li>
                                    <li>
                                      <i className="far fa-clock me-2"></i>
                                      {new Date().toISOString().split("T")[0]}
                                    </li>
                                  </ul>
                                  <h3 className="blog-title">
                                    {title ? title : "Sarlavha nomi"}
                                  </h3>
                                  <p className="mb-0">
                                    {content ? content : "Qiqacha Ma'lumot"}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="submit-section mt-3">
                          <button
                            className={`btn btn-primary submit-btn`}
                            type="button"
                            name="form_submit"
                            onClick={addBlog}
                          >
                            {blog_id > 0 ? "Yangilash" : "Saqlash"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default BlogAdd;
