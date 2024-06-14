import { Labels } from "@/components/ui/labels";
import SelectTitle from "./SelectTitle";
import InputFullname from "./InputFullname";
import ForSwitch from "./ForSwitch";
import InputFamilyName from "./InputFamilyName";
import DateOfBirth from "./DateOfBirth";
import Citizenship from "./Citizenship";
import Country from "./Country";
import ValidUntil from "./ValidUntil";

export interface AllPassengersProps {
  register: any;
  departureDate: Date | undefined;
  setDepartureDate: any;
  errors: any;
  setOpenDepartur: any;
}

export default function AllPassengers({
  register,
  departureDate,
  setDepartureDate,
  errors,
  setOpenDepartur,
}: AllPassengersProps) {
  return (
    <>
      <div className="px-5 py-3 borders border-black">
        <SelectTitle />
        <InputFullname />
        <ForSwitch />
        <InputFamilyName />
        <DateOfBirth
          register={register}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          errors={errors}
          setOpenDepartur={setOpenDepartur}
        />
        <Citizenship />
        <Country />
        <ValidUntil
          register={register}
          departureDate={departureDate}
          setDepartureDate={setDepartureDate}
          errors={errors}
          setOpenDepartur={setOpenDepartur}
        />
      </div>
    </>
  );
}
