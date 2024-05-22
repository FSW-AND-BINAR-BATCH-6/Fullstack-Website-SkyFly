import * as React from "react";

interface StateFormFindFlightsProps {
  setValue: any;
  clearErrors: any;
}

export const StateFormFindFlights = ({
  setValue,
  clearErrors,
}: StateFormFindFlightsProps) => {
  const [openField, setOpenField] = React.useState<string | null>(
    null
  );
  const [openDepartur, setOpenDepartur] = React.useState(false);
  const [openReturn, setOpenReturn] = React.useState(false);
  const [openPassengers, setOpenPassengers] = React.useState(false);
  const [openSeatClass, setOpenSeatClass] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<
    number | null
  >(null);
  const [departureDate, setDepartureDate] = React.useState<
    Date | undefined
  >(new Date());
  const [returnDate, setReturnDate] = React.useState<
    Date | undefined
  >(undefined);
  const [adults, setAdults] = React.useState(1);
  const [children, setChildren] = React.useState(0);
  const [babies, setBabies] = React.useState(0);

  React.useEffect(() => {
    if (departureDate) {
      const formattedDate = departureDate.toLocaleDateString("en-CA"); // Format YYYY-MM-DD
      setValue("departureDate", formattedDate);
      clearErrors("departureDate");
    }
  }, [departureDate, setValue, clearErrors]);

  React.useEffect(() => {
    if (returnDate) {
      const formattedDate = returnDate.toLocaleDateString("en-CA");
      setValue("returnDate", formattedDate);
      clearErrors("returnDate");
    }
  }, [returnDate, setValue, clearErrors]);

  return {
    openField,
    setOpenField,
    openDepartur,
    setOpenDepartur,
    openReturn,
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
    children,
    setChildren,
    babies,
    setBabies,
  };
};
