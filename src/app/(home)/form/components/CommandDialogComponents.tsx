import React, { type FC } from "react";
import { MapPin } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { getAirports } from "./actions";

interface CommandDialogComponentsProps {
  field: any;
  openField: string | null;
  setOpenField: any;
  handleCommandItemClick: any;
}

interface Departure {
  name: string;
}

const CommandDialogComponents: FC<CommandDialogComponentsProps> = ({
  field,
  openField,
  setOpenField,
  handleCommandItemClick,
}) => {
  const [cities, setCities] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getAirports();
        console.log(data);
        setCities(data);
      } catch (err) {
        setError("Failed to fetch cities");
      }
    };

    fetchCities();
  }, []);

  return (
    <CommandDialog
      open={openField === field}
      onOpenChange={(isOpen) => setOpenField(isOpen ? field : null)}
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        {error ? (
          <CommandEmpty>{error}</CommandEmpty>
        ) : cities.length === 0 ? (
          <CommandEmpty>No results found.</CommandEmpty>
        ) : (
          <CommandGroup heading="Departures">
            {cities.length > 0 ? (
              cities.map((location) => (
                <CommandItem
                  key={location}
                  onSelect={() =>
                    handleCommandItemClick(field, location)
                  }
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{location}</span>
                </CommandItem>
              ))
            ) : (
              <CommandEmpty>No cities available.</CommandEmpty>
            )}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};

export default CommandDialogComponents;
