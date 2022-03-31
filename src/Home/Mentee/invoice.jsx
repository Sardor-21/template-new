import React, { Component } from "react";
import Sidebar from "./sidebar";
import {
  USER,
} from "../../constant/imagepath_home";
import StickyBox from "react-sticky-box";
import { Link } from "react-router-dom";

class Invoices extends Component {
  render() {
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
                      <Link to="/home">Asosiy</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                    To'lovlar
                    </li>
                  </ol>
                </nav>
                <h2 className="breadcrumb-title">To'lovlar</h2>
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
                <div className="w-100">
                  <h2>To'lovlar tarixi</h2>
                </div>
                <div className="card card-table">
                  <div className="card-body">
                    {/* Invoice Table */}
                    <div className="table-responsive">
                      <table className="table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Chek raqami</th>
                            <th>O'quvchi</th>
                            <th>To'lov miqdori</th>
                            <th>To'langan sana</th>
                            <th className="text-center"> Harakat </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <Link to="/Mentee/invoice-view">
                                #INV-0010
                              </Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/Mentor/profile-mentee"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={USER}
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/Mentee/mentor-profile">
                                  Tyrone Roberts <span>16</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$450</td>
                            <td>14 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <Link
                                  to="/Mentee/invoice-view"
                                  className="btn btn-sm bg-info-light mr-1"
                                >
                                  <i className="far fa-eye" /> View
                                </Link>
                                <a
                                  href=""
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-share-alt-square" />{" "}
                                  Share
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="/Mentor/invoice-view">
                                #INV-0009
                              </Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/Mentor/profile-mentee"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={USER}
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/Mentor/profile-mentee">
                                  Julie Pennington <span>01</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$200</td>
                            <td>13 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <Link
                                  to="/Mentor/invoice-view"
                                  className="btn btn-sm bg-info-light mr-1"
                                >
                                  <i className="far fa-eye" /> View
                                </Link>
                                <a
                                  href=""
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-share-alt-square" />{" "}
                                  Share
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="/Mentor/invoice-view">
                                #INV-0008
                              </Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/Mentor/profile-mentee"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={USER}
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/Mentor/profile-mentee">
                                  Tyrone Roberts <span>02</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$100</td>
                            <td>12 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <Link
                                  to="/Mentor/invoice-view"
                                  className="btn btn-sm bg-info-light mr-1"
                                >
                                  <i className="far fa-eye" /> View
                                </Link>
                                <a
                                  href=""
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-share-alt-square" />{" "}
                                  Share
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="/Mentor/invoice-view">
                                #INV-0007
                              </Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/Mentor/profile-mentee"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={USER}
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/Mentor/profile-mentee">
                                  Allen Davis <span>03</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$350</td>
                            <td>11 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <Link
                                  to="/Mentor/invoice-view"
                                  className="btn btn-sm bg-info-light mr-1"
                                >
                                  <i className="far fa-eye" /> View
                                </Link>
                                <a
                                  href=""
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-share-alt-square" />{" "}
                                  Share
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="/Mentor/invoice-view">
                                #INV-0006
                              </Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/Mentor/profile-mentee"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={USER}
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/Mentor/profile-mentee">
                                  Patricia Manzi <span>04</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$275</td>
                            <td>10 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <Link
                                  to="/Mentor/invoice-view"
                                  className="btn btn-sm bg-info-light mr-1"
                                >
                                  <i className="far fa-eye" /> View
                                </Link>
                                <a
                                  href=""
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-share-alt-square" />{" "}
                                  Share
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="/Mentor/invoice-view">
                                #INV-0005
                              </Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/Mentor/profile-mentee"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={USER}
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/Mentor/profile-mentee">
                                  Olive Lawrence <span>05</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$600</td>
                            <td>9 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <Link
                                  to="/Mentor/invoice-view"
                                  className="btn btn-sm bg-info-light mr-1"
                                >
                                  <i className="far fa-eye" /> View
                                </Link>
                                <a
                                  href=""
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-share-alt-square" />{" "}
                                  Share
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="/Mentor/invoice-view">
                                #INV-0004
                              </Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/Mentor/profile-mentee"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={USER}
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/Mentor/profile-mentee">
                                  Frances Foster <span>06</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$50</td>
                            <td>8 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <Link
                                  to="/Mentor/invoice-view"
                                  className="btn btn-sm bg-info-light mr-1"
                                >
                                  <i className="far fa-eye" /> View
                                </Link>
                                <a
                                  href=""
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-share-alt-square" />{" "}
                                  Share
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="/Mentor/invoice-view">
                                #INV-0003
                              </Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/Mentor/profile-mentee"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={USER}
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/Mentor/profile-mentee">
                                  Deloris Briscoe <span>07</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$400</td>
                            <td>7 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <Link
                                  to="/Mentor/invoice-view"
                                  className="btn btn-sm bg-info-light mr-1"
                                >
                                  <i className="far fa-eye" /> View
                                </Link>
                                <a
                                  href=""
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-share-alt-square" />{" "}
                                  Share
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="/Mentor/invoice-view">
                                #INV-0002
                              </Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/Mentor/profile-mentee"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={USER}
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/Mentor/profile-mentee">
                                  Daniel Griffing <span>08</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$550</td>
                            <td>6 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <Link
                                  to="/Mentor/invoice-view"
                                  className="btn btn-sm bg-info-light mr-1"
                                >
                                  <i className="far fa-eye" /> View
                                </Link>
                                <a
                                  href=""
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-share-alt-square" />{" "}
                                  Share
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Link to="/Mentor/invoice-view">
                                #INV-0002
                              </Link>
                            </td>
                            <td>
                              <h2 className="table-avatar">
                                <Link
                                  to="/Mentor/profile-mentee"
                                  className="avatar avatar-sm mr-2"
                                >
                                  <img
                                    className="avatar-img rounded-circle"
                                    src={USER}
                                    alt="User Image"
                                  />
                                </Link>
                                <Link to="/Mentor/profile-mentee">
                                  Daniel Griffing <span>08</span>
                                </Link>
                              </h2>
                            </td>
                            <td>$550</td>
                            <td>6 Nov 2019</td>
                            <td className="text-right">
                              <div className="table-action">
                                <Link
                                  to="/Mentor/invoice-view"
                                  className="btn btn-sm bg-info-light mr-1"
                                >
                                  <i className="far fa-eye" /> View
                                </Link>
                                <a
                                  href=""
                                  className="btn btn-sm bg-primary-light"
                                >
                                  <i className="fas fa-share-alt-square" />{" "}
                                  Share
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* /Invoice Table */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Invoices;
