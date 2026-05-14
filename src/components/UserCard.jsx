import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const {_id, firstName, lastName, age, gender, about, photoURL } = user;
  console.log(user);
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="card bg-base-300 w-76 shadow-sm bottom-3 ">
        <figure>
          <img src={photoURL} alt="Photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && <p>Age: {age}</p>}
          {gender && <p>Gender: {gender}</p>}
          <p>About: {about}</p>
          <div className="card-actions justify-between border-t border-gray-600 mt-4 pt-4">
            <button
              className="btn btn-error"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
