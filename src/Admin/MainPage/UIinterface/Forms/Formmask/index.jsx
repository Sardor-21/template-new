import React, { Component } from "react";
import { Helmet } from "react-helmet";
import InputMask from "react-input-mask";
import { Link } from "react-router-dom";

export default class FormElements extends Component {
  render() {
    return (
      <div className="page-wrapper">
        <Helmet>
          <title>Form Mask - Mentoring</title>
          <meta name="description" content="Login page" />
        </Helmet>
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Form Mask</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin/index">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Form Mask</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card mb-0">
                <div className="card-header">
                  <h4 className="card-title mb-0">Form Mask</h4>
                  <p className="card-text">
                    Input masks can be used to force the user to enter data
                    conform a specific format. Unlike validation, the user can't
                    enter any other key than the ones specified by the mask.
                  </p>
                </div>
                <div className="card-body">
                  <form action="#">
                    <div className="form-group">
                      <label>Phone</label>
                      <InputMask
                        onChange={(e) => {
                          console.log(e.target.value);
                        }}
                        className="form-control"
                        mask="998-99-999-99-99"
                      ></InputMask>
                      <span className="form-text text-muted">
                        (998)99:999-99-99{" "}
                      </span>
                    </div>
                    <input
                      autoComplete="tel-national"
                      id="login"
                      inputMode="tel"
                      mask="00 000 00 00"
                      name="login"
                      ngmodel=""
                      pattern="^[0-9*]{9}$"
                      placeholder="-- --- -- --"
                      required=""
                      type="tel"
                      className="form-control ng-invalid ng-dirty ng-touched"
                    ></input>
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
