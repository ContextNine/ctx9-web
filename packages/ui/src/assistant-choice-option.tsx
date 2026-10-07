"use client";

import { cn } from "./cn.js";

export interface AssistantChoiceOptionProps {
  content: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  userInputFromHistory?: string;
}

export function AssistantChoiceOption({
  content,
  value,
  onChange,
  disabled,
  userInputFromHistory,
}: AssistantChoiceOptionProps) {
  if (userInputFromHistory !== undefined) {
    return (
      <div
        className="my-0 rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-mono-800 dark:bg-mono-900"
        id="choice-readonly"
        data-testid="aui-choice-option"
        data-choice-value={userInputFromHistory}
        data-locked="true"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <p className="text-sm text-neutral-800 dark:text-neutral-200">
            {userInputFromHistory}
          </p>
        </div>
      </div>
    );
  }

  const isSelected = value === content;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange?.(content)}
      data-testid="aui-choice-option"
      data-choice-value={content}
      data-locked={disabled ? "true" : "false"}
      className={cn(
        "my-0 w-full rounded-lg border p-3 text-left transition-all",
        disabled && "cursor-not-allowed opacity-60",
        isSelected
          ? "border-primary bg-primary/10 dark:bg-primary/20"
          : "border-neutral-200 bg-white hover:border-primary/50 hover:bg-neutral-50 dark:border-mono-800 dark:bg-mono-900 dark:hover:border-primary/50 dark:hover:bg-mono-800",
      )}
      id="choice-editable"
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            isSelected
              ? "border-primary"
              : "border-neutral-400 dark:border-neutral-600",
          )}
        >
          {isSelected && <div className="h-2 w-2 rounded-full bg-primary" />}
        </div>
        <p className="text-sm text-neutral-800 dark:text-neutral-200">
          {content}
        </p>
      </div>
    </button>
  );
}
