/**
 * Basic Table
 */
import React, { Component, Fragment } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';

class BasicTable extends Component {

	render() {
		
		return (
			<div className="page-wrapper">
			<Helmet>
				  <title>Basic Tables - Mentoring</title>
				  <meta name="description" content="Login page"/>					
			</Helmet>
			<div className="content container-fluid">
			  {/* Page Header */}
			  <div className="page-header">
				<div className="row">
				  <div className="col">
					<h3 className="page-title">Basic Tables</h3>
					<ul className="breadcrumb">
					  <li className="breadcrumb-item"><Link to="/blue/app/main/dashboard">Dashboard</Link></li>
					  <li className="breadcrumb-item active">Basic Tables</li>
					</ul>
				  </div>
				</div>
			  </div>
			  {/* /Page Header */}
			  <div className="row">
				<div className="col-lg-6">
				  <div className="card">
					<div className="card-header">
					  <h4 className="card-title mb-0">Basic Table</h4>
					</div>
					<div className="card-body">
					  <div className="table-responsive">
						<table className="table mb-0">
						  <thead>
							<tr>
							  <th>First Name</th>
							  <th>Last Name</th>
							  <th>Email</th>
							</tr>
						  </thead>
						  <tbody>
							<tr>
							  <td>John</td>
							  <td>Doe</td>
							  <td>john@example.com</td>
							</tr>
							<tr>
							  <td>Mary</td>
							  <td>Moe</td>
							  <td>mary@example.com</td>
							</tr>
							<tr>
							  <td>July</td>
							  <td>Dooley</td>
							  <td>july@example.com</td>
							</tr>
						  </tbody>
						</table>
					  </div>
					</div>
				  </div>
				</div>
				<div className="col-lg-6">
				  <div className="card">
					<div className="card-header">
					  <h4 className="card-title mb-0">Striped Rows</h4>
					</div>
					<div className="card-body">
					  <div className="table-responsive">
						<table className="table table-striped mb-0">
						  <thead>
							<tr>
							  <th>First Name</th>
							  <th>Last Name</th>
							  <th>Email</th>
							</tr>
						  </thead>
						  <tbody>
							<tr>
							  <td>John</td>
							  <td>Doe</td>
							  <td>john@example.com</td>
							</tr>
							<tr>
							  <td>Mary</td>
							  <td>Moe</td>
							  <td>mary@example.com</td>
							</tr>
							<tr>
							  <td>July</td>
							  <td>Dooley</td>
							  <td>july@example.com</td>
							</tr>
						  </tbody>
						</table>
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

export default BasicTable;
