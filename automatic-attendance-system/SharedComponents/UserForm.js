import React from "react";

const UserForm = () => {
  return (
    <div>
      <form>
        <label>Name</label>
        <input type="text" name="name"></input>
        <label>Reference images:</label>
        <input type="file" id="myFile" name="filename"></input>
        <input type="file" id="myFile2" name="filename"></input>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default UserForm;
