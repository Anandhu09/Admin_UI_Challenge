import React, { useEffect } from "react";
import "./PaginationButtons.css";

const PaginationButtons = ({
  selectRow,
  handleDeleteSelectRow,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  //handling the number of pagination buttons(excluded forward and backward buttons)
  const getPage = () => {
    const page = [];
    for (let i = 1; i <= totalPages; i++) {
      page.push(i);
    }
    return page;
  };

  //handling function for setting the page
  const handlePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="PaginationButtons material-symbols-outlined">
      <button
        style={{
          fontSize: 20,
          backgroundColor: selectRow.length ? "red" : "",
          color: selectRow.length ? "white" : "",
        }}
        className="btn"
        onClick={() => handleDeleteSelectRow()}
      >
        {`Delete ${selectRow.length ? selectRow.length : ""} ${
          selectRow.length === 1 ? "User" : "Users"
        }`}
      </button>
      <div className="numbers">
        <span>
          <button
            className="material-symbols-outlined navigation-button"
            onClick={() => handlePage(1)}
            disabled={currentPage === 1}
            style={{
              cursor: currentPage === 1 ? "not-allowed" : "",
            }}
          >
            first_page
          </button>
        </span>
        <span>
          <button
            className="material-symbols-outlined navigation-button"
            onClick={() => handlePage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            chevron_left
          </button>
        </span>
        {getPage().map((ele) => (
          <span key={ele}>
            <button
              className="navigation-button page-buttons"
              onClick={() => handlePage(ele)}
              style={{
                backgroundColor: currentPage === ele ? "#0c76a3f7" : "",
                color: currentPage === ele ? "white" : "",
              }}
            >
              {ele}
            </button>
          </span>
        ))}
        <span>
          <button
            className="material-symbols-outlined navigation-button"
            onClick={() => handlePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              cursor: currentPage === totalPages ? "not-allowed" : "",
            }}
          >
            chevron_right
          </button>
        </span>
        <span>
          <button
            style={{
              cursor: currentPage === totalPages ? "not-allowed" : "",
            }}
            className="material-symbols-outlined navigation-button"
            onClick={() => handlePage(totalPages)}
            disabled={totalPages === currentPage}
          >
            last_page
          </button>
        </span>
      </div>
    </div>
  );
};

export default PaginationButtons;
