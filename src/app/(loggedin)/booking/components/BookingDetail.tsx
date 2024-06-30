"use client";

import "../../../globals.css";
import { Labels } from "@/components/ui/labels";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CircleCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useStore } from "@/stores/buttonStore";
import { usePriceStore } from "@/stores/priceStore";
import { Seat, useSeatSelection } from "./useSeatSelection";
import SeatComponent from "./Seats";
import FlightBooking from "./FlightBooking";
import { Switch } from "@/components/ui/switch";

interface PassengerDetailsProps {
  index: number;
  type: "Adult" | "Child" | "Baby";
  passengCheck?: boolean;
  isDisabled?: boolean;
  errors?: { [key: string]: string };
  onChange: (field: string, value: string) => void;
}

interface Passenger {
  type: string;
  seatId: string;
  quantity: number;
  [key: string]: string | number;
}

interface FormData {
  orderer: {
    fullName?: string;
    familyName?: string;
    phoneNumber?: string;
    email?: string;
  };
  passengers: Passenger[];
  selectedSeats: Seat[];
}

const BookingDetail = () => {
  const {
    seats,
    selectedSeats,
    seatLabels,
    flightId,
    passengerCounts,
    availableSeats,
    seatClass,
    bookCheck,
    passengCheck,
    isLoading,
    isDisabled,
    seatLoading,
    setIsLoading,
    setIsDisabled,
    setBookCheck,
    setPassengCheck,
    setSelectedSeats,
    setSeatLabels,
  } = useSeatSelection();

  const setShowButton = useStore((state) => state.setShowButton);
  const totalPrice = usePriceStore((state) => state.totalPrice);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateForm = (
    data: FormData
  ): { [key: string]: string } => {
    const validationErrors: { [key: string]: string } = {};

    if (!data.orderer.fullName) {
      validationErrors["fullName"] = "Full Name is required.";
    }

    if (!data.orderer.phoneNumber) {
      validationErrors["phoneNumber"] = "Phone Number is required.";
    }

    if (!data.orderer.email) {
      validationErrors["email"] = "Email is required.";
    }

    if (data.selectedSeats.length !== totalPassengers) {
      validationErrors[
        "seats"
      ] = `Please select seats for all ${totalPassengers} passengers.`;
    }

    data.passengers.forEach((passenger, index) => {
      if (!passenger.title) {
        validationErrors[
          `title-${index + 1}`
        ] = `Title is required for passenger ${index + 1}.`;
      }

      if (!passenger.fullName) {
        validationErrors[
          `fullName-${index + 1}`
        ] = `FullName is required for passenger ${index + 1}.`;
      }

      if (!passenger.dob) {
        validationErrors[
          `dob-${index + 1}`
        ] = `Date of Birth is required for passenger ${index + 1}.`;
      }

      if (!passenger.citizenship) {
        validationErrors[
          `citizenship-${index + 1}`
        ] = `Citizenship is required for passenger ${index + 1}.`;
      }

      if (!passenger.passport) {
        validationErrors[
          `passport-${index + 1}`
        ] = `ID card / Passport is required for passenger ${
          index + 1
        }.`;
      }

      if (!passenger.issuingCountry) {
        validationErrors[
          `issuingCountry-${index + 1}`
        ] = `Issuing Country is required for passenger ${index + 1}.`;
      }

      if (!passenger.validityPeriod) {
        validationErrors[
          `validityPeriod-${index + 1}`
        ] = `Valid Until is required for passenger ${index + 1}.`;
      }
    });

    return validationErrors;
  };

  const totalPassengers =
    passengerCounts.adults +
    passengerCounts.child +
    passengerCounts.babies;

  const handleSeatChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    seat: Seat
  ) => {
    if (e.target.checked) {
      if (selectedSeats.length < totalPassengers) {
        // const newLabel = `P${selectedSeats.length + 1}`;
        setSelectedSeats([...selectedSeats, seat]);
        // setSeatLabels({ ...seatLabels, [seat.id]: newLabel });
        if (selectedSeats.length + 1 === totalPassengers) {
          setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors["seats"];
            return newErrors;
          });
        }
      } else {
        e.target.checked = false;
        toast.error(
          `You can only select up to ${totalPassengers} seats.`
        );
      }
    } else {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
      const newLabels = { ...seatLabels };
      delete newLabels[seat.id];
      setSeatLabels(newLabels);
    }
  };

  const generateForms = () => {
    const forms = [];
    const { adults, child, babies } = passengerCounts;
    let index = 1;

    for (let i = 0; i < adults; i++) {
      forms.push(
        <PassengerDetails
          key={`adult-${i}`}
          index={index++}
          type="Adult"
          passengCheck={passengCheck}
          isDisabled={isDisabled}
          errors={errors}
          onChange={handleChange}
        />
      );
    }
    for (let i = 0; i < child; i++) {
      forms.push(
        <PassengerDetails
          key={`child-${i}`}
          index={index++}
          type="Child"
          passengCheck={passengCheck}
          isDisabled={isDisabled}
          errors={errors}
          onChange={handleChange}
        />
      );
    }
    for (let i = 0; i < babies; i++) {
      forms.push(
        <PassengerDetails
          key={`baby-${i}`}
          index={index++}
          type="Baby"
          passengCheck={passengCheck}
          isDisabled={isDisabled}
          errors={errors}
          onChange={handleChange}
        />
      );
    }

    return forms;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: FormData = {
      orderer: {},
      passengers: [],
      selectedSeats,
    };

    formData.forEach((value, key) => {
      const match = key.match(/^(\w+)-(\d+)$/);
      if (match) {
        const [, field, indexStr] = match;
        const index = parseInt(indexStr, 10) - 1;
        if (!data.passengers[index]) {
          data.passengers[index] = {
            type: getTypeByIndex(index + 1),
            seatId: selectedSeats[index]?.id.toString() || "",
            quantity: 1,
            price: totalPrice,
          };
        }
        data.passengers[index][field] = value.toString();
      } else if (
        key === "fullName" ||
        key === "familyName" ||
        key === "phoneNumber" ||
        key === "email"
      ) {
        data.orderer[key] = value.toString();
      }
    });

    const validationErrors = validateForm(data);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    // console.log("Form submitted:", data);
    localStorage.setItem("DataUsers", JSON.stringify(data));
    toast.success("Form submitted successfully.");

    setBookCheck(true);
    setPassengCheck(true);
    setIsLoading(false);
    setIsDisabled(true);
    setShowButton(true);
  };

  const getTypeByIndex = (
    index: number
  ): "Adult" | "Child" | "Baby" => {
    const { adults, child } = passengerCounts;
    if (index <= adults) return "Adult";
    if (index <= adults + child) return "Child";
    return "Baby";
  };

  return (
    <div className="w-full lg:w-4/5 mx-auto mt-3 pb-20">
      <div className="flex flex-col md:flex-row items-start">
        <div className="w-full p-3 mb-5">
          <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col p-5 rounded-sm shadow-xl border border-black/20 mb-5">
                <div>
                  <Labels className="font-bold">
                    Booking Details
                  </Labels>
                </div>

                <div className="bg-black flex flex-row items-center rounded-t-xl mt-3 text-white p-3">
                  <Labels className="font-bold">
                    Customer&apos;s Details
                  </Labels>
                  {bookCheck && (
                    <CircleCheck className="w-5 h-5 ml-auto text-white fill-green-700" />
                  )}
                </div>

                <div className="px-5 py-3">
                  <Label className="font-bold" htmlFor="fullName">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Harry"
                    autoComplete="off"
                    disabled={isDisabled}
                    onChange={(e) =>
                      handleChange("fullName", e.target.value)
                    }
                  />
                  {errors["fullName"] && (
                    <p className="error text-xs ps-1 text-red-700">
                      {errors["fullName"]}
                    </p>
                  )}

                  <Label className="font-bold" htmlFor="familyName">
                    Family Name
                  </Label>
                  <Input
                    id="familyName"
                    name="familyName"
                    type="text"
                    placeholder="Potter"
                    autoComplete="off"
                    disabled={isDisabled}
                    onChange={(e) =>
                      handleChange("familyName", e.target.value)
                    }
                  />
                  <Label className="font-bold" htmlFor="phoneNumber">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="number"
                    placeholder="089756420173"
                    autoComplete="off"
                    disabled={isDisabled}
                    onChange={(e) =>
                      handleChange("phoneNumber", e.target.value)
                    }
                  />
                  {errors["phoneNumber"] && (
                    <p className="error text-xs ps-1 text-red-700">
                      {errors["phoneNumber"]}
                    </p>
                  )}
                  <Label className="font-bold" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Johndoe@gmail.com"
                    autoComplete="off"
                    disabled={isDisabled}
                    onChange={(e) =>
                      handleChange("email", e.target.value)
                    }
                  />
                  {errors["email"] && (
                    <p className="error text-xs ps-1 text-red-700">
                      {errors["email"]}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col p-5 rounded-sm shadow-xl border border-black/20 mb-5">
                <Labels className="font-bold">
                  Passenger Details
                </Labels>
                {generateForms().map((form, index) => (
                  <div key={index} className="passenger-section">
                    <div>{form}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col p-5 rounded-sm shadow-xl border border-black/20 mb-5">
                <Labels className="font-bold">Choose a Seat</Labels>
                <div className="bg-green-700 flex justify-center items-center rounded-sm mt-3 text-white p-3">
                  <Labels className="font-bold">
                    {seatClass} - {availableSeats.length} Seats
                    Available
                  </Labels>
                </div>
                {errors["seats"] && (
                  <p className="error flex justify-center text-xs ps-1 text-red-700">
                    {errors["seats"]}
                  </p>
                )}
                <SeatComponent
                  seats={seats}
                  selectedSeats={selectedSeats}
                  seatLabels={seatLabels}
                  handleSeatChange={handleSeatChange}
                  isDisabled={isDisabled}
                  seatLoading={seatLoading}
                />
              </div>

              <Button
                className="w-full disabled:cursor-not-allowed"
                disabled={isDisabled || isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </form>
          </div>
        </div>
        <FlightBooking flightId={flightId} />
      </div>
    </div>
  );
};

const PassengerDetails: React.FC<PassengerDetailsProps> = ({
  index,
  type,
  passengCheck,
  isDisabled,
  errors,
  onChange,
}) => (
  <div className="">
    <div className="bg-black flex flex-row items-center rounded-t-xl mt-3 text-white p-3">
      <Labels className="font-bold">
        Passenger&apos;s Details {index} - {type}
      </Labels>
      {passengCheck && (
        <CircleCheck className="w-5 h-5 ml-auto text-white fill-green-700" />
      )}
    </div>
    <div className="px-5 py-3">
      <Label htmlFor={`title-${index}`} className="font-bold">
        Title:
      </Label>
      <Input
        type="text"
        name={`title-${index}`}
        placeholder="Mr."
        autoComplete="off"
        disabled={isDisabled}
        onChange={(e) => onChange(`title-${index}`, e.target.value)}
      />
      {errors && errors[`title-${index}`] && (
        <p className="error text-xs ps-1 text-red-700">
          {errors[`title-${index}`]}
        </p>
      )}
      <Label htmlFor={`fullName-${index}`} className="font-bold">
        Full Name:
      </Label>
      <Input
        type="text"
        name={`fullName-${index}`}
        placeholder="Harry"
        autoComplete="off"
        disabled={isDisabled}
        onChange={(e) =>
          onChange(`fullName-${index}`, e.target.value)
        }
      />
      {errors && errors[`fullName-${index}`] && (
        <p className="error text-xs ps-1 text-red-700">
          {errors[`fullName-${index}`]}
        </p>
      )}
      <Label htmlFor={`familyName-${index}`} className="font-bold">
        Family Name:
      </Label>
      <Input
        type="text"
        name={`familyName-${index}`}
        placeholder="Potter"
        autoComplete="off"
        disabled={isDisabled}
      />
      <Label htmlFor={`dob-${index}`} className="font-bold">
        Date of Birth:
      </Label>
      <Input
        type="date"
        name={`dob-${index}`}
        placeholder="dd/mm/yyyy"
        autoComplete="off"
        className="block w-full cursor-pointer"
        disabled={isDisabled}
        onChange={(e) => onChange(`dob-${index}`, e.target.value)}
      />
      {errors && errors[`dob-${index}`] && (
        <p className="error text-xs ps-1 text-red-700">
          {errors[`dob-${index}`]}
        </p>
      )}
      <Label htmlFor={`citizenship-${index}`} className="font-bold">
        Citizenship
      </Label>
      <Input
        type="text"
        name={`citizenship-${index}`}
        placeholder="Indonesia"
        autoComplete="off"
        disabled={isDisabled}
        onChange={(e) =>
          onChange(`citizenship-${index}`, e.target.value)
        }
      />
      {errors && errors[`citizenship-${index}`] && (
        <p className="error text-xs ps-1 text-red-700">
          {errors[`citizenship-${index}`]}
        </p>
      )}
      <Label htmlFor={`passport-${index}`} className="font-bold">
        ID card / Passport
      </Label>
      <Input
        type="text"
        name={`passport-${index}`}
        placeholder="A 1234567"
        autoComplete="off"
        disabled={isDisabled}
        onChange={(e) =>
          onChange(`passport-${index}`, e.target.value)
        }
      />
      {errors && errors[`passport-${index}`] && (
        <p className="error text-xs ps-1 text-red-700">
          {errors[`passport-${index}`]}
        </p>
      )}
      <Label
        htmlFor={`issuingCountry-${index}`}
        className="font-bold"
      >
        Issuing Country
      </Label>
      <Input
        type="text"
        name={`issuingCountry-${index}`}
        placeholder="Indonesia"
        autoComplete="off"
        disabled={isDisabled}
        onChange={(e) =>
          onChange(`issuingCountry-${index}`, e.target.value)
        }
      />
      {errors && errors[`issuingCountry-${index}`] && (
        <p className="error text-xs ps-1 text-red-700">
          {errors[`issuingCountry-${index}`]}
        </p>
      )}
      <Label
        htmlFor={`validityPeriod-${index}`}
        className="font-bold"
      >
        Valid Until
      </Label>
      <Input
        type="date"
        name={`validityPeriod-${index}`}
        placeholder="dd/mm/yyyy"
        autoComplete="off"
        className="block w-full cursor-pointer"
        disabled={isDisabled}
        onChange={(e) =>
          onChange(`validityPeriod-${index}`, e.target.value)
        }
      />
      {errors && errors[`validityPeriod-${index}`] && (
        <p className="error text-xs ps-1 text-red-700">
          {errors[`validityPeriod-${index}`]}
        </p>
      )}
    </div>
  </div>
);

export default BookingDetail;
