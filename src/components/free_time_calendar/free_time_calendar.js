import React from "react";
import { Swiper } from "swiper/react/swiper";
import { SwiperSlide } from "swiper/react/swiper-slide";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Navigation } from "swiper";
import useWindowSize from "../../hooks/useWindowSize";

SwiperCore.use([Navigation]);

const Free_time_calendar = ({ data, time_choose, date_id }) => {
  const { width } = useWindowSize();
  return (
    <>
      <div className="row">
        <div className="col-12 p-0 p-md-3">
          <div className="calendarMentor">
            <Swiper navigation={true} className="mySwiper">
              {data.length > 0 &&
                data.map((v, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <div className="booking-schedule schedule-widget">
                        {/* Schedule Header */}
                        <div className="schedule-header">
                          <div className="row">
                            <div className="col-md-12 ">
                              {/* Day Slot */}
                              <div className="day-slot">
                                <ul>
                                  {v.dayOfWeek.map((v, i) => (
                                    <li key={i}>
                                      <span>{v.weekDay}</span>
                                      <span className="slot-date">
                                        <small className="slot-year">
                                          {width <= 768
                                            ? v.day.slice(8, 12)
                                            : v.day}
                                        </small>
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {/* /Day Slot */}
                            </div>
                          </div>
                        </div>
                        {/* /Schedule Header */}
                        {/* Schedule Content */}
                        <div className="schedule-cont">
                          <div className="row">
                            <div className="col-md-12">
                              {/* Time Slot */}
                              <div className="time-slot">
                                <ul className="clearfix">
                                  {v.dayOfWeek.map((v, i) => {
                                    return (
                                      <li key={i}>
                                        {v.hours.length > 0 &&
                                        v.hours[0] !== null ? (
                                          v.hours.map((value, index) => {
                                            return (
                                              <div
                                                className={`mb-2  ${
                                                  value?.action === 1 &&
                                                  "d-none m-0 p-0"
                                                }`}
                                                key={index}
                                              >
                                                <div
                                                  className={`timing`}
                                                  key={index}
                                                  onClick={() =>
                                                    time_choose(idx, i, index)
                                                  }
                                                  style={{
                                                    backgroundColor:
                                                      date_id.idx == idx &&
                                                      date_id.id == i &&
                                                      date_id.index == index
                                                        ? "#1e88e5"
                                                        : "",
                                                    color:
                                                      date_id.idx == idx &&
                                                      date_id.id == i &&
                                                      date_id.index == index
                                                        ? "#fff"
                                                        : "",
                                                    cursor: "pointer",
                                                  }}
                                                >
                                                  <span>{value?.time}</span>
                                                </div>
                                              </div>
                                            );
                                          })
                                        ) : (
                                          <div
                                            className="timing"
                                            key={i}
                                            style={{
                                              cursor: "pointer",
                                            }}
                                          >
                                            <span>Band</span>
                                          </div>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                              {/* /Time Slot */}
                            </div>
                          </div>
                        </div>
                        {/* /Schedule Content */}
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};
export default Free_time_calendar;
