import React from "react";
import Sidebar from "./sidebar";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Register_off } from "../../redux/Actions";
import TodayLessonTable from "./components/todayLessonTable";
import LessonTableStatusCode from "./components/lessonTableStatusCode";

const Dashboard = () => {
  const userdata = useSelector((state) => state.Reducer.userdata);
  const register = useSelector((state) => state.Global.register);

  return (
    <div>
      {register && (
        <div className="alert_content">
          <div className="alert_item">
            <div className="text">
              Iltimos sozlash bo'limiga o'tib malumotlaringizni <br />
              to'ldirishingizni so'rab qolamiz!
            </div>
            <button
              className="btn"
              onClick={() => {
                Register_off();
                window.location.reload();
              }}
            >
              Xop tushunarli
            </button>
          </div>
        </div>
      )}
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
                    Umumiy
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Umumiy</h2>
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
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="row">
                <div className="col-md-12 col-12 col-sm-6 col-lg-3 dash-board-list blue">
                  <div className="dash-widget">
                    <div className="circle-bar">
                      <div className="icon-col">
                        <i className="fas fa-users" />
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h3>{userdata?.user?.mystudent_count}</h3>
                      <h6>O'quvchi </h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-12 col-sm-6 col-lg-3 dash-board-list yellow">
                  <div className="dash-widget pe-0">
                    <div className="circle-bar">
                      <div className="icon-col">
                        <i className="fas fa-calendar-check" />
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h3>{userdata?.user?.test_lesson_count}</h3>
                      <h6>Sinov darsi </h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-12 col-sm-6 col-lg-3 dash-board-list pink">
                  <div className="dash-widget">
                    <div className="circle-bar">
                      <div className="icon-col">
                        <i className="fas fa-wallet" />
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h3>0 UZS</h3>
                      <h6>Daromad</h6>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-12 col-sm-6 col-lg-3 dash-board-list yellow">
                  <div className="dash-widget">
                    <div className="circle-bar">
                      <div className="icon-col">
                        <i className="fas fa-wallet" />
                      </div>
                    </div>
                    <div className="dash-widget-info">
                      <h3>0 UZS</h3>
                      <h6>Bonuslar</h6>
                    </div>
                  </div>
                </div>
              </div>
              <TodayLessonTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
