import { describe, expect, it } from "vitest";
import { checkStyleSource } from "./style-policy.js";

describe("consumer style policy", () => {
  it("checks aliased and namespace controls while accepting variants and placement", () => {
    const violations = checkStyleSource(
      "src/page.tsx",
      `
      import { Button as Action, Checkbox, MultipleSelector } from '@ctx9/ui';
      import * as UI from '@ctx9/ui';
      const bad = 'hover:bg-red-500 px-4';
      const page = <><Action variant="primary" size="sm" className="ml-auto w-full" />
        <Action className={bad} /><Checkbox style={{ color: 'red' }} />
        <UI.SelectTrigger className="dark:text-white" />
        <MultipleSelector size="singleRow" selectionTone="muted" className="max-w-xl" />
        <MultipleSelector className={bad} /></>;
    `,
    );
    expect(violations.map((value) => value.component)).toEqual([
      "Button",
      "Checkbox",
      "SelectTrigger",
      "MultipleSelector",
    ]);
    expect(
      checkStyleSource(
        "src/compound.tsx",
        `import { Button } from '@ctx9/ui'; export const Compound = () => <Button className="px-3" />;`,
        [
          {
            file: "src/compound.tsx",
            component: "Button",
            reason: "control-composition",
            explanation: "Compound control owns its spacing.",
          },
        ],
      ),
    ).toEqual([]);
  });
});
