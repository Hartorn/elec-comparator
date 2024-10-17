import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { aggregateValues } from "@/data";
import { useState } from "react";

const SLICING = {
  day: undefined,
  month: -3,
  year: -6,
};

export function ConsommationChart({ rawConso, ranges }) {
  const [range, setRange] = useState<string | undefined>("month");
  const consoPerDay = aggregateValues(rawConso, ranges, SLICING[range]);
  const labels = Object.keys(consoPerDay[0]).filter((elt) => elt != "date");
  const chartConfig = labels.reduce(
    (acc, elt, i) => ({
      ...acc,
      [elt]: { label: `${elt} (kW/h)`, color: `hsl(var(--chart-${i + 1}))` },
    }),
    {},
  );

  return (
    <div>
      <Select onValueChange={setRange} defaultValue={range}>
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder="Selectionner l'aggrégation voulue"
            value={range}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="day">Jour</SelectItem>
          <SelectItem value="month">Mois</SelectItem>
          <SelectItem value="year">Année</SelectItem>
        </SelectContent>
      </Select>

      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={consoPerDay}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            // tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />
          {labels.map((elt) => (
            <Bar
              key={elt}
              dataKey={elt}
              // stackId="a"
              // radius={[0, 0, 4, 4]}
              fill={`var(--color-${elt})`}

              // fill="var(--color-desktop)"
            />
          ))}
        </BarChart>
      </ChartContainer>
    </div>
  );
}
