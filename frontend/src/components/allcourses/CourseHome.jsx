import React from "react";
import Back from "../common/back/Back";

import CoursesCard from "./CoursesCard";

import OnlineSliderCourse from "./OnlineSliderCourse";

const CourseHome = () => {
  return (
    <>
      <Back title="Explore Courses" />
      <OnlineSliderCourse />

      <CoursesCard />
    </>
  );
};

export default CourseHome;
