import React, { useState } from "react";
const About = () => {
  const [accordion, setAccordion] = useState(0);
  const openAccordion = (id) => {
    if (accordion !== id) {
      setAccordion(id);
    } else if (accordion == id) {
      setAccordion(0);
    }
  };
  return (
    <div className="about">
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/app/index">My Teacher</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    My Teacher haqida
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">My Teacher haqida</h2>
            </div>
          </div>
        </div>
      </div>
      <div style={{ minHeight: "400px" }} className="container  py-5">
        <div className="border-bottom px-4">
          <div className="accordion_menu ">
            <div className="accordion_btn" onClick={() => openAccordion(1)}>
              <span>Biz haqimizda</span>
              {accordion == 1 ? (
                <i className="fas fa-minus"></i>
              ) : (
                <i className="fas fa-plus"></i>
              )}{" "}
            </div>
            <div
              className={`accordion_body ${
                accordion == 1 ? "accordion_active" : ""
              }`}
            >
              <p className="mb-3">
                Assalomu alaykum. Mening ismim Sardor, MyTeacher online
                platformasi startapining asoschisi bo’laman.
              </p>
              <p className="mb-3">
                Bu loyiha, qo’shimcha til o’rganish yoki bilim olish uchun,
                kuchli, bilimli va SARALANGAN o’qituvchilarni oson topish hamda
                ulardan onlayn dars o’rganishga, shuningdek, xuddi shu
                platformada, o’z bilimi evaziga qo’shimcha daromad olishga
                sharoit yaratib beradi. Ya’ni ONLINE marketplace, yoki TA’LIM
                BOZORI deyishimiz mumkin.
              </p>
              <p className="mb-3">
                Saytda o’qituvchilar, tajribasi, narxi, sertifikatlari,
                o’quvchilar tomonidan bildirilgan fikrlar hamda xuddi Yandex
                taxida gi kabi yulduzchali reyting tizimi bo’yicha saralanadi.
              </p>
              <p className="mb-3">
                Darslar online o’tilganligi sababli, biz Vaqt, qo’shimcha
                daromad topish, aynan sinalgan ustozlarni topish, jismoniy
                imkoniyati cheklangan kishilarga masofadan o’qib mutaxassis
                bo’lish va daromad olish kabi muammolarga yechim bo’la olamiz.
              </p>
              <p className="mb-3">
                Xo’sh bu qanday ishlaydi? Darslar zoom yoki boshqa videoaloqa
                dasturi orqali individual o’tiladi, har bir dars o’quvchi
                tomonidan ham o’qituvchi tomonidan ham yulduzchali reyting
                bo’yicha baholab boriladi. Har bir dars online jurnalga tushirib
                boriladi. O’quvchi o’zining baholariga qarab qay darajada
                o’zlashtirayotganini kuzatib bora oladi.
              </p>

              <p className="mb-3">
                Skreenshotda o’qituvchilar doskasini ko’rishingiz mumkin.
              </p>

              <p className="mb-3">
                Bizning maqsadli auditoriyamiz. Tig’iz ish grafigiga ega bo’lib
                kurslarga qatnashga imkoniyati yoq kishilar, Jismoniy imkoniyati
                cheklanganlar, Homilador ayollar va uy bekalari, Abituriyentlar
                hamda talabalar va hozirda asosiy contingent bolib turgan Chet
                elda o’qib, ishlab yurgan vatandoshlarimiz.
              </p>
              <p className="mb-3">
                Raqobatchilarimiz esa, OLX hamda Preply.com saytlari bo’lishi
                mumkin. Olxdan ustunligimiz, aynan bitta nishaga qaratilganimiz,
                va yuqorida sanab o’tilgan ta’lim jarayoni uchun kerak bo’lgan
                qulayliklarning bu platformada yo’qligi bo’lsa, Preply esa
                o’zbekcha content hamda o’zbekcha to’lov tizimiga ega emasligi
                hamda, va uni O’zbekiston bozoriga hali kirib kelmaganligi
                bizning ustunligimiz hisoblanadi.
              </p>
              <p className="mb-3">
                Biz online ta’lim bo’yicha xizmat ko’rsatishni O’zbekistonda
                2018 yilda eng birinchi bo’lib boshlaganmiz va shu yo’nalishda
                eng ko’p tajribaga egamiz deya olaman. Startapimizga
                boshlanganidan beri uchta asosiy VIRAJ ya’ni bozor talabidan
                kelib chiqib tubdan o’zgartirish kiritildi, bular: Onlayn maktab
                shaklidan marketplace shakliga o’tkazildi, Faqat chet tillari
                emas barcha fanlardan ustozlar olinadigan bo’ladi, va hattoki
                Eski WEBCLASS nomini ham boshqasiga, ya’ni MyTeacherga
                o’zgartirildi.
              </p>
              <p className="mb-3">
                Biznes modelimiz- ustozlardan har bir o’tilgan dars uchun
                komissiya olish hisoblanadi. Bunda ustoz bir oyda qancha ko’p
                soat dars o’tsa narxning shuncha katta ulushiga ega bo’ladi.
              </p>
              <p className="mb-3"> Onlayn klublarga a’zo bo’lasiz;</p>
              <p className="mb-3">
                Bu ularni platformadan chiqib ketmaslikka va biz bilan ko’proq
                ishlashga undaydi.
              </p>
              <p className="mb-3">
                Bizning marketing kanallarimiz, asosan internet orqali targeting
                qilish hisoblanadi. Mablag’ jalb qila olsak, platformani
                mukammallashtirib bo’lgach Televideniye reklamasidan ham aktiv
                foydalanish maqsadidamiz. Bular uchun foydamizning 20% gacha
                ulushini tikishga tayyormiz.
              </p>
              <p className="mb-3">
                Kelajak maqsadlarimiz esa shu yilning o’zida platformamizni va
                mobil ilovani 90 foizga ishlatish, 22 yilda bitta qo’shni
                mamlakat bozorida o’zimizni sinab ko’rish va 23 yilga kelib
                markaziy osiyoda online ta’lim bo’yicha eng zo’r platformaga
                aylanish.
              </p>
              <p className="mb-3">
                Asosiy operatsion jamoamiz, 8 kishidan iborat bo’lib hammamiz
                loyihamiz bo’yicha tegishli yo’nalishlarda bir yildan 9 yilgacha
                tajribaga egamiz.
              </p>
              <p className="mb-3">E’TIBORINGIZ UCHUN RAHMAT!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
