"use client";

import type { ButtonHTMLAttributes } from "react";
import { forwardRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ColorSwatch } from "./color-swatch.js";
import { Input } from "./input.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";

const defaultPresets = [
  "#000000",
  "#1A1A1A",
  "#2C2C2C",
  "#363636",
  "#404040",
  "#4A4A4A",
  "#1A1A2E",
  "#2A2A3C",
  "#595959",
  "#737373",
  "#E0E0E0",
  "#FFFFFF",
];

export type ColorPickerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "value"
  | "onChange"
  | "onBlur"
  | "onClick"
  | "children"
  | "color"
  | "rel"
  | "className"
  | "style"
> & {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  presets?: readonly string[];
  insideModal?: boolean;
  layer?: "default" | "raised";
  className?: never;
  style?: never;
};

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    {
      disabled,
      value,
      onChange,
      onBlur,
      name,
      presets = defaultPresets,
      insideModal = false,
      layer = "default",
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const parsedValue = value || "#FFFFFF";

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <ColorSwatch
            {...props}
            variant="trigger"
            layer={layer}
            color={parsedValue}
            name={name}
            onClick={() => {
              setOpen(true);
            }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-full z-50" insideModal={insideModal}>
          <HexColorPicker color={parsedValue} onChange={onChange} />
          <Input
            maxLength={7}
            onChange={(event) => {
              onChange(event.currentTarget.value);
            }}
            ref={ref}
            value={parsedValue}
          />
          <div className="grid grid-cols-6 gap-2 mt-3">
            {presets.map((preset) => (
              <ColorSwatch
                key={preset}
                variant="preset"
                color={preset}
                selected={parsedValue.toUpperCase() === preset.toUpperCase()}
                onClick={() => {
                  onChange(preset);
                }}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);
ColorPicker.displayName = "ColorPicker";
