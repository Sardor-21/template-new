import React, { useEffect, useState } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import {
  itemRender,
  onShowSizeChange,
  pageSizeOption,
} from "../paginationfunction";
import "../antdstyle.css";
import "./index.css";
import { Link } from "react-router-dom";
import { TeacherList } from "../../Api";
import { useSelector } from "react-redux";
import { USER } from "../../imagepath";
import { useMemo } from "react";
import { baseImageUrl } from "../../../Api/helpers/baseUrlImage";

const Clients = () => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  const [page, setPage] = useState({
    pageSize: 10,
    current: 1,
  });
  const teacher_list = useSelector((state) => state?.Admin?.teacher_list);

  const teacher_status_list = useSelector(
    (state) => state?.Admin?.teacher_status_list
  );

  const filterData = useMemo(() => {
    return teacher_list?.filter(
      (v) =>
        v.first_name.toLowerCase().includes(search.toLowerCase()) ||
        v.last_name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, teacher_list]);

  const data = filterData;

  const getCategoryTeacher = (id, index) => {
    localStorage.setItem("status_id", id);
    localStorage.setItem("status_index", index);
    TeacherList({
      status_id: localStorage.getItem("status_id")
        ? localStorage.getItem("status_id")
        : teacher_status_list[id].id,
    });
  };

  useEffect(() => {
    TeacherList(
      localStorage.getItem("status_id")
        ? {
            status_id: localStorage.getItem("status_id"),
          }
        : ""
    );
  }, []);

  const columns = [
    {
      title: "Ism Familiyasi",
      dataIndex: "first_name",
      render: (text, record, index) => (
        <h2 className="table-avatar">
          <Link
            to={`/admin/mentor-profile/${record.user_id}`}
            className="avatar avatar-sm mr-2"
          >
            <img
              className="avatar-img rounded-circle"
              src={record?.image ? baseImageUrl + record?.image : USER}
              alt="User Image"
            />
          </Link>
          <Link to={`/admin/mentor-profile/${record.user_id}`}>
            {record.first_name} {record.last_name}
          </Link>
        </h2>
      ),
      sorter: (a, b) => a.first_name.length - b.first_name.length,
    },
    {
      title: "Telefon Raqami",
      dataIndex: "phone_number",
      render: (text, record, index) => (
        <h2 className="table-avatar">{record.phone_number}</h2>
      ),
      sorter: (a, b) => a.phone_number.length - b.phone_number.length,
      width: "180px",
    },
    {
      title: "Fani",
      dataIndex: "course_name",
      sorter: (a, b) => a.course_name.length - b.course_name.length,
      width: "180px",
    },
    {
      title: "O'quvchilar soni",
      dataIndex: "student_count",
      render: (text, record, index) => <div>{text}</div>,
      width: "180px",
    },

    {
      title: "Qolgan/D/S",
      dataIndex: "lesson_count",
      render: (text, record, index) => <h2 className="table-avatar">{text}</h2>,
      width: "180px",
    },
    {
      title: "To'lanadigan/D/S",
      dataIndex: "unpaid_count",
      render: (text, record, index) => <h2 className="table-avatar">{text}</h2>,
      width: "180px",
    },
    {
      title: "Oylik summa",
      dataIndex: "unpaid_prise",
      render: (text, record, index) => <h2 className="table-avatar">{text}</h2>,
    },
  ];

  const openAndCloseSelect = () => {
    setActive(!active);
  };
  console.log(active);
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        {/* Page Header */}
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">List of Mentor</h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/admin/index">Dashboard</Link>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Users</a>
                </li>
                <li className="breadcrumb-item active">Mentor</li>
              </ul>
            </div>
          </div>
        </div>
        {/* /Page Header */}
        <div className="row">
          <div className="col-sm-6 mb-3">
            <div className="drop-select form-control">
              <div
                className="w-100 h-100 d-flex align-items-center"
                onClick={openAndCloseSelect}
              >
                {
                  teacher_status_list[
                    Number(localStorage.getItem("status_index"))
                  ]?.description
                }
              </div>
              <div className={`drop-item ${active && "active"}`}>
                {teacher_status_list?.map((value, index) => {
                  return (
                    <div
                      onClick={() => {
                        getCategoryTeacher(value.id, index);
                        openAndCloseSelect();
                      }}
                      key={value.id}
                    >
                      {value.description}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-sm-6 mb-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              placeholder="...search"
              type="text"
            />
          </div>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <Table
                    className="table-hover table-center mb-0"
                    pagination={{
                      total: data?.length,
                      showTotal: (total) => (
                        <p className="mt-1">Total: {total}</p>
                      ),
                      showSizeChanger: true,
                      pageSize: page.pageSize,
                      onShowSizeChange: (current, page) =>
                        onShowSizeChange(current, page, setPage),
                      itemRender: itemRender,
                      // current: page.current,
                      pageSizeOptions: pageSizeOption,
                    }}
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    dataSource={data}
                    rowKey={(record) => record.phone_number}
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
