import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, about, photoURL } = user;
  console.log(user);
  return (
    <div>
      <div className="card bg-base-300 w-76 shadow-sm bottom-3 ">
        <figure>
          <img src={photoURL} alt="Photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && <p>age: {age}</p>}
          {gender && <p>gender: {gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-between border-t border-gray-600 mt-4 pt-4">
            <button className="btn btn-error">Ignore</button>
            <button className="btn btn-success">Send Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
