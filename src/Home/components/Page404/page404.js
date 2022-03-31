import React from "react";
import { Link } from "react-router-dom";
import "./page404.css";
const Page404 = () => {
  return (
    <section className="page_404">
      <div className="container-fluid">
        <div className="row m-0 p-0 ">
          <div className="col-sm-12 text-center ">
            <div className="four_zero_four_bg">
              <h1 className="text-center ">404</h1>
            </div>

            <div className="contant_box_404">
              <h3 className="h2">Sahifa topilmadi</h3>

              <p>Siz qidirayotgan sahifa mavjud emas</p>

              <Link to="/home" className="link_404">
                Bosh sahifaga qaytish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
