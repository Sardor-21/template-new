import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { get_blog, admin_update_blog } from "../../../Api";
import { getBlogCategory, getCourses } from "../../../../Api";
import MySelect from "../../../UI/select/MySelect";
const EditBlog = () => {
  const [tag_id, setTag_id] = useState(1);
  const [category_id, setCategory_id] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImage] = useState(null);
  const [user_id, setUserID] = useState("");
  const blog_id = localStorage.getItem("blog_id");
  const data = useSelector((state) => state.Admin.admin_blog_list);
  const selectBlog = useSelector((state) => state.Reducer.courses_list);
  const blog_category = useSelector((state) => state.Reducer.blog_category);

  const filter = () => {
    const blogs_filter = data.filter((value) => value.id == blog_id)[0];
    const blogs_category_id = blog_category.filter(
      (value) => value?.name == blogs_filter?.category
    )[0]?.id;
    const blogs_tag_id = selectBlog.filter(
      (value) => value?.name == blogs_filter?.tag
    )[0]?.id;
    setTitle(blogs_filter?.title);
    setContent(blogs_filter?.content);
    setCategory_id(blogs_category_id);
    setTag_id(blogs_tag_id);
    setUserID(blogs_filter?.user_id);
  };
  useMemo(() => {
    if (blog_id) {
      filter();
    }
  }, [data, selectBlog, blog_category]);
  useEffect(() => {
    getCourses();
    get_blog();
    getBlogCategory();
    return () => {
      localStorage.removeItem("sass");
    };
  }, []);

  const save = () => {
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("category_id", category_id);
    data.append("tag_id", tag_id);
    data.append("title", title);
    data.append("content", content);
    data.append("image", images);
    admin_update_blog(blog_id, data);
  };

  console.log(blog_id);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title"> Blogni tahrirlash</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin/index">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active"> Blogni tahrirlash</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                {/* Add details */}
                <div className="row">
                  <div className="col-12 blog-details">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>Blog sarlavhasi</label>
                          <input
                            value={title || ""}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <MySelect
                          label={"Blog kategoriyalari"}
                          setValue={setCategory_id}
                          array={blog_category}
                        />
                      </div>
                      <div className="col-md-6">
                        <MySelect
                          label={"Blog Tegi"}
                          setValue={setTag_id}
                          array={selectBlog}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Blog rasmlari</label>
                          <div>
                            <input
                              onChange={(e) => setImage(e.target.files[0])}
                              className="form-control"
                              type="file"
                            />
                            <small className="form-text text-muted">
                              Fayl hajmi 5mb dan oshmasligi kerak Rasm
                              formatlari: jpg, gif, png.
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Blog matni</label>
                      <textarea
                        cols={30}
                        rows={6}
                        className="form-control"
                        value={content || ""}
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </div>
                    <div className="m-t-20 text-center">
                      <button className="btn btn-primary btn-lg" onClick={save}>
                        Tasdiqlash
                      </button>
                    </div>
                  </div>
                </div>
                {/* /Add details */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
