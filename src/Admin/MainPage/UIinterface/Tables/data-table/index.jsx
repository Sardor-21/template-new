/**
 * Data Table
 */
import React from "react";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import "antd/dist/antd.css";
import { itemRender, onShowSizeChange } from "../../../paginationfunction";
import "../../../antdstyle.css";
import { Link } from "react-router-dom";

// Datatable JS
// import "../../../assets/js/jquery.dataTables.min.js";
// import "../../../assets/js/dataTables.bootstrap4.min.js";

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          name: "Tiger Nixon",
          position: "System Architect",
          office: "Edinburgh",
          age: "61",
          salary: "320,800",
        },
        {
          id: 2,
          name: "Brenden Wagner",
          position: "Software Engineer",
          office: "San Francisco",
          age: "28",
          salary: "206,850",
        },
        {
          id: 3,
          name: "Fiona Green",
          position: "Chief Operating Officer (COO)",
          office: "San Francisco",
          age: "48",
          salary: "850,000",
        },
      ],
    };
  }

  render() {
    const { data } = this.state;
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.length - b.name.length,
      },
      {
        title: "Position",
        dataIndex: "position",
        sorter: (a, b) => a.position.length - b.position.length,
      },

      {
        title: "Office",
        dataIndex: "office",
        sorter: (a, b) => a.office.length - b.office.length,
      },

      {
        title: "Age",
        dataIndex: "age",
        sorter: (a, b) => a.age - b.age,
      },

      {
        title: "Salary",
        dataIndex: "salary",
        render: (text, record) => <span>$ {text}</span>,
        sorter: (a, b) => a.salary.length - b.salary.length,
      },
    ];
    return (
      <div className="page-wrapper">
        <Helmet>
          <title>Data Tables - Mentoring</title>
          <meta name="description" content="Data Tables" />
        </Helmet>

        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col">
                <h3 className="page-title">Data Tables</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/blue/app/main/dashboard">Dashboard</Link>
                  </li>
                  <li className="breadcrumb-item active">Data Tables</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card mb-0">
                <div className="card-header">
                  <h4 className="card-title mb-0">Default Datatable</h4>
                  <p className="card-text">
                    This is the most basic example of the datatables with zero
                    configuration. Use the <code>.datatable</code> class to
                    initialize datatables.
                  </p>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <Table
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
                      bordered
                      dataSource={data}
                      rowKey={(record) => record.id}
                      onChange={this.handleTableChange}
                    />
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

export default DataTable;
