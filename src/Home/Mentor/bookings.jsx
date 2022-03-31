import React, { useState, useEffect } from "react";
import { USER } from "../../constant/imagepath_home";
import Sidebar from "./sidebar";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import {
  changeBookingTime,
  getFreeTime,
  testLessons,
  test_lesson_accepted,
} from "../../Api";
import { useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
// Import Swiper React components

const Bookings = () => {
  return (
    <div>
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Asosiy</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Sinov darslarim
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Sinov darslarim</h2>
            </div>
          </div>
        </div>
      </div>

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
            {/* Booking summary */}
            <div className="col-md-7 col-lg-8 col-xl-9">
              <h3 className="pb-3">Sinov darslarim</h3>
              {/* Mentee List Tab */}

              {/* /Mentee List Tab */}
            </div>
            {/* /Booking summary */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
