import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";

type CounterProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function Counter({ value, onChange }: CounterProps) {
  return (
    <div className="flex items-center justify-center w-44">
      <Button
        onClick={() => onChange(value - 1)}
        disabled={value <= 0}
      >
        <Minus className="w-3 h-4 text-white" />
      </Button>
      <Input
        value={value}
        readOnly
        className="w-12 mx-3 text-center"
      />
      <Button
        onClick={() => onChange(value + 1)}
        disabled={value > 9}
      >
        <Plus className="w-3 h-4 text-white" />
      </Button>
    </div>
  );
}
