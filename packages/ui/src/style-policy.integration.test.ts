import { describe, expect, it } from "vitest";
import { resolve } from "node:path";
import ts from "typescript";
import { checkStyleSource } from "./style-policy.js";

describe("consumer style policy", () => {
  it("checks aliased and namespace controls while accepting variants and placement", () => {
    const violations = checkStyleSource(
      "src/page.tsx",
      `
      import { Button as Action, Checkbox, MultipleSelector } from '@ctx9/ui';
      import * as UI from '@ctx9/ui';
      import { FunkyLoaderButton as PublicAction } from '@impression/public-ui/button';
      import { PriorityPill as Priority } from '@impression/public-ui/priority-pill';
      import * as PublicTooltip from '@impression/public-ui/tooltip';
      import { ThemeToggle } from '@impression/public-ui';
      const bad = 'hover:bg-red-500 px-4';
      const safeProps = { type: 'button', disabled: true };
      const override = { 'className': 'px-4' };
      const page = <><Action variant="primary" size="sm" className="ml-auto w-full" />
        <Action className={bad} /><Checkbox style={{ color: 'red' }} />
        <UI.SelectTrigger className="dark:text-white" />
        <MultipleSelector size="singleRow" selectionTone="muted" className="max-w-xl" />
        <MultipleSelector className={bad} />
        <PublicAction preset="compact" {...safeProps} />
        <PublicAction {...{ ...override }} />
        <PublicAction {...{ ['style']: { color: 'red' } }} />
        <PublicAction {...{ ...unknownProps }} />
        <Priority label="Action" highlighted />
        <Priority label="Action" className={bad} />
        <PublicTooltip.TooltipTrigger className="px-3" />
        <ThemeToggle style={{ background: 'red' }} /></>;
    `,
      { packages: ["@impression/public-ui"] },
    );
    expect(violations.map((value) => value.component)).toEqual([
      "Button",
      "Checkbox",
      "SelectTrigger",
      "MultipleSelector",
      "FunkyLoaderButton",
      "FunkyLoaderButton",
      "FunkyLoaderButton",
      "PriorityPill",
      "TooltipTrigger",
      "ThemeToggle",
    ]);
    expect(
      checkStyleSource(
        "src/compound.tsx",
        `import { Button } from '@ctx9/ui'; export const Compound = () => <Button className="px-3" />;`,
        {
          exceptions: [
            {
              file: "src/compound.tsx",
              component: "Button",
              reason: "control-composition",
              explanation: "Compound control owns its spacing.",
            },
          ],
        },
      ),
    ).toEqual([]);

    const file = resolve("src/typed-consumer.tsx");
    const source = `
      import { Input } from '@ctx9/ui';
      declare const field: { name: string; value: string; onChange: () => void; disabled?: boolean };
      declare const styled: { value: string; className?: string; style?: { color: string } };
      declare const forbidden: { className?: never; style?: never; disabled?: boolean };
      declare const unknownProps: unknown;
      declare const anyProps: any;
      declare const dynamic: Record<string, unknown>;
      declare const mixed: { value: string } | { style: { color: string } };
      const { className, style, ...adapterProps } = styled;
      const page = <><Input {...field} /><Input {...adapterProps} /><Input {...forbidden} />
        <Input {...styled} /><Input {...unknownProps} /><Input {...anyProps} />
        <Input {...dynamic} /><Input {...mixed} />
        <Input {...{ style: undefined }} /></>;
    `;
    const options = { strict: true, jsx: ts.JsxEmit.Preserve, noEmit: true };
    const host = ts.createCompilerHost(options);
    const originalGetSourceFile = host.getSourceFile.bind(host);
    host.getSourceFile = (
      name,
      languageVersion,
      onError,
      shouldCreateNewSourceFile,
    ) =>
      name === file
        ? ts.createSourceFile(
            file,
            source,
            languageVersion,
            true,
            ts.ScriptKind.TSX,
          )
        : originalGetSourceFile(
            name,
            languageVersion,
            onError,
            shouldCreateNewSourceFile,
          );
    const program = ts.createProgram([file], options, host);
    const typedViolations = checkStyleSource(file, source, { program });
    expect(typedViolations.map((value) => value.message)).toEqual([
      "Appearance cannot be supplied through a JSX spread.",
      "Use explicit control props so className and style can be checked.",
      "Use explicit control props so className and style can be checked.",
      "Use explicit control props so className and style can be checked.",
      "Appearance cannot be supplied through a JSX spread.",
      "Appearance cannot be supplied through a JSX spread.",
    ]);
    expect(checkStyleSource(file, source).length).toBe(9);
    expect(checkStyleSource(file, source + "\n", { program }).length).toBe(9);
  });
});
