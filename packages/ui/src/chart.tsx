"use client";

import * as RechartsPrimitive from "recharts";
import * as React from "react";

import { cn } from "./cn.js";

export type ChartConfig = Record<
  string,
  { label?: React.ReactNode; color?: string; icon?: React.ComponentType }
>;

const ChartContext = React.createContext<ChartConfig | null>(null);

function useChartConfig() {
  const config = React.useContext(ChartContext);
  if (!config) throw new Error("Chart components require ChartContainer");
  return config;
}

export function ChartContainer({
  id,
  className,
  config,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  id?: string;
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}) {
  const generatedId = React.useId().replaceAll(":", "");
  const chartId = `ctx9-chart-${id ?? generatedId}`;
  const variables = Object.entries(config)
    .filter(
      (entry): entry is [string, ChartConfig[string] & { color: string }] =>
        Boolean(entry[1].color),
    )
    .map(
      ([key, item]) =>
        `--color-${key.replaceAll(/[^a-zA-Z0-9_-]/gu, "-")}: ${item.color};`,
    )
    .join(" ");

  return (
    <ChartContext.Provider value={config}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border [&_.recharts-layer]:outline-none [&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        {variables && (
          <style>{`[data-chart="${chartId}"] { ${variables} }`}</style>
        )}
        <RechartsPrimitive.ResponsiveContainer
          initialDimension={{ width: 320, height: 200 }}
        >
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

export const ChartTooltip = RechartsPrimitive.Tooltip;
export const ChartLegend = RechartsPrimitive.Legend;

interface ChartPayloadItem {
  color?: string;
  dataKey?: string | number;
  name?: string | number;
  value?: React.ReactNode;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  hideLabel = false,
}: {
  active?: boolean;
  payload?: readonly ChartPayloadItem[];
  label?: React.ReactNode;
  className?: string;
  hideLabel?: boolean;
}) {
  const config = useChartConfig();
  if (!active || !payload?.length) return null;
  return (
    <div
      className={cn(
        "grid min-w-32 gap-1.5 rounded-md border border-border bg-popover px-2.5 py-2 text-xs shadow-xl",
        className,
      )}
    >
      {!hideLabel && label && <strong className="font-medium">{label}</strong>}
      {payload.map((item, index) => {
        const key = String(item.dataKey ?? item.name ?? "value");
        const itemConfig = config[key];
        return (
          <div
            key={key + "-" + String(index)}
            className="flex items-center gap-2"
          >
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-sm"
              style={{ backgroundColor: item.color ?? itemConfig?.color }}
            />
            <span className="text-muted-foreground">
              {itemConfig?.label ?? item.name ?? key}
            </span>
            <span className="ml-auto font-mono text-foreground">
              {item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function ChartLegendContent({
  payload,
  className,
}: {
  payload?: readonly ChartPayloadItem[];
  className?: string;
}) {
  const config = useChartConfig();
  if (!payload?.length) return null;
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {payload.map((item) => {
        const key = String(item.dataKey ?? item.name ?? "value");
        return (
          <span key={key} className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="size-2 rounded-sm"
              style={{ backgroundColor: item.color ?? config[key]?.color }}
            />
            {config[key]?.label ?? item.name ?? key}
          </span>
        );
      })}
    </div>
  );
}
