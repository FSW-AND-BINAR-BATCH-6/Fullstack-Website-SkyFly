"use client";

import * as React from "react";
import { Users } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Labels } from "@/components/ui/labels";
import {
  CalendarDaysIcon,
  Ticket,
  TicketPercent,
  TicketSlash,
} from "lucide-react";

import { formSchema } from "./validation";

import InputFrom from "./components/InputFrom";
import InputTo from "./components/InputTo";
import DepartureDate from "./components/DepartureDate";
import ReturnDate from "./components/ReturnDate";
import Passengers from "./components/Passengers";
import SeatClass from "./components/SeatClass";
import { StateFormFindFlights } from "./components/StateFormFindFlights";
import CommandDialogComponents from "./components/CommandDialogComponents";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormData = z.infer<typeof formSchema>;

export default function FormFindFlights() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const {
    openField,
    setOpenField,
    setOpenDepartur,
    setOpenReturn,
    openPassengers,
    setOpenPassengers,
    openSeatClass,
    setOpenSeatClass,
    selectedIndex,
    setSelectedIndex,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    adults,
    setAdults,
    child,
    setChild,
    babies,
    setBabies,
  } = StateFormFindFlights({ setValue, clearErrors });

  const [loading, setLoading] = React.useState(false);

  const [seats, setSeats] = React.useState([
    {
      label: "Economy",
      icon: <Ticket className="w-5 h-5 mr-4" />,
    },
    {
      label: "Business",
      icon: <TicketSlash className="w-5 h-5 mr-4" />,
    },
    {
      label: "First",
      icon: <TicketPercent className="w-5 h-5 mr-4" />,
    },
  ]);

  const handleCommandItemClick = (
    field: keyof FormData,
    value: string
  ) => {
    setValue(field, value);
    if (value) {
      clearErrors(field);
    }
    setOpenField(null);
  };

  const handleItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleSaveSeatClass = () => {
    if (selectedIndex !== null) {
      const selectedSeat = seats[selectedIndex];
      // console.log("Selected Seat:", selectedSeat.label);
      localStorage.setItem("seatClass", selectedSeat.label);
      setValue("seatClass", selectedSeat.label);
      clearErrors("seatClass");
      setOpenSeatClass(false);
    }
  };

  const handleSavePassengers = () => {
    const totalPassengers = adults + child + babies;
    const data = { adults, child, babies };
    setValue("passengers", `${totalPassengers}`);
    clearErrors("passengers");
    localStorage.setItem("bayik", JSON.stringify(data));
    setOpenPassengers(false);
  };

  const onSubmit = (data: FormData) => {
    setLoading(true);
    const passengerDescriptions = [
      `${adults} adults`,
      `${child} children`,
      `${babies} babies`,
    ].filter((desc) => !desc.startsWith("0"));

    const dataWithPassengers = {
      ...data,
      passengerDescriptions,
    };

    const totalPassengers = adults + child + babies;
    const queryParams = {
      totalPassengers: totalPassengers.toString(),
      departureDate: data.departureDate,
      returnDate: data.returnDate || "",
      from: data.from,
      to: data.to,
      seatClass: data.seatClass,
    };

    const filteredQueryParams = Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => value !== "")
    );
    const searchParams = new URLSearchParams(
      filteredQueryParams
    ).toString();
    // console.log("Form Data:", dataWithPassengers);
    toast.success("Find Flights Success!");
    setLoading(false);

    router.push(`/findflights?${searchParams}`);
  };

  return (
    <>
      <form id="form" name="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-4 my-5 sm:mx-10">
          <Labels className="font-bold text-lg">
            Choose special flight schedules on
            <span className="text-violet ml-1">SkyFly!</span>
          </Labels>
        </div>

        <div className="mx-4 sm:mx-10">
          <div className="flex flex-col sm:flex-row">
            <div className="flex w-full sm:w-1/2 justify-center mb-4 sm:mb-0">
              <InputFrom
                register={register}
                errors={errors}
                setOpenField={setOpenField}
                renderCommandDialog={(field: keyof FormData) => (
                  <CommandDialogComponents
                    field={field}
                    openField={openField}
                    setOpenField={setOpenField}
                    handleCommandItemClick={handleCommandItemClick}
                  />
                )}
              />
            </div>

            <div className="flex w-full sm:w-1/2 justify-center">
              <InputTo
                register={register}
                errors={errors}
                setOpenField={setOpenField}
                renderCommandDialog={(field: keyof FormData) => (
                  <CommandDialogComponents
                    field={field}
                    openField={openField}
                    setOpenField={setOpenField}
                    handleCommandItemClick={handleCommandItemClick}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="mx-4 mt-6 mb-6 sm:mx-10 sm:mt-10 sm:mb-10">
          <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col sm:flex-row w-full sm:w-1/2 justify-center mb-4 sm:mb-0">
              <div className="flex items-center justify-center w-full sm:w-auto">
                <CalendarDaysIcon size={24} />
                <Labels className="ml-3">Date</Labels>
              </div>
              <div className="flex flex-col sm:flex-row">
                <DepartureDate
                  register={register}
                  errors={errors}
                  setOpenDepartur={setOpenDepartur}
                  departureDate={departureDate}
                  setDepartureDate={setDepartureDate}
                />
                <ReturnDate
                  register={register}
                  setOpenReturn={setOpenReturn}
                  errors={errors}
                  returnDate={returnDate}
                  setReturnDate={setReturnDate}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:w-1/2 justify-center">
              <div className="flex items-center justify-center w-full sm:w-auto sm:mb-0">
                <Users size={24} />
                <Labels className="ml-3">For</Labels>
              </div>
              <div className="flex flex-col sm:flex-row">
                <Passengers
                  register={register}
                  errors={errors}
                  setOpenPassengers={setOpenPassengers}
                  openPassengers={openPassengers}
                  adults={adults}
                  setAdults={setAdults}
                  child={child}
                  setChild={setChild}
                  babies={babies}
                  setBabies={setBabies}
                  handleSavePassengers={handleSavePassengers}
                />
                <SeatClass
                  register={register}
                  errors={errors}
                  setOpenSeatClass={setOpenSeatClass}
                  seats={seats}
                  selectedIndex={selectedIndex}
                  handleItemClick={handleItemClick}
                  handleSaveSeatClass={handleSaveSeatClass}
                  openSeatClass={openSeatClass}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          id="findFlights"
          name="findFlights"
          type="submit"
          disabled={loading}
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-t-none w-full"
        >
          {loading ? "Loading..." : "Find Flights"}
        </Button>
      </form>
    </>
  );
}
