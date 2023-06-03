import React, { useEffect, useState } from "react";
import "./RoleUpdate.css";
const RoleUpdate = ({ setDataInput, blurEffect, setBlurEffect }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  //handling the submit onclick event to store the data into the state
  const submitThis = () => {
    const info = { name: name, email: email, role: role };
    setDataInput(info);
    setBlurEffect(!blurEffect);
  };

  //handling function to close the modal to close by updating the state
  const onClose = () => {
    setDataInput({ name: "", email: "", role: "" });
    setBlurEffect(!blurEffect);
  };

  return (
    <div className="Updater">
      <div className="headline">Edit User Information</div>
      <div className="box_label">
        <label htmlFor="name">Name</label>
        <input
          className="input-field"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="box_label">
        <label htmlFor="email">Email</label>
        <input
          className="input-field"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="box_label">
        <label htmlFor="role">Role</label>
        <input
          className="input-field"
          type="text"
          name="role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <button className="UpdateBtn" onClick={submitThis}>
        Update
      </button>
      <button className="Close" onClick={onClose}>
        Close
      </button>
    </div>
  );
};
export default RoleUpdate;
