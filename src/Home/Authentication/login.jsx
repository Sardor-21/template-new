import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { Link, useHistory } from "react-router-dom";
import { login } from "../../Api";
const Login = (props) => {
  const history = useHistory();
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [inputType, setInputType] = useState("password");

  const changeInputPassword = () => {
    if (inputType == "password") {
      setInputType("text");
    } else if (inputType == "text") {
      setInputType("password");
    }
  };
  const loginMyteacher = (e) => {
    e.preventDefault();
    let data = {
      phone_number,
      password,
    };
    login(data, history);
  };

  return (
    <>
      <div className="bg-pattern-style bg_blur">
        <div className="content">
          {/* Login Tab Content */}
          <div className="account-content">
            <div className="account-box">
              <div className="login-right">
                <div className="login-header">
                  <h3>
                    <span>MyTeacher</span>ga kirish
                  </h3>
                  <p className="text-muted">Shaxsiy kabinetga kirish</p>
                </div>
                <form onSubmit={loginMyteacher}>
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
                  <div className="form-group">
                    <label className="form-control-label">Parolingiz</label>
                    <div className="pass-group">
                      <input
                        type={inputType}
                        className="form-control pass-input"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        className={` ${
                          inputType == "password"
                            ? "fas fa-eye "
                            : "fas fa-eye-slash"
                        } toggle-password`}
                        onClick={changeInputPassword}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <Link className="forgot-link" to="/forgot-password">
                      Parolni unutdingizmi?
                    </Link>
                  </div>
                  <button type="submit" className="btn btn-primary login-btn">
                    Kirish
                  </button>
                  {/* <button className="btn btn-primary login-btn" type="submit">Login</button> */}
                  <div className="text-center dont-have">
                    Ro'yxatdan o'tmaganmisiz?{" "}
                    <Link to="/register">Ro'yxatdan o'tish</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* /Login Tab Content */}
        </div>
      </div>
    </>
  );
};

export default Login;
