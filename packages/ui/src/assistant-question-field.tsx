import type { ReactNode } from "react";

export interface AssistantQuestionFieldProps {
  content: string;
  userInputFromHistory?: string;
  editor?: ReactNode;
}

export function AssistantQuestionField({
  content,
  userInputFromHistory,
  editor,
}: AssistantQuestionFieldProps) {
  const normalizedContent = content.trim();
  const shouldRenderPrompt = normalizedContent.length > 0;

  if (userInputFromHistory !== undefined) {
    return (
      <div
        className="my-0 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-mono-800 dark:bg-mono-900"
        id="question-readonly"
      >
        {shouldRenderPrompt ? (
          <div className="mb-3">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {normalizedContent}
            </p>
          </div>
        ) : null}
        <div className="rounded-md border border-neutral-300 bg-neutral-100 p-3 dark:border-mono-700 dark:bg-mono-800">
          <p className="whitespace-pre-wrap text-sm text-neutral-800 dark:text-neutral-200">
            {userInputFromHistory}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="my-0 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-mono-800 dark:bg-mono-900"
      id="question-editable"
    >
      {shouldRenderPrompt ? (
        <div className="mb-3">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {normalizedContent}
          </p>
        </div>
      ) : null}
      {editor}
    </div>
  );
}
