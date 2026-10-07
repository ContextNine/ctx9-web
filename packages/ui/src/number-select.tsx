"use client";
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./cn.js";
import { Input } from "./input.js";
import { Button } from "./button.js";
import { sidebarTextStyles } from "./impression-recipes.js";

export interface NumberSelectProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  className?: never;
  style?: never;
  disabled?: boolean;
}

const NumberSelect = React.forwardRef<HTMLDivElement, NumberSelectProps>(
  ({ value, onChange, min, max, disabled = false }, ref) => {
    const [inputValue, setInputValue] = React.useState(value.toString());
    const [isDragging, setIsDragging] = React.useState(false);
    const [startX, setStartX] = React.useState(0);
    const [startValue, setStartValue] = React.useState(value);

    // Update input value when prop value changes
    React.useEffect(() => {
      setInputValue(value.toString());
    }, [value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      const numValue = parseInt(newValue, 10);
      if (!isNaN(numValue) && numValue >= min && numValue <= max) {
        onChange(numValue);
      }
    };

    const handleInputBlur = () => {
      const numValue = parseInt(inputValue, 10);
      if (isNaN(numValue) || numValue < min || numValue > max) {
        setInputValue(value.toString());
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        const newValue = Math.max(min, value - 1);
        onChange(newValue);
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        const newValue = Math.min(max, value + 1);
        onChange(newValue);
      }
    };

    const handlePrevious = () => {
      if (value > min) {
        onChange(value - 1);
      }
    };

    const handleNext = () => {
      if (value < max) {
        onChange(value + 1);
      }
    };

    // Touch/mouse drag handlers for swipe functionality
    const handleMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      setIsDragging(true);
      setStartX(e.clientX);
      setStartValue(value);
      e.preventDefault();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
      if (disabled || !e.touches[0]) return;
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setStartValue(value);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging || disabled) return;
      const deltaX = e.clientX - startX;
      const sensitivity = 50; // pixels per step
      const steps = Math.floor(deltaX / sensitivity);
      const newValue = Math.max(min, Math.min(max, startValue + steps));
      if (newValue !== value) {
        onChange(newValue);
      }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDragging || disabled || !e.touches[0]) return;
      const deltaX = e.touches[0].clientX - startX;
      const sensitivity = 50;
      const steps = Math.floor(deltaX / sensitivity);
      const newValue = Math.max(min, Math.min(max, startValue + steps));
      if (newValue !== value) {
        onChange(newValue);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    // Add global event listeners for mouse/touch events
    React.useEffect(() => {
      if (isDragging) {
        const handleGlobalMouseMove = (e: MouseEvent) => {
          const deltaX = e.clientX - startX;
          const sensitivity = 50;
          const steps = Math.floor(deltaX / sensitivity);
          const newValue = Math.max(min, Math.min(max, startValue + steps));
          if (newValue !== value) {
            onChange(newValue);
          }
        };

        const handleGlobalTouchMove = (e: TouchEvent) => {
          if (!e.touches[0]) return;
          const deltaX = e.touches[0].clientX - startX;
          const sensitivity = 50;
          const steps = Math.floor(deltaX / sensitivity);
          const newValue = Math.max(min, Math.min(max, startValue + steps));
          if (newValue !== value) {
            onChange(newValue);
          }
        };

        const handleGlobalMouseUp = () => {
          setIsDragging(false);
        };
        const handleGlobalTouchEnd = () => {
          setIsDragging(false);
        };

        document.addEventListener("mousemove", handleGlobalMouseMove);
        document.addEventListener("mouseup", handleGlobalMouseUp);
        document.addEventListener("touchmove", handleGlobalTouchMove);
        document.addEventListener("touchend", handleGlobalTouchEnd);

        return () => {
          document.removeEventListener("mousemove", handleGlobalMouseMove);
          document.removeEventListener("mouseup", handleGlobalMouseUp);
          document.removeEventListener("touchmove", handleGlobalTouchMove);
          document.removeEventListener("touchend", handleGlobalTouchEnd);
        };
      }
    }, [isDragging, startX, startValue, value, onChange, min, max]);

    const prevValue = value > min ? value - 1 : null;
    const nextValue = value < max ? value + 1 : null;

    return (
      <div
        ref={ref}
        className="relative flex items-center"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous value preview */}
        <div className="flex items-center">
          <Button
            variant="navigation"
            size="icon"
            preset="numberStepper"
            onClick={handlePrevious}
            disabled={disabled || value <= min}
          >
            <ChevronLeft className={cn("h-4 w-4", sidebarTextStyles)} />
          </Button>
          <span
            className={cn(
              "text-sm text-mono-300 dark:text-mono-700 mx-1 min-w-[1rem] text-center",
              prevValue === null && "invisible",
            )}
          >
            {prevValue}
          </span>
        </div>

        {/* Main input */}
        <div className="relative">
          <Input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            min={min}
            max={max}
            disabled={disabled}
            variant="number"
            size="sm"
            interaction={isDragging ? "dragging" : "default"}
          />
        </div>

        {/* Next value preview */}
        <div className="flex items-center">
          <span
            className={cn(
              "text-sm text-mono-300 dark:text-mono-700 mx-1 min-w-[1rem] text-center",
              nextValue === null && "invisible",
            )}
          >
            {nextValue}
          </span>
          <Button
            variant="navigation"
            size="icon"
            preset="numberStepper"
            onClick={handleNext}
            disabled={disabled || value >= max}
          >
            <ChevronRight className={cn("h-4 w-4", sidebarTextStyles)} />
          </Button>
        </div>
      </div>
    );
  },
);

NumberSelect.displayName = "NumberSelect";

export { NumberSelect };
