import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Table from "../Table/Table";
import axios from "axios";
import PaginationButtons from "../PaginationButtons/PaginationButtons";
import RoleUpdate from "../RoleUpdate/RoleUpdate";
import "./HomePage.css";

//This HomePage represents the landing page of the application

function HomePage() {
  let content = "ADMIN UI";
  const [userList, setUserList] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [blurEffect, setBlurEffect] = useState(false);
  const [dataInput, setDataInput] = useState([]);

  // function for getting response from the backend Api
  const ApiCall = async () => {
    try {
      let response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setUserList(response.data);
      return response.data;
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 404 || error.response.status === 403)
      ) {
        setUserList([]);
      }
    }
  };

  //ApiCall function invocation inside ComponentDidMount for initial render
  useEffect(() => {
    ApiCall();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className={blurEffect ? "blurEffect" : ""}>
        <Header content={content} />
        <input
          className="input"
          type="text"
          placeholder="Search by name, email or role"
          onChange={handleSearch}
        />
        <Table
          userList={userList}
          setUserList={setUserList}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          search={search}
          blurEffect={blurEffect}
          setBlurEffect={setBlurEffect}
          dataInput={dataInput}
          setDataInput={setDataInput}
        />
      </div>
      {blurEffect && (
        <RoleUpdate
          setDataInput={setDataInput}
          blurEffect={blurEffect}
          setBlurEffect={setBlurEffect}
        />
      )}
    </>
  );
}

export default HomePage;
