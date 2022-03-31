import React, { useState, useEffect } from "react";
import { USER } from "../../constant/imagepath_home";
import Sidebar from "./sidebar";
import StickyBox from "react-sticky-box";
import { Link, useHistory } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import { useSelector } from "react-redux";
import { UpdateTeacher, getCourses } from "../../Api";
import {
  aboutUsdata,
  experienceData,
  languageData,
  priceData,
} from "../../Data/index";
import AvatarImageCropper from "react-avatar-image-cropper";
import FormGroup_2 from "../../UI/FormGroup/FormGroup_2";
import MySelect from "../../UI/Select/MySelect";
import MySelect_2 from "../../UI/Select/MySelect_2";
import Validation from "./components/Validation";
import { Register_off } from "../../redux/Actions";
import { baseImageUrl } from "../../Api/helpers/baseUrlImage";

const ProfileSettings = () => {
  const history = useHistory();
  const userdata = useSelector((state) => state.Reducer.userdata);
  const coursesData = useSelector((state) => state.Reducer.courses_list);

  const [imgmodal, setImgModal] = useState(false);

  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const id = localStorage.getItem("user_id");

  const apply = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setData({ ...data, image: file });
      setImgModal(false);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    getCourses();
    setData({
      image: localStorage.getItem("image")
        ? localStorage.getItem("image")
        : userdata?.user?.image,
      first_name: localStorage.getItem("first_name")
        ? localStorage.getItem("first_name")
        : userdata?.user?.first_name,
      email: localStorage.getItem("email")
        ? localStorage.getItem("email")
        : userdata?.user?.email,
      last_name: localStorage.getItem("last_name")
        ? localStorage.getItem("last_name")
        : userdata?.user?.last_name,
      phone_number: localStorage.getItem("phone_number")
        ? localStorage.getItem("phone_number")
        : userdata?.user?.phone_number,
      telegram_number: localStorage.getItem("telegram_number")
        ? localStorage.getItem("telegram_number")
        : userdata?.user?.telegram_number,
      course_id: localStorage.getItem("course_id")
        ? localStorage.getItem("course_id")
        : userdata?.user?.course_id || "1",
      price: localStorage.getItem("price")
        ? localStorage.getItem("price")
        : userdata?.user?.price,
      description: localStorage.getItem("description")
        ? localStorage.getItem("description")
        : userdata?.user?.description,
      experience: localStorage.getItem("experience")
        ? localStorage.getItem("experience")
        : "1-3",
      birth_date: userdata?.user?.birth_date,
      language: ["O'zbek"],
      country: localStorage.getItem("country")
        ? localStorage.getItem("country")
        : userdata?.user?.country,
      region: localStorage.getItem("region")
        ? localStorage.getItem("region")
        : userdata?.user?.region,
      resume: userdata?.user?.resume,
      graduate: localStorage.getItem("graduate")
        ? localStorage.getItem("graduate")
        : userdata?.user?.graduate,
      about_us: localStorage.getItem("about_us")
        ? localStorage.getItem("about_us")
        : "Telegram",
      certificate: userdata?.user?.certificate,
      offert_price: 0
    })
  }, [userdata]);

  const updateTeacher = (e) => {
    setErrors({});
    e.preventDefault();
    let obj = Object.keys(Validation(data));
    if (obj.length == 0) {
      const fd = new FormData();
      fd.append("email", data.email);
      fd.append("first_name", data.first_name);
      fd.append("last_name", data.last_name);
      fd.append("phone_number", data.phone_number);
      fd.append("telegram_number", data.telegram_number);
      fd.append("course_id", data.course_id);
      fd.append("price", data.price);
      fd.append("description", data.description);
      fd.append("image", data.image);
      fd.append("experience", data.experience);
      fd.append("language", data.language);
      fd.append("country", data.country);
      fd.append("region", data.region);
      fd.append("about_us", data.about_us);
      fd.append("resume", data.resume);
      fd.append("graduate", data.graduate);
      fd.append("certificate", data.certificate);
      fd.append("birth_date", data.birth_date);
      fd.append("offert_price", data.offert_price);
      UpdateTeacher(fd, id, history);
    } else {
      setErrors(Validation(data));
    }
  };

  const offerta = () => {
    if (data.offert_price == 0) {
      setData({ ...data, offert_price: 1 });
    } else if (data.offert_price == 1) {
      setData({ ...data, offert_price: 0 });
    }
    console.log(data.offert_price)
  };
  const handleImg = () => {
    setImgModal(true);
  };

  const phone_change = (e) => {
    setData({ ...data, phone_number: e });
    localStorage.setItem("phone_number", e);
  };

  const register = useSelector((state) => state.Global.register);

  const handleOnchange = (e) => {
    localStorage.setItem(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (e) => {
    localStorage.setItem(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleFileOnchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.files[0] });
  };

  const handleLanguageDelete = (id) => {
    let language = { ...data.language };
    language.splice(id, 1);
    setData({ ...data, language: language });
  };
  const handleLanguageAdd = (e) => {
    let lang = data.language;
    lang.filter((v) => v == e).length == 0 &&
      lang.push(e) &&
      setData({ ...data, language: lang });
  };

  return (
    <div>
      {register && (
        <div className="alert_content">
          <div className="alert_item flex-column">
            <div className="text">
              Iltimos malumotlaringizni <br />
              to'ldirishingizni so'rab qolamiz!
            </div>
            <button
              className="btn"
              onClick={() => {
                Register_off();
                window.location.reload();
              }}
            >
              Xop tushunarli
            </button>
          </div>
        </div>
      )}

      {imgmodal && (
        <div className={`modalimg`} onClick={() => setImgModal(false)}>
          <div
            style={{
              borderRadius: "15px",
              width: "250px",
              height: "250px",
              margin: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <AvatarImageCropper
              text={"Rasm yuklash"}
              apply={apply}
              isBack={true}
            />
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Asosiy</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Profil sozlamari
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Profil sozlamari</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            {/* Profile Sidebar */}
            <div className="col-md-5 col-lg-4 col-xl-3">
              {/* Sidebar */}
              <StickyBox offsetTop={20} offsetBottom={20}>
                <Sidebar />
              </StickyBox>
              {/* /Sidebar */}
            </div>
            {/* /Profile Sidebar */}
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="card">
                <div className="card-body">
                  {/* Profile Settings Form */}
                  <form onSubmit={updateTeacher}>
                    <div className="row form-row">
                      <div className="col-12 col-lg-6">
                        <div className="form-group">
                          <div className="change-avatar">
                            <div className="profile-img">
                              {data.image && typeof data.image == "object" ? (
                                <img
                                  src={URL.createObjectURL(data.image)}
                                  alt="User Image"
                                />
                              ) : userdata?.user?.image ? (
                                <img
                                  src={`${baseImageUrl}${userdata?.user?.image}`}
                                  alt="User Image"
                                />
                              ) : (
                                <img src={USER} alt="User Image" />
                              )}
                            </div>
                            <div className="upload-img">
                              <div
                                className="change-photo-btn"
                                onClick={handleImg}
                              >
                                <span className="m-0">
                                  <i className="fa fa-upload" />
                                  Rasm yuklash
                                </span>
                              </div>
                              <small className="form-text text-muted">
                                Format:JPG, GIF yoki PNG. Maximum: 5MB
                              </small>
                              {errors.image && (
                                <p className="text-danger mt-2">
                                  Bu joyni to'ldirish shart
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <p className="quality_quarts">
                          Muammo bo'lsa shu raqamga qo'ng'iroq qiling
                          <a
                            href="tel:+998
                          97 300 30 11"
                          >
                            +998 97 300 30 11
                          </a>
                        </p>
                      </div>
                      <div className="col-12 col-md-6">
                        <FormGroup_2
                          label={"Ism"}
                          value={data.first_name}
                          name={"first_name"}
                          setValue={handleOnchange}
                          type={"text"}
                          error={errors.first_name}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <FormGroup_2
                          label={"Familiya"}
                          value={data.last_name}
                          name={"last_name"}
                          setValue={handleOnchange}
                          type={"text"}
                          error={errors.last_name}
                        />
                      </div>

                      <div className="col-12 col-md-6">
                        <FormGroup_2
                          label={"Tug'ilgan yilingiz"}
                          value={data.birth_date}
                          name={"birth_date"}
                          setValue={handleOnchange}
                          type={"date"}
                          error={errors.birth_date}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <MySelect_2
                          label={"Fan nomi"}
                          setValue={handleSelectChange}
                          name={"course_id"}
                          array={coursesData}
                          error={errors.course_id}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <FormGroup_2
                          label={"E-mail"}
                          value={data.email}
                          name={"email"}
                          setValue={handleOnchange}
                          type={"email"}
                          error={errors.email}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Telefon raqam</label>
                          <PhoneInput
                            international
                            defaultCountry="UZ"
                            value={data.phone_number}
                            onChange={phone_change}
                          />
                          {errors.phone_number && (
                            <p className="text-danger mt-2">
                              Bu joyni to'ldirish shart
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <FormGroup_2
                          label={
                            "Telegram akkauntingiz yoki raqamingizni kiriting"
                          }
                          value={data.telegram_number}
                          name={"telegram_number"}
                          setValue={handleOnchange}
                          type={"text"}
                          error={errors.telegram_number}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <MySelect_2
                          label={"Tajriba"}
                          setValue={handleSelectChange}
                          name={"experience"}
                          array={experienceData}
                          error={errors.experience}
                        />
                      </div>
                      <div className="col-12">
                        <MySelect
                          label={
                            "Qaysi tillarda dars o'ta olasiz? Bir nechta tanlashingiz mumkin"
                          }
                          setValue={handleLanguageAdd}
                          array={languageData}
                          error={errors.language}
                          item={data.language}
                          itemDelete={handleLanguageDelete}
                        />
                      </div>
                      <div className="col-12  ">
                        <label>
                          Bir soat darsingiz uchun necha pul olmoqchisiz iltimos
                          (<Link to="#">Narxlar bo'yicha kelishuv</Link>) bilan
                          tanishgan holda o'zizga mos narx kiriting
                        </label>
                        <MySelect_2
                          array={priceData}
                          setValue={handleSelectChange}
                          name={"price"}
                          error={errors.price}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Resyume yuklash</label>
                          <input
                            type="file"
                            accept="application/*"
                            className="form-control"
                            name="resume"
                            // value={data.resume || ""}
                            style={{ padding: "8px 0" }}
                            onChange={(e) => handleFileOnchange(e)}
                          />
                          {errors.resume && (
                            <p className="text-danger mt-2">
                              Bu joyni to'ldirish shart
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label>Sertifikatingiz agar bo'lsa</label>
                          <input
                            type="file"
                            name="certificate"
                            // value={data.certificate || ""}
                            onChange={(e) => {
                              handleFileOnchange(e);
                            }}
                            className="form-control"
                            style={{ padding: "8px 0" }}
                          />
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <MySelect_2
                          label={"Biz haqimizda qayerdan eshitdingiz"}
                          array={aboutUsdata}
                          setValue={handleSelectChange}
                          name={"about_us"}
                          error={errors.about_us}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <FormGroup_2
                          label={"Qayerni bitirgansiz yoki o'qiyabsiz?"}
                          value={data.graduate}
                          name={"graduate"}
                          setValue={handleOnchange}
                          type={"text"}
                          error={errors.graduate}
                        />
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label className="w-75">
                            O’quvchilar sizni tanlashlari uchun o’zingizning
                            dars o’tish uslubingiz haqida to’liqroq ma’lumot
                            bering. Sifatli e’lon sifatli mijozlarni chaqiradi.
                          </label>
                          <textarea
                            type="text"
                            minLength="30"
                            name="description"
                            value={data.description || ""}
                            onChange={(e) => handleOnchange(e)}
                            className="form-control"
                            cols="30"
                            rows="10"
                          />
                          <div className="d-flex flex-wrap">
                            {errors.description && (
                              <p className="text-danger mt-2">
                                Bu joyni to'ldirish shart
                              </p>
                            )}
                            {errors.description_length && (
                              <p className="text-danger ms-2 mt-2">
                                Belgilar soni 200 tadan kam bo'lmasligi lozim!
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-md-6">
                        <FormGroup_2
                          label={"Qayerdansiz"}
                          value={data.region}
                          name={"region"}
                          setValue={handleOnchange}
                          type={"text"}
                          error={errors.region}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <FormGroup_2
                          label={"Hozir qayerdasiz"}
                          value={data.country}
                          name={"country"}
                          setValue={handleOnchange}
                          type={"text"}
                          error={errors.country}
                        />
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <div className="custom-control custom-control-xs custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              name="agreeCheckboxUser"
                              id="agree_checkbox_user"
                              onClick={offerta}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="agree_checkbox_user"
                            >
                              Narxlar bilan
                              <Link className="mx-1" to="#">
                                tanishib
                              </Link>
                              chiqdim
                            </label>
                          </div>
                        </div> 
                      </div>
                    </div>

                    <div className="submit-section">
                      <button
                        type="submit"
                        className={`btn btn-primary submit-btn ${
                          data.offert_price == 0 ? "disabled" : ""
                        }`}
                      >
                        Saqlash
                      </button>
                    </div>
                  </form>
                  {/* /Profile Settings Form */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Page Content */}
    </div>
  );
};

export default ProfileSettings;
