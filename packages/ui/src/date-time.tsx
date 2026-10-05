"use client";

import { format } from "date-fns";
import * as React from "react";
import {
  DayPicker,
  type DateRange,
  type DayPickerProps,
} from "react-day-picker";

import { cn } from "./cn.js";
import { Input, type InputProps } from "./input.js";
import { Label } from "./label.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select.js";

export type CalendarProps = DayPickerProps;

export function Calendar({
  className,
  ...props
}: CalendarProps): React.JSX.Element {
  return (
    <DayPicker
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col gap-4 sm:flex-row",
        month: "space-y-3",
        month_caption:
          "flex h-9 items-center justify-center text-sm font-medium",
        nav: "absolute inset-x-3 top-3 flex justify-between",
        button_previous:
          "inline-flex size-9 items-center justify-center rounded-md border border-border-strong bg-surface text-foreground hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
        button_next:
          "inline-flex size-9 items-center justify-center rounded-md border border-border-strong bg-surface text-foreground hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
        month_grid: "w-full border-collapse",
        weekdays: "grid grid-cols-7",
        weekday: "py-1 text-center text-xs font-normal text-muted-foreground",
        week: "mt-1 grid grid-cols-7",
        day: "size-9 text-center text-sm",
        day_button:
          "size-9 rounded-md hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus aria-selected:bg-selected aria-selected:text-foreground",
        selected: "bg-selected text-foreground",
        today: "border border-border-strong",
        outside: "text-disabled",
        disabled: "text-disabled line-through",
        range_middle: "rounded-none bg-selected/60",
        range_start: "rounded-r-none bg-selected",
        range_end: "rounded-l-none bg-selected",
      }}
      {...props}
    />
  );
}

export interface TimePickerProps
  extends Omit<InputProps, "type" | "value" | "onChange" | "size"> {
  value?: string;
  onValueChange?: (value: string) => void;
}

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ value, onValueChange, ...props }, ref) => (
    <Input
      ref={ref}
      type="time"
      value={value}
      onChange={(event) => {
        onValueChange?.(event.currentTarget.value);
      }}
      {...props}
    />
  ),
);
TimePicker.displayName = "TimePicker";

export function TimezoneSelect({
  value,
  onValueChange,
  disabled,
  label = "Timezone",
  className,
}: {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}): React.JSX.Element {
  const id = React.useId();
  const zones = React.useMemo(
    () =>
      typeof Intl.supportedValuesOf === "function"
        ? Intl.supportedValuesOf("timeZone")
        : ["UTC"],
    [],
  );
  return (
    <div className={cn("grid gap-1.5", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Select
        value={value}
        onValueChange={onValueChange}
        {...(disabled === undefined ? {} : { disabled })}
      >
        <SelectTrigger id={id}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {zones.map((zone) => (
            <SelectItem key={zone} value={zone}>
              {zone}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function DateTimePicker({
  value,
  onChange,
  timeZone,
  locale,
  min,
  max,
  disabled,
  disabledDates,
  className,
}: {
  value?: Date;
  onChange: (value: Date | undefined) => void;
  timeZone: string;
  locale?: string;
  min?: Date;
  max?: Date;
  disabled?: boolean;
  disabledDates?: readonly Date[];
  className?: string;
}): React.JSX.Element {
  const time = value ? format(value, "HH:mm") : "";
  const formatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone,
      }),
    [locale, timeZone],
  );
  const setDate = (date: Date | undefined) => {
    if (!date) {
      onChange(undefined);
      return;
    }
    const next = new Date(date);
    if (value) next.setHours(value.getHours(), value.getMinutes(), 0, 0);
    onChange(next);
  };
  const setTime = (nextTime: string) => {
    if (!value || !nextTime) return;
    const [hours, minutes] = nextTime.split(":").map(Number);
    if (hours === undefined || minutes === undefined) return;
    const next = new Date(value);
    next.setHours(hours, minutes, 0, 0);
    onChange(next);
  };
  return (
    <div className={cn("grid gap-3", className)}>
      <Calendar
        mode="single"
        {...(value ? { selected: value } : {})}
        onSelect={setDate}
        {...(min ? { startMonth: min } : {})}
        {...(max ? { endMonth: max } : {})}
        disabled={[
          ...(min ? [{ before: min }] : []),
          ...(max ? [{ after: max }] : []),
          ...(disabledDates ?? []),
        ]}
        required={false}
        autoFocus={false}
      />
      <TimePicker
        aria-label="Time"
        value={time}
        onValueChange={setTime}
        disabled={value ? disabled : true}
      />
      {value && (
        <output className="font-mono text-xs text-muted-foreground">
          {formatter.format(value)} · {timeZone}
        </output>
      )}
    </div>
  );
}

export function DateRangePicker({
  value,
  onChange,
  min,
  max,
  disabledDates,
  className,
}: {
  value?: DateRange;
  onChange: (value: DateRange | undefined) => void;
  min?: Date;
  max?: Date;
  disabledDates?: readonly Date[];
  className?: string;
}): React.JSX.Element {
  return (
    <Calendar
      {...(className ? { className } : {})}
      mode="range"
      {...(value ? { selected: value } : {})}
      onSelect={onChange}
      {...(min ? { startMonth: min } : {})}
      {...(max ? { endMonth: max } : {})}
      disabled={[
        ...(min ? [{ before: min }] : []),
        ...(max ? [{ after: max }] : []),
        ...(disabledDates ?? []),
      ]}
      required={false}
    />
  );
}
