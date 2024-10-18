import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HourRangeInput({
  values: [hStart, minStart, hStop, minStop],
  onChange,
}: {
  values: number[];
  onChange: (elt: number[]) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-4 grid-cols-1">
      <div className="flex items-center">
        <Label className="flex-auto pr-4">De</Label>
        <div className="flex items-center">
          <Input
            id="hStart"
            type="number"
            value={hStart}
            onChange={(elt) =>
              onChange([+elt.target.value, minStart, hStop, minStop])
            } //setHStart(elt.target.value)}
            min="0"
            max="23"
          />
          &nbsp;h&nbsp;
          <Input
            id="minStart"
            type="number"
            value={minStart}
            onChange={(elt) =>
              onChange([hStart, +elt.target.value, hStop, minStop])
            } //setMinStart(elt.target.value)}
            min="0"
            max="59"
          />
        </div>
      </div>
      <div className="flex items-center">
        <Label className="flex-auto">À</Label>
        <div className="flex items-center">
          <Input
            className="w-20"
            id="hEnd"
            type="number"
            value={hStop}
            onChange={(elt) =>
              onChange([hStart, minStart, +elt.target.value, minStop])
            } // setHStop(elt.target.value)}
            min="0"
            max="23"
          />
          &nbsp;h&nbsp;
          <Input
            className="w-20"
            id="minEnd"
            type="number"
            value={minStop}
            onChange={(elt) =>
              onChange([hStart, minStart, hStop, +elt.target.value])
            } // setMinStop(elt.target.value)}
            min="0"
            max="59"
          />
        </div>
      </div>
    </div>
  );
}
