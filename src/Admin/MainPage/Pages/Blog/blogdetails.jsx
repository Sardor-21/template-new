import React, { useEffect } from "react";
import { BLOG_01, AVATAR_01, USER } from "../../../imagepath";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { single_blog } from "../../../../Api";
import { baseImageUrl } from "../../../../Api/helpers/baseUrlImage";

const BlogDetails = () => {
  const single_blogs = useSelector((state) => state.Global.single_blog);
  const { blog_id } = useParams();

  useEffect(() => {
    single_blog(blog_id);
  }, []);

  console.log(single_blogs);

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Blog Details</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin/index">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Blog Details</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                {/* Blog details */}
                <div className="row">
                  <div className="col-12 blog-details">
                    <span className="course-title">{single_blogs?.title}</span>
                    <div className="d-flex flex-wrap date-col">
                      <span className="date">
                        <i className="fas fa-calendar-check" />
                        {new Date(single_blogs?.created_at)
                          .toString()
                          .slice(4, 15)}
                      </span>
                      <span className="author">
                        <i className="fas fa-user" />
                        {single_blogs?.first_name} &nbsp;
                        {single_blogs?.last_name}
                      </span>
                      <span>
                        <i className="fa fa-tags" />
                        {single_blogs?.tag}
                      </span>
                    </div>
                    <div className="blog-details-img">
                      <img
                        className="img-fluid"
                        src={
                          single_blogs?.image
                            ? `${baseImageUrl}${single_blogs.image}`
                            : USER
                        }
                        alt="Post Image"
                      />
                    </div>
                    <div className="blog-content">
                      <p>{single_blogs?.content}</p>
                    </div>
                  </div>
                </div>
                {/* /Blog details */}
              </div>
            </div>
            {/* Share post */}
            <div className="card">
              <div className="card-body">
                <h4>Share the post</h4>
                <ul className="share-post">
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-facebook-f" />{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-twitter" />{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="fab fa-dribbble" />{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* /Share post */}
            {/* About Author */}
            <div className="card">
              <div className="card-body">
                <h4>About author</h4>
                <div className="about-author pt-4 d-flex align-items-center">
                  <div className="left">
                    <img
                      className="rounded-circle"
                      src={AVATAR_01}
                      width={120}
                      alt="Ryan Taylor"
                    />
                  </div>
                  <div className="right">
                    <h5>Linda Barrett</h5>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* /About Author */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
