import React from "react";
import { useLocation } from "react-router-dom";
import Back from "../common/back/Back";
import "./enRollCourse.css";

const EnRollCourse = () => {
  const location = useLocation();
  const propsData = location.state;
  console.log(propsData, "porps from wbbse");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  return (
    <>
      <section className="enrollCourse">
        <Back></Back>
        <div className="course-information-div">
          <div className="items">
            <div className="content flex">
              <div className="left">
                <div className="img">
                  <img src="" alt="" />
                </div>
              </div>
              <div className="text">
                <h1>{propsData.courseName}</h1>
                <div className="rate">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <label htmlFor="">(5.0)</label>
                </div>
                <div className="details">
                  <>
                    <div className="box">
                      <div className="dimg">
                        <img src="" alt="" />
                      </div>
                      <div className="para">
                        <h4>detail</h4>
                      </div>
                    </div>
                    <span>detail totaltis</span>
                  </>
                </div>
              </div>
            </div>

            <div className="price">
              <h3>pricse</h3>
            </div>
          </div>
        </div>
        <div className="enroll-card-body">
          <form className="">
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="name"
                value={propsData.name}
                required
                placeholder="Enter your Name"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                name="email"
                value={propsData.email}
                required
                placeholder="Enter your Email"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                name="phone"
                value={propsData.postcode}
                required
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                name="amount"
                value={propsData.courseName}
                required
                placeholder="Amount"
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="message"
                value={propsData.courseName}
                placeholder="Message"
              />
            </div>
            <div className="form-group">
              <button className="btn form-control btn-primary">
                Proceed to Pay
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EnRollCourse;
