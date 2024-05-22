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

interface CommandDialogComponentsProps {
  field: any;
  openField: string | null;
  setOpenField: any;
  handleCommandItemClick: any;
}

const CommandDialogComponents: FC<CommandDialogComponentsProps> = ({
  field,
  openField,
  setOpenField,
  handleCommandItemClick,
}) => {
  return (
    <CommandDialog
      open={openField === field}
      onOpenChange={(isOpen) => setOpenField(isOpen ? field : null)}
    >
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {[
            "Bekasi",
            "Melbourne",
            "Bogor",
            "Jakarta",
            "Kalimantan",
            "Jepang",
          ].map((location) => (
            <CommandItem
              key={location}
              onSelect={() => handleCommandItemClick(field, location)}
            >
              <MapPin className="mr-2 h-4 w-4" />
              <span>{location}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandDialogComponents;
