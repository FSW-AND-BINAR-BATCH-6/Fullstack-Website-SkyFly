import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectTitle() {
  return (
    <>
      <div>
        <Label className="font-bold">Title</Label>
      </div>

      <div>
        <Select>
          <SelectTrigger className="my-1">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* {errors.from && ( */}
        <p className="text-red-500 text-xs ml-1">
          {/* {errors.from.message} */}
          Title is required
        </p>
        {/* )} */}
      </div>
    </>
  );
}
