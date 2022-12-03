import React from "react";
import "./courses.css";
import { coursesCard } from "../../dummydata";
import Heading from "../common/heading/Heading";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CoursesCard = () => {
  let [studentInfo, setStudentInfo] = useState();
  const enRollClick = async (ev) => {
    let x = ev.currentTarget.name;
    console.log(x);
    try {
      const { data } = await axios.post("/api/enRollCourse", { id: x });

      if (data == "login first") {
        document.getElementById(x).lastChild.removeAttribute("hidden");
      } else {
        if (studentInfo != data) {
          setStudentInfo(data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log("student update");
    if (studentInfo) {
      document.getElementById("enRoll-link").click();
    }
  }, [studentInfo]);
  const viewVideoClick = async () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Link id="enRoll-link" to="/payment" state={studentInfo} hidden>
        payment
      </Link>

      <section className="coursesCard">
        <Heading subtitle="COURSES" title="Browse More Courses" />
        <div className="container grid2">
          {coursesCard.map((val) => (
            <div className="items" id={val.coursesName}>
              <div className="content flex">
                <div className="left">
                  <div className="img">
                    <img src={val.cover} alt="" />
                  </div>
                </div>
                <div className="text">
                  <h1>{val.coursesName}</h1>
                  <div className="rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <label htmlFor="">(5.0)</label>
                  </div>
                  <div className="details">
                    {val.courTeacher.map((details) => (
                      <>
                        <div className="box">
                          <div className="dimg">
                            <img src={details.dcover} alt="" />
                          </div>
                          <div className="para">
                            <h4>{details.name}</h4>
                          </div>
                        </div>
                        <span>{details.totalTime}</span>
                      </>
                    ))}
                  </div>
                </div>
              </div>

              <div className="price">
                <h3>
                  {val.priceAll} / {val.pricePer}
                </h3>
              </div>
              <button
                name={val.coursesName}
                onClick={(ev) => enRollClick(ev)}
                className="outline-btn"
              >
                ENROLL NOW !
              </button>
              <div
                hidden
                className="please-login-first-button"
                onClick={() => viewVideoClick()}
              >
                please login first <i class="fa-solid fa-chevron-down"></i>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CoursesCard;
