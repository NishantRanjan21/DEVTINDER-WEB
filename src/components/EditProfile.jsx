import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [emailId, setEmailId] = useState(user.emailId);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [alert, setAlert] = useState(false);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    const res = await axios.patch(
      BASE_URL + "/profile/edit",
      {
        firstName,
        lastName,
        photoURL,
        age,
        gender,
        about,
      },
      { withCredentials: true },
    );
    dispatch(addUser(res.data?.data));
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    },3000);
  };
  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-8 px-4 my-10">
      <div className="flex justify-center items-center my-10">
        <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-2xl text-center">
            Edit Profile
          </legend>

          <label className="label">First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className="input"
            placeholder="First Name"
          />

          <label className="label">Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className="input"
            placeholder="Last Name"
          />

          <label className="label">Email Id</label>
          <input
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            type="email"
            className="input"
            placeholder="Email Id"
          />

          <label className="label">Age</label>
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            min="18"
            max="100"
            className="input"
            placeholder="Age"
          />

          <label className="label">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="select"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <label className="label">About</label>
          <input
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            type="text"
            className="input"
            placeholder="About"
          />

          <label className="label">Profile Picture</label>
          <input
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            type="url"
            className="input"
            placeholder="Profile Photo"
          />
          {/* {error && <p className="text-red-300 mt-2">{error}</p>} */}
          <button className="btn btn-neutral mt-4" onClick={saveProfile}>
            Update
          </button>
        </fieldset>
      </div>
      <div className="my-19 mx-10">
        <UserCard
          user={{ firstName, lastName, age, gender, about, photoURL }}
        />
      </div>
      {alert && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Updated successfully!</span>
        </div>
      </div>}
    </div>
  );
};

export default EditProfile;
