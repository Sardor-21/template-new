import React, { useMemo, useState, useEffect } from "react";
import StickyBox from "react-sticky-box";
import { Link, useParams, useHistory } from "react-router-dom";
import { getBlogs, single_blog } from "../../Api";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { baseImageUrl } from "../../Api/helpers/baseUrlImage";

const BlogDetails = () => {
  const [data, setData] = useState({
    blogs: [],
    categories: [],
    tags: [],
  });

  const [tags, setTags] = useState("");

  const { blog_id } = useParams();
  const latest_blog = useMemo(() => {
    return data.blogs.slice(0, 5);
  }, [data, tags]);

  const single_blogs = useSelector((state) => state.Global.single_blog);

  useEffect(() => {
    getBlogs(setData);
    single_blog(blog_id);
  }, [blog_id, tags]);

  return (
    <div>
      <Helmet>
        <meta
          property="og:image"
          content={`${baseImageUrl}${single_blogs?.image}`}
        />
        <meta property="og:description" content={single_blogs?.title} />
      </Helmet>
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Blog
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Blog tafsilotlari</h2>
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
              <div className="blog-view">
                <div className="blog blog-single-post">
                  <div className="blog-image">
                    <a href="">
                      <img
                        alt="Blog image"
                        src={
                          single_blogs?.image
                            ? `${baseImageUrl}${single_blogs?.image}`
                            : `${baseImageUrl}${single_blogs?.image}`
                        }
                        className="img-fluid"
                      />
                    </a>
                  </div>
                  <h3 className="blog-title">{single_blogs?.title}</h3>
                  <div className="blog-info clearfix">
                    <div className="post-left">
                      <ul>
                        <li>
                          <div className="post-author">
                            <Link
                              to={`/mentor/booking/${single_blogs?.user_id}`}
                            >
                              <img
                                src={
                                  single_blogs?.user_image
                                    ? `${baseImageUrl}${single_blogs?.user_image}`
                                    : "https://sawo.in/public/front-assets/images/user_image.png"
                                }
                                alt="Post Author"
                              />{" "}
                              <span>
                                {single_blogs?.first_name +
                                  " " +
                                  single_blogs?.last_name}
                              </span>
                            </Link>
                          </div>
                        </li>
                        <li>
                          <i className="far fa-calendar" />{" "}
                          {new Date(single_blogs?.created_at)
                            .toString()
                            .slice(4, 15)}
                        </li>
                        <li>
                          <i className="far fa-comments" />
                          {single_blogs?.comments}
                        </li>
                        <li>
                          <i className="fa fa-tags" />
                          {single_blogs?.tag}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="blog-content">{single_blogs?.content}</div>
                </div>

                <div className="card blog-share clearfix">
                  <div className="card-header">
                    <h4 className="card-title">Blogni ulashish</h4>
                  </div>
                  <div className="card-body">
                    <ul className="social-share">
                      <li>
                        <a
                          href={`https://t.me/share/url?url=https://myteacher.uz/blog/blog-details/${single_blogs?.id}&text=${single_blogs?.title}`}
                          target={"_blank"}
                          title="Telegram"
                        >
                          <i className="fab fa-telegram" />
                        </a>
                      </li>

                      <li>
                        <a
                          href={`https://facebook.com/sharer.php?u=https://myteacher.uz/blog/blog-details/${single_blogs?.id}&t=${single_blogs?.title}`}
                          title="Facebook"
                          target="_blank"
                        >
                          <i className="fab fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title="Linkedin">
                          <i className="fab fa-linkedin" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title="Google Plus">
                          <i className="fab fa-google-plus" />
                        </a>
                      </li>
                      <li>
                        <a href="#" title="Youtube">
                          <i className="fab fa-youtube" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card author-widget clearfix d-none m-0 p-0">
                  <div className="card-header">
                    <h4 className="card-title">Muallif haqida</h4>
                  </div>
                  <div className="card-body">
                    <div className="about-author">
                      <div className="about-author-img">
                        <div className="author-img-wrap">
                          <Link to={`/mentor/booking/${single_blogs?.user_id}`}>
                            <img
                              className="img-fluid rounded-circle"
                              alt=""
                              src={
                                single_blogs?.user_image
                                  ? `${baseImageUrl}${single_blogs?.user_image}`
                                  : `${baseImageUrl}${single_blogs?.user_image}`
                              }
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="author-details">
                        <Link
                          to={`/mentor/booking/${single_blogs?.user_id}`}
                          className="blog-author-name"
                        >
                          {single_blogs?.first_name +
                            " " +
                            single_blogs?.last_name}
                        </Link>
                        <p className="mb-0">{single_blogs?.user_description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card blog-comments clearfix d-none">
                  <div className="card-header">
                    <h4 className="card-title">Comments (12)</h4>
                  </div>
                  <div className="card-body pb-0">
                    <ul className="comments-list">
                      <li>
                        <div className="comment">
                          <div className="comment-author">
                            <img
                              className="avatar"
                              alt=""
                              src={`${baseImageUrl}${single_blogs?.user_image}`}
                            />
                          </div>
                          <div className="comment-block">
                            <span className="comment-by">
                              <span className="blog-author-name">
                                Michelle Fairfax
                              </span>
                            </span>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Nam viverra euismod odio, gravida
                              pellentesque urna varius vitae, gravida
                              pellentesque urna varius vitae. Lorem ipsum dolor
                              sit amet, consectetur adipiscing elit.
                            </p>
                            <p className="blog-date">Dec 6, 2017</p>
                            <a className="comment-btn" href="#">
                              <i className="fas fa-reply" /> Reply
                            </a>
                          </div>
                        </div>
                        <ul className="comments-list reply">
                          <li>
                            <div className="comment">
                              <div className="comment-author">
                                <img
                                  className="avatar"
                                  alt=""
                                  src={`${baseImageUrl}${single_blogs?.user_image}`}
                                />
                              </div>
                              <div className="comment-block">
                                <span className="comment-by">
                                  <span className="blog-author-name">
                                    Gina Moore
                                  </span>
                                </span>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Nam viverra euismod odio,
                                  gravida pellentesque urna varius vitae,
                                  gravida pellentesque urna varius vitae.
                                </p>
                                <p className="blog-date">Dec 6, 2017</p>
                                <a className="comment-btn" href="#">
                                  <i className="fas fa-reply" /> Reply
                                </a>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="comment">
                              <div className="comment-author">
                                <img
                                  className="avatar"
                                  alt=""
                                  src={`${baseImageUrl}${single_blogs?.user_image}`}
                                />
                              </div>
                              <div className="comment-block">
                                <span className="comment-by">
                                  <span className="blog-author-name">
                                    Carl Kelly
                                  </span>
                                </span>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Nam viverra euismod odio,
                                  gravida pellentesque urna varius vitae,
                                  gravida pellentesque urna varius vitae.
                                </p>
                                <p className="blog-date">December 7, 2017</p>
                                <a className="comment-btn" href="#">
                                  <i className="fas fa-reply" /> Reply
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <div className="comment">
                          <div className="comment-author">
                            <img
                              className="avatar"
                              alt=""
                              src={`${baseImageUrl}${single_blogs?.user_image}`}
                            />
                          </div>
                          <div className="comment-block">
                            <span className="comment-by">
                              <span className="blog-author-name">
                                Elsie Gilley
                              </span>
                            </span>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </p>
                            <p className="blog-date">December 11, 2017</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="comment">
                          <div className="comment-author">
                            <img
                              className="avatar"
                              alt=""
                              src={`${baseImageUrl}${single_blogs?.user_image}`}
                            />
                          </div>
                          <div className="comment-block">
                            <span className="comment-by">
                              <span className="blog-author-name">
                                Joan Gardner
                              </span>
                            </span>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </p>
                            <p className="blog-date">December 13, 2017</p>
                            <a className="comment-btn" href="#">
                              <i className="fas fa-reply" /> Reply
                            </a>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card new-comment clearfix d-none">
                  <div className="card-header">
                    <h4 className="card-title">Leave Comment</h4>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-group">
                        <label>
                          Name <span className="text-danger">*</span>
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>
                          Your Email Address{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input type="email" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Comments</label>
                        <textarea
                          rows={4}
                          className="form-control"
                          defaultValue={""}
                        />
                      </div>
                      <div className="submit-section">
                        <button
                          className="btn btn-primary submit-btn"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
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
                                    <Link to={`/Blog/blog-details/${value.id}`}>
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
                                        to={`/Blog/blog-details/${value.id}`}
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
                  {/* <div className="card tags-widget">
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
                  </div> */}
                  {/* /Tags */}
                </div>
              </StickyBox>
            </div>
            {/* /Blog Sidebar */}
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default BlogDetails;
