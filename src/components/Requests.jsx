import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  console.log(requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No Requests found!</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-5xl">Requests</h1>
      {requests.map((connection) => {
        const { _id, firstName, lastName, photoURL, age, gender, about } =
          connection.fromUserId;
        return (
          <div
            key={_id}
            className="flex items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="rounded-full w-20 h-20"
                src={photoURL}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="btn btn-success">Accept</button>
              <button className="btn btn-error">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
