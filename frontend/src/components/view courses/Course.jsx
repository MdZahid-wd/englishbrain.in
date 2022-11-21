import React from "react";
import axios from "axios";
import "./course.css";
import { useState } from "react";
import { useEffect } from "react";

const Course = () => {
  var [datas, setDatas] = useState();
  const a = async () => {
    const { data } = await axios.post("/api/course", { course: 1 });
    console.log("fetch course is runnig");
    console.log(data);
    if (datas == null) {
      setDatas(data);
    }
  };
  useEffect(() => {
    //Runs only on the first render
    a();
  }, []);
  if (datas) {
    let videoList = document.querySelectorAll(".video-list-container .list");
    videoList.forEach((vid) => {
      vid.onclick = () => {
        videoList.forEach((remove) => {
          remove.classList.remove("active");
        });
        vid.classList.add("active");
        let src1 = vid.querySelector(".list-video .istSrc").src;
        let src2 = vid.querySelector(".list-video .secondSrc").src;

        let title = vid.querySelector(".list-title").innerHTML;
        document.querySelector(
          ".main-video-container .main-video .istSrc"
        ).src = src1;
        document.querySelector(
          ".main-video-container .main-video .secondSrc"
        ).src = src2;
        document.querySelector(".main-video-container .main-video").load();
        document.querySelector(
          ".main-video-container .main-vid-title"
        ).innerHTML = title;
      };
    });

    function fn() {
      console.log("error");
      document.getElementById("pay-button-div").removeAttribute("hidden");
      for (var i = datas.totalDemoVideo; i <= datas.totalVideo; i++) {
        document.getElementById(i + 1).style.opacity = "0.6";
        document
          .getElementsByClassName("payed-anchor")
          [i].removeAttribute("hidden");
      }
    }
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
                    src={datas.istVideoSrc}
                    type="video/mp4"
                  />
                  <source
                    onerror={() => fn()}
                    className="secondSrc"
                    src={datas.istVideoSrc}
                    type="video/mp4"
                  />
                </video>
                <h3 className="main-vid-title">{datas.istVideoTitle}</h3>
              </div>

              <div className="video-list-container">
                {datas.videos.map((video) => (
                  <div className="list {{active}}">
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
