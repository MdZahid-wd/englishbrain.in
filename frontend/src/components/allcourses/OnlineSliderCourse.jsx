import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import "./courses.css";
import { online } from "../../dummydata";
import Heading from "../common/heading/Heading";
import Course from "../view courses/Course";
import { useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules

import { FreeMode, Pagination } from "swiper";
let screen = 0;
var x = window.matchMedia("(max-width: 700px)");
if (x.matches) {
  console.log("3");
  screen = 3;
} else {
  console.log("6");
  screen = 6;
}
export default function OnlineSliderCourse() {
  function courseClick(event) {
    let x = event.currentTarget.querySelector(
      "#unique-course-name-h1"
    ).innerHTML;
    setCourseName(x);
  }

  var [noOfCard, setNoOfCard] = useState();
  var [courseName, setCourseName] = useState();
  return (
    <>
      <Heading subtitle="COURSES" title="your own Courses" />
      <Swiper
        slidesPerView={screen}
        spaceBetween={5}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {online.map((val) => (
          <SwiperSlide>
            <div className="online-box-div">
              <div onClick={courseClick} className="online-image-div">
                <img src={val.cover} />
                <img src={val.hoverCover} alt="" className="show" />
                <h6 id="unique-course-name-h1">{val.courseName}</h6>
                <span>{val.course}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {courseName && <Course courseName={courseName}></Course>}
    </>
  );
}
