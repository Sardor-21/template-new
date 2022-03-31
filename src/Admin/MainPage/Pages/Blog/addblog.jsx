import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCourses, getBlogCategory } from "../../../../Api";
import { admin_add_blog } from "../../../Api";
import MySelect from "../../../UI/select/MySelect";
import Admin_BlogValidation from "../../Components/Admin_Blog_Validation";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag_id, setTag_id] = useState(1);
  const [category_id, setCategory_id] = useState(1);
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState([{}]);

  const selectBlog = useSelector((state) => state.Reducer.courses_list);
  const blog_category = useSelector((state) => state.Reducer.blog_category);

  console.log(selectBlog);

  const admin_data = useSelector((state) => state.Admin.admin_data);

  const adminAddBlog = () => {
    if (
      Object.keys(
        Admin_BlogValidation({
          user_id: admin_data?.id,
          title,
          content,
          image,
          category_id,
          tag_id,
        })
      ).length == 0
    ) {
      const data = new FormData();
      data.append("user_id", admin_data?.id);
      data.append("tag_id", tag_id);
      data.append("category_id", category_id);
      data.append("title", title);
      data.append("content", content);
      data.append("image", image);

      admin_add_blog(data);
    } else {
      setErrors(
        Admin_BlogValidation({
          user_id: admin_data?.id,
          category_id,
          tag_id,
          title,
          content,
          image,
        })
      );
    }
  };

  useEffect(() => {
    getCourses();
    getBlogCategory();
  }, []);
  console.log(tag_id, category_id);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title"> Blog qo'shish</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin/index">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Blog qo'shish</li>
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
                      <div className="col-md-6">
                        <MySelect
                          label={"Blog kategoriyalari"}
                          setValue={setCategory_id}
                          array={blog_category}
                          error={errors?.category_id}
                        />
                      </div>
                      <div className="col-md-6">
                        <MySelect
                          label={"Blog Tegi"}
                          setValue={setTag_id}
                          array={selectBlog}
                          error={errors?.tag_id}
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
                        {errors.image && (
                          <p className="text-danger">
                            Bu joyni to'ldirish shart!
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Blog matni</label>
                      <textarea
                        cols={30}
                        rows={6}
                        className="form-control"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                      />
                      {errors.content && (
                        <p className="text-danger">
                          Bu joyni to'ldirish shart!
                        </p>
                      )}
                    </div>
                    <div className="form-group d-none">
                      <label className="display-block w-100">Blog holati</label>
                      <div className="d-none">
                        <div className="custom-control custom-radio custom-control-inline">
                          <input
                            className="custom-control-input"
                            id="active"
                            name="active-blog"
                            defaultValue="active"
                            type="radio"
                            defaultChecked
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="active"
                          >
                            Faol
                          </label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline d-none">
                          <input
                            className="custom-control-input"
                            id="inactive"
                            name="active-blog"
                            defaultValue="inactive"
                            type="radio"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="inactive"
                          >
                            Nofaol
                          </label>
                        </div>
                      </div>
                    </div>
                    <div onClick={adminAddBlog} className="m-t-20 text-center">
                      <button className="btn btn-primary btn-lg">
                        Saqlash
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

export default AddBlog;
