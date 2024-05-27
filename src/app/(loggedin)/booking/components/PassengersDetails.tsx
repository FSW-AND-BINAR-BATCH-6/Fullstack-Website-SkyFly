"use client";

import * as React from "react";

import { Labels } from "@/components/ui/labels";
import { useForm } from "react-hook-form";
import AllPassengers from "../PassengersComponents/AllPassengers";

export default function PassengersDetails() {
  const [openDepartur, setOpenDepartur] = React.useState(false);
  const [departureDate, setDepartureDate] = React.useState<
    Date | undefined
  >(new Date());

  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    if (departureDate) {
      const formattedDate = departureDate.toLocaleDateString("en-CA"); // Format YYYY-MM-DD
      setValue("departureDate", formattedDate);
      clearErrors("departureDate");
    }
  }, [departureDate, setValue, clearErrors]);

  const [user, setUser] = React.useState<any>([1, 2, 3]);

  return (
    <>
      <div>
        <Labels className="font-bold">Passenger's Details</Labels>
      </div>

      {/* {user.map((users: any, index: number) => ( */}
      <AllPassengers
        // key={index}
        // index={index}
        register={register}
        departureDate={departureDate}
        setDepartureDate={setDepartureDate}
        errors={errors}
        setOpenDepartur={setOpenDepartur}
      />
      {/* ))} */}
    </>
  );
}
