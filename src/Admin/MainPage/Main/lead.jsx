import React, { useEffect, useState, useMemo } from "react";
import { USER } from "../../imagepath";
import { Link } from "react-router-dom";
import { Table } from "antd";
import "antd/dist/antd.css";
import {
  itemRender,
  onShowSizeChange,
  pageSizeOption,
} from "../paginationfunction";
import "../antdstyle.css";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import FormGroup from "../../UI/input/MyInput";
import PhoneInput from "react-phone-number-input";
import { addLead, getLead, add_text_lead } from "../../Api";
import { useSelector } from "react-redux";
import { baseImageUrl } from "../../../Api/helpers/baseUrlImage";
import { ExportCSV } from "./ExportCSV";

const Lead = () => {
  const lead_list = useSelector((state) => state.Admin.lead_list);
  const [actions, setActions] = useState("");
  const [search, setSearch] = useState("");
  const data = useMemo(() => {
    let data = lead_list.filter(
      (v) =>
        v.first_name?.toLowerCase().includes(search.toLowerCase()) ||
        v.last_name?.toLowerCase().includes(search.toLowerCase()) ||
        v.phone_number?.toLowerCase().includes(search.toLowerCase()) ||
        v.comments[0]?.comment?.toLowerCase().includes(search.toLowerCase())
    );
    if (actions) {
      return data.filter((v) => v.text?.includes(actions));
    } else {
      return data;
    }
  }, [lead_list, actions, search]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      render: (text, record, index) => <span>{text}</span>,
      sorter: (a, b) => a.phone_number.length - b.phone_number.length,
    },
    {
      title: "Ism Familiyasi",
      dataIndex: "first_name",
      render: (text, record, index) => (
        <h2 className="table-avatar">
          <Link
            to={`/admin/leadProfile/${record.id}`}
            className="avatar avatar-sm mr-2"
          >
            <img
              className="avatar-img rounded-circle"
              src={record?.image ? `${baseImageUrl}${record.image}` : USER}
              alt="User Image"
            />
          </Link>
          <Link to={`/admin/leadProfile/${record.id}`}>
            {record.first_name} {record.last_name}
          </Link>
        </h2>
      ),
      sorter: (a, b) => a.first_name.length - b.first_name.length,
      width: "220px",
    },
    {
      title: "Telefon raqam",
      dataIndex: "phone_number",
      sorter: (a, b) => a.phone_number.length - b.phone_number.length,
    },
    {
      title: "Commentlar",
      dataIndex: "comments",
      render: (text, record) => (
        <div
          className="overflow-hidden"
          style={{ width: "320px", textOverflow: "ellipsis" }}
        >
          {text[text.length - 1]?.comment
            ? text[text.length - 1]?.comment
            : "Mavjud emas"}
        </div>
      ),
    },
    {
      title: (
        <select
          onChange={(e) => getLead(e.target.value)}
          className="form-control"
        >
          <option value="lead-list">Hammasi</option>
          <option value="daily-leads">Kunlik</option>
          <option value="weekly-leads">Haftalik</option>
          <option value="monthly-leads">Oylik</option>
        </select>
      ),
      dataIndex: "created_at",
      render: (text, record) => (
        <span>
          <small>
            {new Date(text).toString().slice(4, 10)}
            {new Date(text).toString().slice(15, 21)}
          </small>
        </span>
      ),
    },
    {
      title: (
        <select
          className="form-control"
          onChange={(e) => setActions(e.target.value)}
        >
          <option value={""}>Hammasi</option>
          <option value={"Qayta qo'ng'iroq"}>Qayta qo'ng'iroq</option>
          <option value={"Ulanib bo'lmadi"}>Ulanib bo'lmadi</option>
          <option value={"Sifatsiz Lead"}>Sifatsiz Lead</option>
          <option value={"To'lov kutilmoqda"}>To'lov kutilmoqda</option>
        </select>
      ),
      dataIndex: "id",
      render: (text, record) => (
        <div className="btn-group ms-3">
          <button
            type="button"
            className="btn btn-secondary text-white "
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {!record.text ? "Harakat" : record.text}
          </button>

          <ul
            className="dropdown-menu w-75"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() =>
                  add_text_lead(text, { text: "Qayta qo'ng'iroq" })
                }
              >
                Qayta qo'ng'iroq
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => add_text_lead(text, { text: "Ulanib bo'lmadi" })}
              >
                Ulanib bo'lmadi
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() => add_text_lead(text, { text: "Sifatsiz Lead" })}
              >
                Sifatsiz Lead
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={() =>
                  add_text_lead(text, { text: "To'lov kutilmoqda" })
                }
              >
                To'lov kutilmoqda
              </a>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getLead();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [page, setPage] = useState({
    pageSize: 10,
    current: 1,
  });

  const toggleModal = () => {
    setOpenModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      first_name,
      last_name,
      email: first_name + "@gmail.com",
      phone_number,
      password: "123456789",
      password_confirmation: "123456789",
      offert: 1,
    };

    addLead(data);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row w-100">
              <div className="col-sm-12 col-md-6">
                <h3 className="page-title">Leadlar ro'yxati</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/admin/index">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="">Users</a>
                  </li>
                  <li className="breadcrumb-item active">Lead</li>
                </ul>
              </div>
              <div className="col-sm-12 col-md-6 d-flex justify-content-end align-items-center">
                <ExportCSV csvData={data} fileName={actions} />

                <button className="btn btn-primary ms-3" onClick={toggleModal}>
                  Lead qo'shish
                </button>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-12 p-3">
              <input
                type="text"
                className="form-control"
                placeholder="Leadlarni qidirish"
                onChange={(e) => setSearch(e.target.value)}
                value={search || ""}
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
                      bordered
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

      <Modal isOpen={openModal} toggle={() => setOpenModal(false)} centered>
        <ModalHeader toggle={() => setOpenModal(false)}>
          Lead Qo'shish
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-6">
                <FormGroup
                  value={first_name}
                  setValue={setFirstName}
                  label={"Ism"}
                  type={"text"}
                />
              </div>
              <div className="col-12 col-md-6">
                <FormGroup
                  value={last_name}
                  setValue={setLastName}
                  label={"Familya"}
                  type={"text"}
                />
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label className="form-control-label">
                    Telefon raqamingiz
                  </label>
                  <PhoneInput
                    international
                    defaultCountry="UZ"
                    value={phone_number}
                    onChange={setPhoneNumber}
                  />
                </div>
              </div>
              <div className="col-12 d-flex align-items-center justify-content-center">
                <button
                  onClick={() => setOpenModal(false)}
                  className={`btn btn-success px-2 py-1 ${
                    first_name === "" || last_name === "" || phone_number === ""
                      ? "disabled"
                      : ""
                  }`}
                  type="submit"
                >
                  Saqlash
                </button>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default Lead;
