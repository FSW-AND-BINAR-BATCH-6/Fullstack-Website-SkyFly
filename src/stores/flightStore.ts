"use client";

import { Flight } from "@/app/(home)/components/actions";
import { create } from "zustand";

interface FlightStore {
  data: Flight[];
  currentPage: number;
  itemPerPage: number;
  currentItems: Flight[];
  pages: number[];
  setData: (data: Flight[]) => void;
  setCurrentPage: (page: number) => void;
  setItemPerPage: (items: number) => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
}

const useFlightStore = create<FlightStore>((set, get) => ({
  data: [],
  currentPage: 1,
  itemPerPage: 4,
  setData: (data) => set({ data }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setItemPerPage: (itemPerPage) => set({ itemPerPage }),
  get currentItems() {
    const { data, currentPage, itemPerPage } = get();
    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;
    return data.slice(firstItemIndex, lastItemIndex);
  },
  get pages() {
    const { data, itemPerPage } = get();
    return Array.from(
      { length: Math.ceil(data.length / itemPerPage) },
      (_, i) => i + 1
    );
  },
  handlePreviousPage: () => {
    const { currentPage, setCurrentPage } = get();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  },
  handleNextPage: () => {
    const { currentPage, pages, setCurrentPage } = get();
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  },
}));

export default useFlightStore;
