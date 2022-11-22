import React from "react";
import axios from "axios";
import "./course.css";
import { useState } from "react";
import { useEffect } from "react";

const Course = (props) => {
  console.log(props.courseName);
  function fd(event) {
    let videoList = document.querySelectorAll(".video-list-container .list");

    videoList.forEach((vid) => {
      vid.classList.remove("active");
    });
    event.currentTarget.classList.add("active");
    let src1 = event.currentTarget.querySelector(".list-video .istSrc").src;
    let src2 = event.currentTarget.querySelector(".list-video .secondSrc").src;
    let title = event.currentTarget.querySelector(".list-title").innerHTML;
    console.log(src1, src2, title);
    document.querySelector(".main-video-container .main-video .istSrc").src =
      src1;
    document.querySelector(".main-video-container .main-video .secondSrc").src =
      src2;
    document.querySelector(".main-video-container .main-video").load();
    document.querySelector(".main-video-container .main-video").play();

    document.querySelector(".main-video-container .main-vid-title").innerHTML =
      title;
    if (datas) {
      for (var i = datas.totalDemoVideo; i <= datas.totalVideo; i++) {
        console.log("fljk");
        document.getElementById(i + 1).style.opacity = "0.6";
        document
          .getElementsByClassName("payed-anchor")
          [i].removeAttribute("hidden");
      }
    }
  }
  // function fn() {
  //   console.log("error");
  //   // document.getElementById("pay-button-div").removeAttribute("hidden");
  //   // for (var i = totalDemoVideo; i <= totalVideo; i++) {
  //   //   document.getElementById(i + 1).style.opacity = "0.6";
  //   //   document
  //   //     .getElementsByClassName("payed-anchor")
  //   //     [i].removeAttribute("hidden");
  //   // }
  // }
  var [datas, setDatas] = useState();
  const a = async () => {
    const { data } = await axios.post("/api/course", {
      courseName: props.courseName,
    });
    console.log("fetch course is runnig");
    console.log(data);
    if (datas == null) {
      setDatas(data);
    }
  };
  useEffect(() => {
    //Runs only on the first render
    a();
  });

  if (datas) {
    return (
      <>
        <div className="course-div">
          <section className="play-video-section">
            <div className="play-video-container">
              <div className="main-video-container">
                <h3>{props.courseName}</h3>
                <video
                  id="main-video-div"
                  controls
                  autoplay
                  muted
                  className="main-video"
                >
                  <source
                    className="istSrc"
                    src={datas.istVideoSrc}
                    type="video/mp4"
                  />
                  <source
                    className="secondSrc"
                    src={datas.secondVideoSrc}
                    type="video/mp4"
                  />
                </video>
                <h3 className="main-vid-title">{datas.istVideoTitle}</h3>
              </div>

              <div className="video-list-container">
                {datas.videos.map((video) => (
                  <div onClick={fd} className={video.active}>
                    <video
                      id={video.videoNo}
                      className="list-video"
                      poster={video.posterSrc}
                    >
                      <source
                        className="istSrc"
                        src={video.videoIstSrc}
                        type="video/mp4"
                      />
                      <source
                        className="secondSrc"
                        src={video.videoSecondSrc}
                        type="video/mp4"
                      />
                    </video>
                    <h3 className="list-title">{video.title}</h3>
                    <button
                      className="payed-anchor"
                      type="submit"
                      form="courseNo-pay-form"
                      hidden
                    >
                      payed
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="course-div">
          <section className="play-video-section">
            <div className="play-video-container">
              <div className="main-video-container">
                <video
                  id="main-video-div"
                  controls
                  autoplay
                  muted
                  className="main-video"
                >
                  <source
                    className="istSrc"
                    src="https://files.englishbrain.in/videos/video/{{istVideoSrc}}/MP4/{{istVideoSrc}}.mp4"
                    type="video/mp4"
                  />
                  <source
                    onerror="fn()"
                    className="secondSrc"
                    src="https://files.englishbrain.in/videos/videoF/{{istVideoSrc}}/MP4/{{istVideoSrc}}.mp4"
                    type="video/mp4"
                  />
                </video>
                <h3 className="main-vid-title">videono</h3>
              </div>

              <div className="video-list-container"></div>
            </div>
          </section>
        </div>
      </>
    );
  }
};

export default Course;
