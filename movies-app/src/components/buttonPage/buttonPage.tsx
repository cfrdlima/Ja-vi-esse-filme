import React from "react";
import "./buttonPage.scss";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

type ButtonPageProps = {
  firstPage: () => void;
  currentPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  lastPage: () => void;
  lastPageNumber: number;
};

export default function ButtonPage({
  firstPage,
  currentPage,
  onNextPage,
  onPreviousPage,
  lastPage,
  lastPageNumber,
}: ButtonPageProps) {
  return (
    <>
      <div className="controller-page-container">
        <button
          className="button-arrow-left"
          onClick={firstPage}
          disabled={currentPage === 1}
        >
          <MdOutlineKeyboardDoubleArrowLeft className="arrow-left" />
        </button>
        <button
          className="button-arrow-left"
          onClick={onPreviousPage}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack className="arrow-left" />
        </button>
        <div className="current-page">{currentPage}</div>
        <button
          className="button-arrow-right"
          onClick={onNextPage}
          disabled={currentPage > lastPageNumber}
        >
          <IoIosArrowForward className="arrow-right" />
        </button>
        <button
          className="button-arrow-right"
          onClick={lastPage}
          disabled={currentPage > lastPageNumber}
        >
          <MdOutlineKeyboardDoubleArrowRight className="arrow-right" />
        </button>
      </div>
    </>
  );
}
