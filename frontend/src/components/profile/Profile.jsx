import React, { useState } from "react";
import "./profile.css";
import axios from "axios";

const Profile = (props) => {
  console.log(props, "............/////////////");
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
  let [edit, setEdit] = useState(false);

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
          <button className="rst1">your course</button>
        </div>
        <div className="roow rst1">
          <div className="col-md-3 border-right rst1">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5 rst1">
              <img
                id="profile-image"
                className="rounded-circle mt-5 rst1"
                src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              />
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
            <h3 className="rst1">
              name:
              <br />
              {props.profileDetail.name}
            </h3>
            <h3 className="rst1">class:{props.profileDetail.class}</h3>
            <h3 className="rst1">address:{props.profileDetail.address}</h3>
          </div>
        </div>

        {edit && (
          <>
            <div className="col-md-5 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="first name"
                      value=""
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">Surname</label>
                    <input
                      type="text"
                      className="form-control"
                      value=""
                      placeholder="surname"
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter phone number"
                      value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Address Line 1</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 1"
                      value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Address Line 2</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Postcode</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">State</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Area</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter address line 2"
                      value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Email ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter email id"
                      value=""
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels">Education</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="education"
                      value=""
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label className="labels">Country</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="country"
                      value=""
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="labels">State/Region</label>
                    <input
                      type="text"
                      className="form-control"
                      value=""
                      placeholder="state"
                    />
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <button class="btn btn-primary profile-button" type="button">
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
