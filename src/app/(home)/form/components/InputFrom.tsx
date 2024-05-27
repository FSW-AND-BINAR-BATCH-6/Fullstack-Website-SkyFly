import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlaneTakeoffIcon } from "lucide-react";

interface InputFromProps {
  register: any;
  errors: any;
  setOpenField: any;
  renderCommandDialog: any;
}

export default function InputFrom({
  register,
  errors,
  setOpenField,
  renderCommandDialog,
}: InputFromProps) {
  return (
    <>
      <div className="flex pt-1">
        <PlaneTakeoffIcon size={24} />
        <Label htmlFor="from" className="ml-3 pt-2">
          From
        </Label>
      </div>
      <div>
        <Input
          id="from"
          name="from"
          type="text"
          readOnly
          placeholder="Jakarta (JKTA)"
          {...register("from")}
          onClick={() => setOpenField("from")}
          className={`ml-3 ${errors.from ? "border-red-700" : ""}`}
        />
        {errors.from && (
          <p className="text-red-500 text-xs ml-3">
            {errors.from.message}
          </p>
        )}
        {renderCommandDialog("from")}
      </div>
    </>
  );
}
