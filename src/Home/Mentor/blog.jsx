import React, { useEffect } from "react";
// import { Helmet } from "react-helmet";

import Sidebar from "./sidebar";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import { delete_blog, my_blog } from "../../Api";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { baseImageUrl } from "../../Api/helpers/baseUrlImage";

const Blog = () => {
  const userdata = useSelector((state) => state.Reducer.userdata);
  const teacher_blogs = useSelector((state) => state.Reducer.teacher_blogs);

  const filterBlogs = useMemo(() => {
    const active_blog = teacher_blogs.filter((value) => value.status == 1);
    const in_active_blog = teacher_blogs.filter((value) => value.status == 0);

    return { active_blog, in_active_blog };
  }, [teacher_blogs]);

  const { active_blog, in_active_blog } = filterBlogs;

  useEffect(() => {
    if (userdata) {
      my_blog(userdata?.user?.user_id);
    }
  }, [userdata]);

  const edit = (id) => {
    localStorage.setItem("teacher_blog_id", id);
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/app/index">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Blog</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 col-lg-4 col-xl-3">
              {/* Sidebar */}
              <StickyBox offsetTop={20} offsetBottom={20}>
                <Sidebar />
              </StickyBox>
              {/* /Sidebar */}
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="row">
                <div className="col-12">
                  {/* Tab Menu */}
                  <nav className="user-tabs d-flex justify-content-between align-items-center">
                    <ul className="nav text-start nav-tabs nav-tabs-bottom nav-justified response">
                      <li className="ms-2">
                        <a
                          className="nav-link active"
                          href="#activeservice"
                          data-toggle="tab"
                        >
                          Faol Blog
                        </a>
                      </li>
                      <li className="ms-2">
                        <a
                          className="nav-link"
                          href="#inactiveservice"
                          data-toggle="tab"
                        >
                          No faol Blog
                        </a>
                      </li>
                    </ul>
                    <div>
                      <Link className="btn ms-2 btn-primary" to={"add-blog"}>
                        Blog qo'shish
                      </Link>
                    </div>
                  </nav>

                  {/* /Tab Menu */}
                  {/* Tab Content */}
                  <div className="tab-content">
                    {/* Active Content */}
                    <div
                      role="tabpanel"
                      id="activeservice"
                      className="tab-pane fade show active"
                    >
                      <div className="row">
                        {active_blog.length > 0 ? (
                          active_blog?.map((value) => {
                            return (
                              <div
                                key={value.id}
                                className="col-12 col-md-6 col-xl-4"
                              >
                                <div className="course-box blog grid-blog">
                                  <div className="blog-image mb-0">
                                    <Link to="/app/Blog/blog-details">
                                      <img
                                        className="img-fluid"
                                        src={
                                          value.image
                                            ? `https://teach-api.uz/storage/${value.image}`
                                            : `https://teach-api.uz/storage/${value.image}`
                                        }
                                        alt="Post Image"
                                      />
                                    </Link>
                                  </div>
                                  <div className="course-content">
                                    <span className="date">
                                      {new Date(value.created_at)
                                        .toString()
                                        .slice(7, 21)}
                                    </span>
                                    <span className="course-title">
                                      {value?.title}
                                    </span>
                                    <p>{value?.content}</p>
                                    <div className="row">
                                      <div className="col">
                                        <Link
                                          to={`/mentor/add-blog`}
                                          style={{ cursor: "pointer" }}
                                          className="text-success"
                                          onClick={() => edit(value.id)}
                                        >
                                          <i className="far fa-edit" />{" "}
                                          Tahrirlash
                                        </Link>
                                      </div>
                                      <div
                                        onClick={() =>
                                          delete_blog(
                                            value.id,
                                            userdata?.user?.user_id
                                          )
                                        }
                                        className="col text-right text-danger"
                                        style={{ cursor: `pointer` }}
                                      >
                                        <i className="far fa-trash-alt me-2" />
                                        O'chirish
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-center mt-3 me-3">
                            Faol bloglar mavjud emas!
                          </p>
                        )}
                      </div>
                    </div>
                    {/* /Active Content */}
                    {/* Inactive Content */}
                    <div
                      role="tabpanel"
                      id="inactiveservice"
                      className="tab-pane fade"
                    >
                      <div className="row">
                        {in_active_blog.length > 0 ? (
                          in_active_blog?.map((value) => {
                            return (
                              <div
                                key={value.id}
                                className="col-12 col-md-6 col-xl-4"
                              >
                                <div className="course-box blog grid-blog">
                                  <div className="blog-image mb-0">
                                    <Link to="/app/Blog/blog-details">
                                      <img
                                        className="img-fluid"
                                        src={
                                          value.image
                                            ? `${baseImageUrl}${value.image}`
                                            : `${baseImageUrl}${value.image}`
                                        }
                                        alt="Post Image"
                                      />
                                    </Link>
                                  </div>
                                  <div className="course-content">
                                    <span className="date">
                                      {new Date(value.created_at)
                                        .toString()
                                        .slice(7, 21)}
                                    </span>
                                    <span className="course-title">
                                      {value?.title}
                                    </span>
                                    <p>{value?.content}</p>
                                    <div className="row">
                                      <div className="col">
                                        <Link
                                          to={`/mentor/add-blog`}
                                          style={{ cursor: "pointer" }}
                                          className="text-success"
                                          onClick={() => edit(value.id)}
                                        >
                                          <i className="far fa-edit" />{" "}
                                          Tahrirlash
                                        </Link>
                                      </div>
                                      <div
                                        onClick={() =>
                                          delete_blog(
                                            value.id,
                                            userdata?.user?.user_id
                                          )
                                        }
                                        className="col text-right text-danger"
                                        style={{ cursor: `pointer` }}
                                      >
                                        <i className="far fa-trash-alt me-2" />
                                        O'chirish
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p className="text-center mt-3 me-3">
                            No faol bloglar mavjud emas!
                          </p>
                        )}
                      </div>
                    </div>
                    {/* /Inactive Content */}
                  </div>
                  {/* /Tab Content */}
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

export default Blog;
