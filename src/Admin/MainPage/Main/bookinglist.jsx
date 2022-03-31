import React, { useEffect, useState } from "react";
import { USER } from "../../imagepath";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import "../antdstyle.css";
import {
  getTestLesson,
  deleteTestLesson,
  accepted_test_tesson,
  canceled_test_tesson,
} from "../../Api";
import { baseImageUrl } from "../../../Api/helpers/baseUrlImage";

const Clients = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTestLesson(setData);
    return () => {};
  }, []);

  const columns = [
    {
      title: "Mentor Name",
      dataIndex: "name",
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link
            to={`/admin/mentor-profile/${record.teacher_id}`}
            className="avatar avatar-sm mr-2"
          >
            <img
              className="avatar-img rounded-circle"
              src={
                record?.teacher?.image
                  ? baseImageUrl + record?.teacher?.image
                  : USER
              }
              alt="User Image"
            />
          </Link>
          <Link to={`/admin/mentor-profile/${record.teacher_id}`}>
            {record?.teacher?.first_name + " " + record?.teacher?.last_name}
          </Link>
        </h2>
      ),
      sorter: (a, b) =>
        a.teacher.first_name.length - b.teacher.first_name.length,
    },
    {
      title: "Course",
      dataIndex: "course",
      render: (text, record) => <div>{record.course_name}</div>,
      sorter: (a, b) => a.course_name.length - b.course_name.length,
    },

    {
      title: "Mentee Name",
      dataIndex: "mentee_name",
      render: (text, record) => (
        <h2 className="table-avatar">
          <Link
            to={`/admin/lead-profile/${record.student_id}`}
            className="avatar avatar-sm mr-2"
          >
            <img
              className="avatar-img rounded-circle"
              src={
                record?.student?.image
                  ? baseImageUrl + record?.student?.image
                  : USER
              }
              alt="User Image"
            />
          </Link>
          <Link to={`/admin/leadProfile/${record.student_id}`}>
            {record?.student?.first_name + " " + record?.student?.last_name}
          </Link>
        </h2>
      ),
      sorter: (a, b) => a.mentee_name.length - b.mentee_name.length,
    },
    {
      title: "Booking date",
      dataIndex: "booking_date",
      render: (text, record) => (
        <div className="d-flex justify-content-center flex-column align-items-center">
          <p className="mb-0">{record?.date}</p>
          <small className="text-center">
            {record.created_at.slice(0, 10)}
          </small>
        </div>
      ),
      sorter: (a, b) => a.booking_date.length - b.booking_date.length,
    },
    {
      title: "Booking time",
      dataIndex: "status",
      render: (text, record) => (
        <div className="d-flex justify-content-center flex-column  align-items-center">
          <p
            className={`p-1 rounded-3 mb-0 text-white  ${
              (record.status == 0 && "bg-info") ||
              (record.status == 1 && "bg-warning") ||
              (record.status == 2 && "bg-success") ||
              (record.status == 3 && "bg-primary") ||
              (record.status == 4 && "bg-danger")
            }`}
          >
            {record?.time}
          </p>

          {/* <small className="text-center">{record.created_at.slice(10)}</small> */}
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => <div>{0}so'm</div>,
    },
    {
      title: "Actions",
      dataIndex: "amount",
      render: (text, record) => (
        <div>
          <button
            className="btn btn-danger me-2"
            onClick={() => deleteTestLesson(record.id, setData)}
          >
            {" "}
            <i className="fas fa-times"></i>{" "}
          </button>
          {record.status == 0 ? (
            <button
              className="btn btn-secondary"
              onClick={() => accepted_test_tesson(record.id, setData)}
            >
              <i className="fas fa-check"></i>{" "}
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => canceled_test_tesson(record.id, setData)}
            >
              <i className="fas fa-check"></i>{" "}
            </button>
          )}
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
              <h3 className="page-title">Bookings</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin/index">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Bookings</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <Table
                    className="table-hover table-center mb-0"
                    pagination={{
                      total: data.length,
                      showTotal: (total, range) =>
                        `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                      showSizeChanger: true,
                      onShowSizeChange: onShowSizeChange,
                      itemRender: itemRender,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    // bordered
                    dataSource={data}
                    rowKey={(record) => record.id}
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
