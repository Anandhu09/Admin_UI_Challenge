import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeTwoToneIcon from "@mui/icons-material/ModeTwoTone";
import SentimentDissatisfiedSharpIcon from "@mui/icons-material/SentimentDissatisfiedSharp";
import PaginationButtons from "../PaginationButtons/PaginationButtons";
import "./Table.css";

function Table({
  userList,
  setUserList,
  currentPage,
  setCurrentPage,
  search,
  blurEffect,
  setBlurEffect,
  dataInput,
  setDataInput,
}) {
  const [displayArray, setDisplayArray] = useState([]);
  const [selectRow, setSelectRow] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [Id, setId] = useState("");
  const listsPerPage = 10;

  const lastItemIndex = currentPage * listsPerPage;
  const firstItemIndex = lastItemIndex - listsPerPage;

  //handling display list using componentDidUpdate
  useEffect(() => {
    setTotalPages(Math.ceil(userList.length / listsPerPage));
    setDisplayArray(userList.slice(firstItemIndex, lastItemIndex));
  }, [userList, currentPage]);

  //handling search using componentDidUpdate
  useEffect(() => {
    const paginatedData = userList.slice(
      (currentPage - 1) * listsPerPage,
      userList.length - 1
    );
    const filteredData = paginatedData.filter((ele) => {
      const objectValues = Object.values(ele);
      return objectValues.some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      );
    });

    if (filteredData) {
      setDisplayArray(filteredData.slice(firstItemIndex, lastItemIndex));
    }
    setTotalPages(Math.ceil(filteredData.length / listsPerPage));

    if (!search) {
      setDisplayArray(userList.slice(firstItemIndex, lastItemIndex));
    }
  }, [search]);

  //handles delete single row
  const handleDelete = (obj) => {
    let confirm = window.confirm(
      `Do you want to delete the user ${obj.name} from the list ?`
    );
    if (confirm)
      setDisplayArray((prevData) =>
        prevData.filter((ele) => ele.id !== obj.id)
      );
  };

  //handling select all users
  const handleAllSelect = (e) => {
    if (e.target.className === "Dasappan") {
      setSelectRow([]);
      if (e.target.checked) {
        setSelectRow(displayArray.map((item) => item.id));
      }
    } else {
      if (e.target.checked) {
        if (!selectRow.includes(e.target.id)) {
          setSelectRow([...selectRow, e.target.id]);
        }
      } else {
        if (selectRow.includes(e.target.id)) {
          let filterUsers = selectRow.filter((item) => item !== e.target.id);
          setSelectRow(filterUsers);
        }
      }
    }
  };

  //handles selected items individually
  const handleRow = (id) => {
    if (selectRow.includes(id)) {
      setSelectRow(selectRow.filter((ele) => ele !== id));
    } else {
      setSelectRow([...selectRow, id]);
    }
  };

  //handles delete selected Rows
  const handleDeleteSelectRow = () => {
    if (!selectRow.length) {
      alert("Select the users that you want to delete");
    }

    if (selectRow.length) {
      var DeleteConfirm = window.confirm(
        `Do you want to delete ${selectRow.length ? selectRow.length : ""} ${
          selectRow.length == 1 ? "User ?" : "Users ?"
        }`
      );
    }
    if (DeleteConfirm) {
      setUserList(userList.filter((ele) => !selectRow.includes(ele.id)));
      setSelectRow([]);
    }
  };

  //handling popup modal for update the user data
  const handlePopup = (id) => {
    setBlurEffect(!blurEffect);
    setId(id);
  };

  //compoenentDidUpdate for the updating the data of the particular user along with validation of input data is empty or not
  useEffect(() => {
    displayArray.map((ele) => {
      if (ele.id == Id) {
        if (dataInput.email || dataInput.name || dataInput.role) {
          if (dataInput.email) {
            ele.email = dataInput.email;
          }
          if (dataInput.name) {
            ele.name = dataInput.name;
          }
          if (dataInput.role) {
            ele.role = dataInput.role;
          }
        }
      }
    });
    setDataInput({ name: "", email: "", role: "" });
  }, [blurEffect]);

  return (
    <>
      <div className="Table_list">
        {displayArray.length > 0 ? (
          <div key={displayArray.id}>
            <table>
              <thead>
                <tr className="tr_head">
                  <th>
                    <input
                      className="Dasappan"
                      type="checkbox"
                      style={{
                        cursor: "pointer",
                      }}
                      onChange={handleAllSelect}
                      checked={selectRow.length == displayArray.length}
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayArray.map((ele) => (
                  <tr
                    key={ele.id}
                    id={ele.id}
                    style={{
                      backgroundColor: selectRow.includes(ele.id) ? "#ccc" : "",
                    }}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={selectRow.includes(ele.id)}
                        style={{
                          cursor: "pointer",
                        }}
                        onChange={() => handleRow(ele.id)}
                      />
                    </td>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.role}</td>
                    <td>
                      <div className="action-buttons">
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => handlePopup(ele.id)}
                        >
                          <ModeTwoToneIcon />
                        </IconButton>

                        <IconButton aria-label="delete" size="small">
                          <DeleteIcon
                            fontSize="small"
                            onClick={() => {
                              handleDelete(ele);
                            }}
                          />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="not_found">
            {/* <IconButton aria-label="delete" size="small"> */}
            <SentimentDissatisfiedSharpIcon />
            No User Found
            {/* </IconButton> */}
          </div>
        )}
      </div>
      <PaginationButtons
        selectRow={selectRow}
        handleDeleteSelectRow={handleDeleteSelectRow}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default Table;
