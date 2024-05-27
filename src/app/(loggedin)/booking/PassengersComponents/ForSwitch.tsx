import { Labels } from "@/components/ui/labels";
import { Switch } from "@/components/ui/switch";

export default function ForSwitch() {
  return (
    <div className="py-3">
      <div className="flex flex-row">
        <div>
          <Labels>Have a Family Name?</Labels>
        </div>
        <div className="ml-auto">
          <Switch />
        </div>
      </div>
    </div>
  );
}
