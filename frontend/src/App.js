import "./App.css";
import Header from "./components/common/header/Header";
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import About from "./components/about/About";
import CourseHome from "./components/allcourses/CourseHome";
import Team from "./components/team/Team";
import Pricing from "./components/pricing/Pricing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import Footer from "./components/common/footer/Footer";
import Home from "./components/home/Home";
import { useEffect } from "react";
import axios from "axios";
function App() {
  const fetchApi = async () => {
    const data = await axios.get("/data");
    console.log(data);
  };
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route exact path="courses" element={<CourseHome />} />
          <Route exact path="/team" element={<Team />} />
          <Route exact path="/pricing" element={<Pricing />} />
          <Route exact path="/journal" element={<Blog />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
