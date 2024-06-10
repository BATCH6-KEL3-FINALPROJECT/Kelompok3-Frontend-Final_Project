import React from "react";
import { motion } from "framer-motion";

const Pagination = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
  handlePageClick,
}) => {
  const renderPrevButton = () => {
    return (
      <button
        onClick={handlePrevPage}
        className="bg-violet-900 hover:bg-violet-700 text-white px-4 py-2 rounded"
        disabled={currentPage === 1}
      >
        Previous
      </button>
    );
  };

  const renderPageButton = (pageNumber) => {
    return (
      <button
        key={pageNumber}
        onClick={() => handlePageClick(pageNumber)}
        className={`px-4 py-2 rounded ${
          pageNumber === currentPage
            ? "bg-violet-900 text-white hover:bg-violet-700"
            : "bg-gray-200 hover:bg-gray-300 text-violet-900"
        }`}
        disabled={pageNumber === "..."}
      >
        {pageNumber}
      </button>
    );
  };

  const renderNextButton = () => {
    return (
      <button
        onClick={handleNextPage}
        className="bg-violet-900 hover:bg-violet-700 text-white px-4 py-2 rounded"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 4;

    let startPage, endPage;
    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage > totalPages - Math.floor(maxVisiblePages / 2)) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxVisiblePages / 2);
      endPage = startPage + maxVisiblePages - 1;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (startPage > 1) {
      if (startPage > 2) {
        pageNumbers.unshift("...");
      }
      pageNumbers.unshift(1);
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 75 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.75,
        delay: 0.25,
        type: "spring",
        stiffness: 200,
      }}
      viewport={{ once: true }}
      className="flex items-center justify-center space-x-2 pt-5"
    >
      {renderPrevButton()}
      {generatePageNumbers().map((pageNumber) => renderPageButton(pageNumber))}
      {renderNextButton()}
    </motion.div>
  );
};

export default Pagination;
