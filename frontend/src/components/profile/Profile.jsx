import React, { useState } from "react";
import "./profile.css";
import axios from "axios";
import ProfileImage from "./profile-Image/ProfileImage";
import { Link } from "react-router-dom";

const Profile = (props) => {
  let [edit, setEdit] = useState(false);
  let [name, setName] = useState("");
  let [mobileNumber, setMobileNumber] = useState("");
  let [postcode, setPostcode] = useState("");
  let [state, setState] = useState("");
  let [country, setCountry] = useState("");
  let [education, setEducation] = useState("");
  let [address, setAddress] = useState("");

  const submitHandlerUpdate = async (ev) => {
    ev.preventDefault();

    try {
      // setLoading(true);
      const { data } = await axios.post("/api/profileUpdate", {
        userEmail: props.profileDetail.email,
        name: name,
        address: address,
        mobileNumber: mobileNumber,
        education: education,
        country: country,
        education: education,
        state: state,
        postcode: postcode,
      });
      if (data.acknowledged == true) {
        document.getElementById("dashboard-button").click();
      }
      console.log(data);
    } catch (e) {
      console.log(e, "during sending login form ");
    }
  };

  const logoutClick = async () => {
    try {
      const { data } = await axios.get("/api/logout");

      if (data == "success") {
        document.getElementById("login-name-id").innerHTML = "login";
      }
    } catch (e) {
      console.log(e);
    }
  };

  function editProfile() {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  }

  return (
    <>
      <div className="container rounded bg-white mt-5 mb-5 rst1">
        <div className="setting rst1">
          <button onClick={() => logoutClick()}>
            <i className="fa-solid fa-right-from-bracket"></i>logout
          </button>
          <button className="rst1">
            <i className="fa-solid fa-gear rst1"></i>setting
          </button>
          <button className="rst1">payment</button>
          <Link className="" to="/courses">
            your course
          </Link>
        </div>

        <div className="roow rst1">
          <div className="col-md-3 border-right rst1">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5 rst1">
              <img
                id="profile-image"
                className="rounded-circle mt-5 rst1"
                src={props.profileDetail.url}
              />
              {props.profileDetail == "error" && <p>first login please</p>}
              <span id="profile-name" className="font-weight-bold rst1 ">
                {props.profileDetail.name}
              </span>
              <span id="profile-email" className="text-black-50 rst1">
                {props.profileDetail.email}
              </span>

              <button className="rst1" onClick={() => editProfile()}>
                edit profile<i class="fa-regular fa-pen-to-square rst1"></i>
              </button>
            </div>
          </div>
          <div className="detail rst1">
            <h5 className="rst1">name:{props.profileDetail.name}</h5>
            <h5 className="rst1">class:{props.profileDetail.class}</h5>
            <h5 className="rst1">address:{props.profileDetail.address}</h5>
            <h5 className="rst1">state:{props.profileDetail.state}</h5>
            <h5 className="rst1">postcode:{props.profileDetail.postcode}</h5>
            <h5 className="rst1">{props.profileDetail.country}</h5>
          </div>
        </div>

        {edit && (
          <div className=" col-md-5 border-right rst1">
            <div className=" d-flex justify-content-between align-items-center mb-3 rst1">
              <h4 className="text-right rst1">Profile update</h4>
            </div>
            <ProfileImage></ProfileImage>

            <div className=" p-3 py-3 rst1">
              <div className="update-profile row mt-2 rst1">
                <div className="col-md-6 rst1">
                  <label className="labels rst1">Name</label>
                  <input
                    type="text"
                    className="form-control rst1"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="update-profile row mt-3 rst1">
                <div className="col-md-12 rst1">
                  <label className="labels rst1">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control rst1"
                    placeholder="enter phone number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
                <div className="col-md-12 rst1">
                  <label className="labels rst1">Address </label>
                  <input
                    type="text"
                    className="form-control rst1"
                    placeholder="enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="col-md-12 rst1">
                  <label className="labels rst1">Postcode</label>
                  <input
                    type="text"
                    className="form-control rst1"
                    placeholder="postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                  />
                </div>
                <div className="col-md-12 rst1">
                  <label className="labels rst1">State</label>
                  <input
                    type="text"
                    className="form-control rst1"
                    placeholder="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>

                <div className="col-md-12 rst1">
                  <label className="labels rst1">Education</label>
                  <input
                    type="text"
                    className="form-control rst1"
                    placeholder="class"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </div>
              </div>
              <div className="update-profile row mt-3 rst1">
                <div className="col-md-6 rst1">
                  <label className="labels rst1">Country</label>
                  <input
                    type="text"
                    className="form-control rst1"
                    placeholder="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-5 text-center rst1">
                <button
                  className="btn btn-primary profile-button "
                  type="button"
                  onClick={submitHandlerUpdate}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
