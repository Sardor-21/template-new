import React, { useState, useEffect } from "react";

import Sidebar from "./sidebar";
import StickyBox from "react-sticky-box";
import { Link, useHistory } from "react-router-dom";
import { myStudents, testLessons } from "../../Api";
import { useSelector } from "react-redux";

import TestlessonTable from "./components/testlessonTable";
import StudentTable from "./components/studentTable";
const MenteeList = () => {
  const userdata = useSelector((state) => state.Reducer.userdata);
  useEffect(() => {
    if (userdata) {
      myStudents(userdata.user.user_id);
      testLessons(userdata?.user?.user_id);
    }
  }, [userdata]);

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
                    O'quvchilarim
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">O'quvchilarim</h2>
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
            {/* Mentee List Tab */}
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">O'quvchilarim</h4>
                </div>
                <div className="card-body">
                  <ul className="nav nav-tabs nav-tabs-bottom d-block d-sm-flex  nav-justified">
                    <li className="nav-item text-start">
                      <a
                        className="nav-link active"
                        href="#bottom-justified-tab1"
                        data-toggle="tab"
                      >
                        O'quvchilarim
                      </a>
                    </li>
                    <li className="nav-item text-start">
                      <a
                        className="nav-link"
                        href="#bottom-justified-tab2"
                        data-toggle="tab"
                      >
                        Sinov darslarim
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane show active"
                      id="bottom-justified-tab1"
                    >
                      {/* Sinov darsi  */}
                      <StudentTable />
                      {/* Sinov darsi  */}
                    </div>

                    <div className="tab-pane" id="bottom-justified-tab2">
                      {/* Mavzular  */}
                      <TestlessonTable />
                      {/* Mavzular  */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* /Mentee List Tab */}

            {/* /Booking summary */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeList;
