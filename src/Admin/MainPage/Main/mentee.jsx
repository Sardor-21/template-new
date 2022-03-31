import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import { get_students } from "../../Api";
import { useSelector } from "react-redux";
import { USER } from "../../imagepath";
import convert_date from "../../../hooks/convert_date";
import { baseImageUrl } from "../../../Api/helpers/baseUrlImage";

const Clients = () => {
  const students_list = useSelector((state) => state.Admin.students_list);
  const course_names = useSelector(
    (state) => state.Admin.students_course_names
  );

  useEffect(() => {
    get_students();
  }, []);

  const columns = [
    {
      title: "O'quvchi",
      dataIndex: "first_name",
      render: (text, record, index) => (
        <h2 className="table-avatar">
          <Link
            to={`/admin/leadProfile/${record.student.user_id}`}
            className="avatar avatar-sm mr-2"
          >
            <img
              className="avatar-img rounded-circle"
              src={
                record?.student?.image
                  ? `${baseImageUrl}${record?.student?.image}`
                  : USER
              }
              alt="User Image"
            />
          </Link>
          <Link to={`/admin/leadProfile/${record?.student.user_id}`}>
            {record.student.first_name} {record.student.last_name}
          </Link>
        </h2>
      ),
      sorter: (a, b) => a.teacher.student.length - b.student.first_name.length,
    },
    {
      title: "O'qituvchi",
      dataIndex: "first_name",
      render: (text, record, index) => (
        <h2 className="table-avatar">
          <Link
            to={`/admin/mentor-profile/${record.teacher.user_id}`}
            className="avatar avatar-sm mr-2"
          >
            <img
              className="avatar-img rounded-circle"
              src={
                record?.teacher?.image
                  ? `${baseImageUrl}${record?.teacher?.image}`
                  : USER
              }
              alt="User Image"
            />
          </Link>
          <Link to={`/admin/mentor-profile/${record?.teacher.user_id}`}>
            {record.teacher.first_name} {record.teacher.last_name}
            <span className="d-block">{record.course_name}</span>
          </Link>
        </h2>
      ),
      sorter: (a, b) =>
        a.teacher.first_name.length - b.teacher.first_name.length,
    },

    {
      title: "Telefon raqam",
      dataIndex: "phone_number",
      sorter: (a, b) => a.phone_number.length - b.phone_number.length,
    },

    {
      title: "Darslar soni",
      dataIndex: "",
      render: (text, record) => <div>{record?.count_lessons}</div>,
    },
    {
      title: "Shundan qoldi",
      dataIndex: "",
      render: (text, record) => <div>{record?.end_count_lesson}</div>,
    },
    {
      title: "Reg vaqti",
      dataIndex: "created_at",
      render: (text, record) => (
        <span>
          <small>{text ? convert_date(text) : "2022:01:02"}</small>
        </span>
      ),
    },
    {
      title: "Account Status",
      dataIndex: "status",
      render: (text, record) => (
        <div className="status-toggle d-flex">
          <input
            type="checkbox"
            id="status_6"
            className="check"
            defaultChecked
          />
          <select
            className="select form-control"
            defaultValue={"AAA"}
            defaultChecked
          >
            <option>Qayta qo'ng'iroq</option>
            <option>Ulanib bo'lmadi</option>
            <option>Sifatsiz Lead</option>
          </select>
        </div>
      ),
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">O'quvchilar ro'yxati</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin/index">Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                  <a href="">Users</a>
                </li>
                <li className="breadcrumb-item active">Mentee</li>
              </ul>
            </div>
          </div>
        </div>

        {/* /Page Header */}
        <div className="row">
          <div className="col-sm-6 mb-3">
            <select className="form-control">
              {course_names.length > 0 &&
                course_names.map((value, index) => {
                  return (
                    <option key={value.id} value={index}>
                      {value?.description}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-sm-6 mb-3">
            <input
              className="form-control"
              type="text"
              placeholder="...Search"
            />
          </div>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <Table
                    className="table-hover table-center mb-0"
                    pagination={{
                      total: students_list.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    // bordered
                    dataSource={students_list}
                    rowKey={(record) => record.created_at}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
