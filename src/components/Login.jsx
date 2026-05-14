import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something Went Wrong!");
      console.dir(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res.data?.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Something Went Wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center my-10">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl text-center">
          {isLoginForm ? "Login" : "Sign Up"}
        </legend>

        {!isLoginForm && (
          <>
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
          </>
        )}

        <label className="label">Email</label>
        <input
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          type="email"
          className="input"
          placeholder="Email"
        />

        <label className="label">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="input"
          placeholder="Password"
        />
        {error && <p className="text-red-300 mt-2">{error}</p>}
        <button
          onClick={isLoginForm ? handleLogin : handleSignUp}
          className="btn btn-neutral mt-4"
        >
          {isLoginForm ? "Login" : "Sign Up"}
        </button>
        <p
          className="m-auto cursor-pointer my-2"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
