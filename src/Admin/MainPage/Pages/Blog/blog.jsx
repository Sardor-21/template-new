import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { baseImageUrl } from "../../../../Api/helpers/baseUrlImage";
import { USER } from "../../../../constant/imagepath_home";
import {
  get_blog,
  admin_delete_blog,
  admin_in_active_blog,
  admin_active_blog,
} from "../../../Api";

const Blog = () => {
  const data = useSelector((state) => state.Admin.admin_blog_list);

  useEffect(() => {
    get_blog();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Blog</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin/index">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Blog</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  {data.length > 0 &&
                    data?.map((value) => {
                      return (
                        <div
                          key={value.id}
                          className="col-12 col-md-6 col-xl-4"
                        >
                          <div className="course-box blog grid-blog h-100 pb-5">
                            <div
                              className="blog-image mb-0"
                              style={{ height: "300px" }}
                            >
                              <Link
                                className=" h-100"
                                to={`/admin/blog-details/${value.id}`}
                              >
                                <img
                                  className="img-fluid h-100"
                                  src={
                                    value.image
                                      ? `${baseImageUrl}${value?.image}`
                                      : USER
                                  }
                                  alt="Post Image"
                                />
                              </Link>
                            </div>
                            <div className="course-content d-flex flex-column justify-content-between h-50">
                              <div>
                                <div className="date d-flex justify-content-between">
                                  {new Date(value.created_at)
                                    .toString()
                                    .slice(7, 21)}
                                  <div>
                                    {value.status == 0 ? (
                                      <span
                                        className="text-danger"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          admin_active_blog(value.id)
                                        }
                                      >
                                        Inactive
                                      </span>
                                    ) : (
                                      <span
                                        className="text-success"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          admin_in_active_blog(value.id)
                                        }
                                      >
                                        Active
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="d-flex  align-items-center">
                                  <img
                                    src={
                                      value.user_image
                                        ? `${baseImageUrl}${value.user_image}`
                                        : USER
                                    }
                                    className="me-2"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      borderRadius: "50%",
                                      objectFit: "cover",
                                    }}
                                    alt="user-image"
                                  />
                                  <Link
                                    className="text-dark"
                                    to={`/admin/blog-details/${value.id}`}
                                  >
                                    {value.first_name + " " + value.last_name}
                                  </Link>
                                </div>
                                <span className="course-title">
                                  {value.title && value.title}
                                </span>
                                <p className="blog_text">
                                  {value?.content && value?.content}
                                </p>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <Link
                                    to="/admin/edit-blog"
                                    onClick={() => {
                                      localStorage.setItem("blog_id", value.id);
                                    }}
                                    className="text-success"
                                  >
                                    <i className="far fa-edit me-1" />
                                    Tahrirlash
                                  </Link>
                                </div>
                                <div
                                  onClick={() => admin_delete_blog(value?.id)}
                                  className="col text-right text-danger"
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="far fa-trash-alt me-1" />
                                  O'chirish
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
