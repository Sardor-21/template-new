/**
 * Form Elemets
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class FormElements extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col">
                <h3 className="page-title">Input Groups</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin/index">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Input Groups</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Buttons with dropdowns</h4>
                </div>
                <div className="card-body">
                  <form action="#">
                    <div className="form-group row">
                      <label className="col-form-label col-lg-2">
                        Radio and Text Addons
                      </label>
                      <div className="col-lg-10">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <button
                              type="button"
                              className="btn btn-white dropdown-toggle"
                              data-toggle="dropdown"
                            >
                              Action
                            </button>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                              <div
                                role="separator"
                                className="dropdown-divider"
                              />
                              <a className="dropdown-item" href="#">
                                Separated link
                              </a>
                            </div>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Left dropdown"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group row mb-0">
                      <label className="col-form-label col-lg-2">
                        Two Addons
                      </label>
                      <div className="col-lg-10">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Right dropdown"
                          />
                          <div className="input-group-append">
                            <button
                              type="button"
                              className="btn btn-white dropdown-toggle"
                              data-toggle="dropdown"
                            >
                              Action
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a className="dropdown-item" href="#">
                                Action
                              </a>
                              <a className="dropdown-item" href="#">
                                Another action
                              </a>
                              <a className="dropdown-item" href="#">
                                Something else here
                              </a>
                              <div
                                role="separator"
                                className="dropdown-divider"
                              />
                              <a className="dropdown-item" href="#">
                                Separated link
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
