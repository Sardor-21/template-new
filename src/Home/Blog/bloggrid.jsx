import React, { useEffect, useState, useMemo } from "react";
import { USER } from "../../constant/imagepath_home";
import StickyBox from "react-sticky-box";
import { getBlogs } from "../../Api";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { baseImageUrl } from "../../Api/helpers/baseUrlImage";

const BlogGrid = () => {
  const [data, setData] = useState({
    blogs: [],
    categories: [],
    tags: [],
  });
  const loading = useSelector((state) => state.Global.loading);
  const [tags, setTags] = useState("");
  const [search, setSearch] = useState("");
  const filter_blog = useMemo(() => {
    if (search) {
      return data.blogs.filter(
        (v) =>
          v?.tag?.trim().toLowerCase().includes(search.trim().toLowerCase()) ||
          v?.title
            ?.trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase()) ||
          v?.first_name
            ?.trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase()) ||
          v?.last_name
            ?.trim()
            .toLowerCase()
            .includes(search.trim().toLowerCase()) ||
          v?.content?.trim().toLowerCase().includes(search.trim().toLowerCase())
      );
    } else {
      return data.blogs.filter((v) => v?.tag?.includes(tags));
    }
  }, [data.blogs, tags, search]);

  const latest_blog = useMemo(() => {
    return data.blogs.slice(0, 5);
  }, [data]);
  useEffect(() => {
    getBlogs(setData);
    // return () => {};
  }, []);
  // console.log(data);
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
                    <a href="/home">Asaosiy</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">
                O'qituvchilarimiz tomonidan qo'yilgan bloglar
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 col-md-12">
              <div className="row blog-grid-row">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
                    <h1
                      style={{ color: "#1E88E5" }}
                      className="text-center mt-5"
                    >
                      Yuklanmoqda...
                    </h1>
                  </div>
                ) : filter_blog.length > 0 ? (
                  filter_blog.map((blog, index) => {
                    return (
                      <div className="col-md-6 col-sm-12" key={index}>
                        {/* Blog Post */}
                        <div className="blog grid-blog">
                          <div
                            className="blog-image"
                            style={{ maxHeight: "340px" }}
                          >
                            <Link to={`/blog/blog-details/${blog.id}`}>
                              <img
                                className="img-fluid"
                                src={
                                  blog.image
                                    ? `${baseImageUrl}${blog.image}`
                                    : `${baseImageUrl}${blog.image}`
                                }
                                alt="Post Image"
                              />
                            </Link>
                          </div>
                          <div className="blog-content">
                            <ul className="entry-meta meta-item">
                              <li>
                                <div className="post-author">
                                  <Link to={`/blog/blog-details/${blog.id}`}>
                                    <img
                                      src={
                                        blog.user_image
                                          ? `${baseImageUrl}${blog.user_image}`
                                          : USER
                                      }
                                      alt="Post Author"
                                    />{" "}
                                    <span>
                                      {blog?.first_name + " " + blog.last_name}
                                    </span>
                                  </Link>
                                </div>
                              </li>
                              <li>
                                <i className="far fa-clock" />{" "}
                                {new Date(blog.created_at)
                                  .toString()
                                  .slice(4, 15)}
                              </li>
                            </ul>
                            <h3 className="blog-title">
                              <Link to={`/blog/blog-details/${blog.id}`}>
                                {blog?.title}
                              </Link>
                              <small className="d-block text-primary">
                                #{blog?.tag}
                              </small>
                            </h3>
                            <p className="mb-0 blog_text">{blog?.content}</p>
                          </div>
                        </div>
                        {/* /blog Post */}
                      </div>
                    );
                  })
                ) : (
                  <div className="d-flex justify-content-center align-items-center mt-5 pt-5">
                    <h1
                      style={{ color: "#1E88E5" }}
                      className="text-center mt-5"
                    >
                      Bloglar topilmadi!
                    </h1>
                  </div>
                )}
              </div>
              {/* Blog Pagination */}
              <div className="row d-none">
                <div className="col-md-12">
                  <div className="blog-pagination">
                    <nav>
                      <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                          <a className="page-link" href="#" tabIndex={-1}>
                            <i className="fas fa-angle-double-left" />
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">
                            2 <span className="sr-only">(current)</span>
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            3
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="fas fa-angle-double-right" />
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
              {/* /blog Pagination */}
            </div>
            {/* Blog Sidebar */}
            <div className="col-lg-4 col-md-12 sidebar-right">
              <StickyBox offsetTop={20} offsetBottom={20}>
                <div>
                  {/* Search */}
                  <div className="card search-widget">
                    <div className="card-body">
                      <form className="search-form">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Qidirish..."
                            value={search || ""}
                            onChange={(e) => setSearch(e.target.value)}
                            className="form-control"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* /Search */}
                  {/* Latest Posts */}
                  <div className="card post-widget">
                    <div className="card-header">
                      <h4 className="card-title">Oxirgi postlar</h4>
                    </div>
                    <div className="card-body">
                      <ul className="latest-posts">
                        {latest_blog.length > 0
                          ? latest_blog.map((value, index) => {
                              return (
                                <li key={index}>
                                  <div className="post-thumb">
                                    <Link to={`/blog/blog-details/${value.id}`}>
                                      <img
                                        className="img-fluid"
                                        src={
                                          value.image
                                            ? `${baseImageUrl}${value.image}`
                                            : `${baseImageUrl}${value.image}`
                                        }
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div className="post-info">
                                    <h4>
                                      <Link
                                        to={`/blog/blog-details/${value.id}`}
                                      >
                                        {value?.title}
                                      </Link>
                                    </h4>
                                    <p>
                                      {new Date(value.created_at)
                                        .toString()
                                        .slice(7, 21)}
                                    </p>
                                  </div>
                                </li>
                              );
                            })
                          : "Postlar mavjud emas!"}
                      </ul>
                    </div>
                  </div>
                  {/* /Latest Posts */}
                  {/* Categories */}
                  <div className="card category-widget">
                    <div className="card-header">
                      <h4 className="card-title">Blog kategoriyalari</h4>
                    </div>
                    <div className="card-body">
                      <ul className="categories">
                        {data.categories.length > 0
                          ? data.categories.map((value, index) => {
                              return (
                                <li key={index}>
                                  <a href="#">
                                    {value.name} <span>({value.count})</span>
                                  </a>
                                </li>
                              );
                            })
                          : "Kategoriyalar mavjud emas!"}
                      </ul>
                    </div>
                  </div>
                  {/* /Categories */}
                  {/* Tags */}
                  <div className="card tags-widget">
                    <div className="card-header">
                      <h4 className="card-title">Teglar</h4>
                    </div>
                    <div className="card-body">
                      <ul className="tags">
                        {data.tags.length > 0 && (
                          <li>
                            <span
                              style={{ cursor: "pointer" }}
                              className={`tag ${tags == "" ? "active" : ""}`}
                              onClick={() => setTags("")}
                            >
                              Hammasi
                            </span>
                          </li>
                        )}
                        {data.tags.length > 0
                          ? data.tags.map((value, index) => {
                              return (
                                <li key={index}>
                                  <span
                                    onClick={() => setTags(value.name)}
                                    style={{ cursor: "pointer" }}
                                    className={`tag ${
                                      tags == value.name ? "active" : ""
                                    }`}
                                  >
                                    {value.name}
                                  </span>
                                </li>
                              );
                            })
                          : "Teglar mavjud emas!"}
                      </ul>
                    </div>
                  </div>
                  {/* /Tags */}
                </div>
              </StickyBox>
            </div>
            {/* /blog Sidebar */}
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default BlogGrid;
