import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlaneLandingIcon } from "lucide-react";

interface InputToProps {
  register: any;
  errors: any;
  setOpenField: any;
  renderCommandDialog: any;
}

export default function InputTo({
  register,
  errors,
  setOpenField,
  renderCommandDialog,
}: InputToProps) {
  return (
    <>
      <div className="flex pt-1">
        <PlaneLandingIcon size={24} />
        <Label className="ml-3 pt-2">To</Label>
      </div>
      <div>
        <Input
          type="text"
          readOnly
          placeholder="Melbourne (MLB)"
          {...register("to")}
          onClick={() => setOpenField("to")}
          className={`ml-3 ${errors.to ? "border-red-700" : ""}`}
        />
        {errors.to && (
          <p className="text-red-500 text-xs ml-3">
            {errors.to.message}
          </p>
        )}
        {renderCommandDialog("to")}
      </div>
    </>
  );
}
