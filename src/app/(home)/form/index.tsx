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

  const [seats, setSeats] = React.useState([
    {
      label: "Economy",
      price: "IDR 4.950.000",
      icon: <Ticket className="w-5 h-5 mr-4" />,
    },
    {
      label: "Business",
      price: "IDR 29.220.000",
      icon: <TicketSlash className="w-5 h-5 mr-4" />,
    },
    {
      label: "First Class",
      price: "IDR 87.620.000",
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
      setValue("seatClass", selectedSeat.label);
      clearErrors("seatClass");
      setOpenSeatClass(false);
    }
  };

  const handleSavePassengers = () => {
    const totalPassengers = adults + child + babies;
    setValue("passengers", `${totalPassengers} People`);
    clearErrors("passengers");
    setOpenPassengers(false);
  };

  const onSubmit = (data: FormData) => {
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
      seatClass: data.seatClass
      };

    const filteredQueryParams = Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => value !== "")
    );
    const searchParams = new URLSearchParams(filteredQueryParams).toString();
    console.log("Form Data:", dataWithPassengers);

    router.push(`/findflights?${searchParams}`);
  };

  return (
    <>
      <form id="form" name="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-10 my-5">
          <Labels className="font-bold text-lg">
            Choose special flight schedules on
            <span className="text-violet ml-1">Tiketku!</span>
          </Labels>
        </div>

        <div className="mx-10">
          <div className="flex">
            <div className="flex w-1/2 justify-center">
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

            <div className="flex w-1/2 justify-center">
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

        <div className="mx-10 mt-10 mb-10">
          <div className="flex">
            <div className="flex w-1/2 justify-center">
              <div className="flex items-center">
                <CalendarDaysIcon size={24} />
                <Labels className="ml-3">Date</Labels>
              </div>
              <div className="flex">
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

            <div className="flex w-1/2 justify-center">
              <div className="flex items-center">
                <Users size={24} />
                <Labels className="ml-3">For</Labels>
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
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-t-none w-full"
        >
          Find Flights
        </Button>
      </form>
    </>
  );
}
