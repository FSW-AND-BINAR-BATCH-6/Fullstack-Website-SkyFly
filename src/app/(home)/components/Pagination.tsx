"use client";

import React, { FC } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  handleNextPage: () => void;
  handlePreviousPage: () => void;
  pages: number[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Paginations: FC<PaginationProps> = ({
  handleNextPage,
  handlePreviousPage,
  pages,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <Pagination className="flex justify-center mt-10 w-full">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() => handlePreviousPage()}
          />
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem
            key={index}
            className={`cursor-pointer ${
              currentPage === page ? "bg-neutral-100 rounded-md" : ""
            }`}
          >
            <PaginationLink onClick={() => setCurrentPage(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() => handleNextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
