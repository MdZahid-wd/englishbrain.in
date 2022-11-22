import React from "react";
import "./courses.css";
import { online } from "../../dummydata";
import Heading from "../common/heading/Heading";
import Course from "../view courses/Course";
import { useState } from "react";

const OnlineCourses = () => {
  function courseClick(event) {
    let x = event.currentTarget.querySelector(
      "#unique-course-name-h1"
    ).innerHTML;
    setCourseName(x);
  }
  var [courseName, setCourseName] = useState();
  return (
    <>
      <section className="online">
        <div className="container">
          <Heading subtitle="COURSES" title="your own Courses" />
          <div className="content grid3">
            {online.map((val) => (
              <div onClick={courseClick} className="box">
                <div className="img">
                  <img src={val.cover} />
                  <img src={val.hoverCover} alt="" className="show" />
                </div>
                <h1 id="unique-course-name-h1">{val.courseName}</h1>
                <span>{val.course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {courseName && <Course courseName={courseName}></Course>}
    </>
  );
};

export default OnlineCourses;
