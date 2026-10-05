import ts from "typescript";

/** Appearance belongs to component variants; consumers may supply placement. */
export const standardizedComponents = new Set([
  "Button",
  "ButtonGroup",
  "Checkbox",
  "MultipleSelector",
  "Switch",
  "Input",
  "Textarea",
  "Label",
  "SelectTrigger",
  "SelectContent",
  "SelectItem",
  "SelectLabel",
  "DropdownMenuContent",
  "DropdownMenuItem",
  "DropdownMenuCheckboxItem",
  "DropdownMenuRadioItem",
  "DropdownMenuLabel",
  "DropdownMenuSubContent",
  "DropdownMenuSubTrigger",
  "ContextMenuContent",
  "ContextMenuItem",
  "ContextMenuCheckboxItem",
  "ContextMenuRadioItem",
  "ContextMenuLabel",
  "ContextMenuSubContent",
  "ContextMenuSubTrigger",
  "DialogContent",
  "DialogHeader",
  "DialogFooter",
  "DialogTitle",
  "DialogDescription",
  "AlertDialogContent",
  "AlertDialogAction",
  "AlertDialogCancel",
  "PopoverContent",
  "TooltipContent",
  "Card",
  "CardHeader",
  "CardContent",
  "CardFooter",
  "CardTitle",
  "CardDescription",
  "FormItem",
  "FormLabel",
  "FormDescription",
  "FormMessage",
  "FormSection",
  "FormRow",
  "FormDisclosure",
  "FormExampleAction",
  "FormActions",
  "TabsList",
  "TabsTrigger",
  "TabsContent",
  "Badge",
  "Alert",
  "AlertTitle",
  "AlertDescription",
  "Toggle",
  "ToggleGroupItem",
  "TableHead",
  "TableCell",
  "TableRow",
  "SheetContent",
  "CommandItem",
]);

export type StyleExceptionReason =
  | "framework-adapter"
  | "control-composition"
  | "feature-geometry";
export interface StyleException {
  file: string;
  component: string;
  reason: StyleExceptionReason;
  explanation: string;
}
export interface StyleViolation {
  file: string;
  line: number;
  component: string;
  message: string;
}

// Placement, display and outer geometry are allowed. Text alignment is appearance.
const appearanceClass =
  /^(?:!?)(?:bg-|text-|font-|leading-|tracking-|p[xytrblse]?-|border(?:-|$)|rounded(?:-|$)|shadow(?:-|$)|ring(?:-|$)|outline(?:-|$)|fill-|stroke-|decoration-|underline$|uppercase$|capitalize$|normal-case$|opacity-|h-|min-h-|max-h-|size-)/u;
const appearanceProperty =
  /^(?:color|background.*|border.*|padding.*|font.*|lineHeight|letterSpacing|text.*|boxShadow|outline.*|opacity|height|minHeight|maxHeight)$/u;

function utilityName(token: string) {
  let depth = 0;
  let start = 0;
  for (let index = 0; index < token.length; index++) {
    if (token[index] === "[") depth++;
    if (token[index] === "]") depth--;
    if (token[index] === ":" && depth === 0) start = index + 1;
  }
  return token.slice(start);
}

/** Inspect a consumer file, including import aliases and local class constants. */
export function checkStyleSource(
  file: string,
  source: string,
  exceptions: readonly StyleException[] = [],
) {
  const tree = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const aliases = new Map<string, string>();
  const namespaces = new Set<string>();
  const constants = new Map<string, ts.Expression>();
  const violations: StyleViolation[] = [];

  function collect(node: ts.Node) {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const module = node.moduleSpecifier.text;
      if (module === "@ctx9/ui" || module.startsWith("@ctx9/ui/")) {
        const bindings = node.importClause?.namedBindings;
        if (bindings && ts.isNamedImports(bindings)) {
          for (const element of bindings.elements) {
            aliases.set(
              element.name.text,
              (element.propertyName ?? element.name).text,
            );
          }
        } else if (bindings && ts.isNamespaceImport(bindings))
          namespaces.add(bindings.name.text);
      }
    }
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer
    ) {
      constants.set(node.name.text, node.initializer);
    }
    ts.forEachChild(node, collect);
  }
  collect(tree);

  function classStrings(
    node: ts.Node,
    seen = new Set<string>(),
  ): string[] | undefined {
    if (ts.isStringLiteralLike(node)) return [node.text];
    if (
      node.kind === ts.SyntaxKind.NullKeyword ||
      node.kind === ts.SyntaxKind.FalseKeyword ||
      node.kind === ts.SyntaxKind.TrueKeyword
    )
      return [];
    if (ts.isParenthesizedExpression(node))
      return classStrings(node.expression, seen);
    if (ts.isIdentifier(node)) {
      if (node.text === "undefined") return [];
      if (seen.has(node.text)) return undefined;
      const value = constants.get(node.text);
      return value
        ? classStrings(value, new Set([...seen, node.text]))
        : undefined;
    }
    if (ts.isConditionalExpression(node)) {
      const left = classStrings(node.whenTrue, seen);
      const right = classStrings(node.whenFalse, seen);
      return left && right ? [...left, ...right] : undefined;
    }
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
    )
      return classStrings(node.right, seen);
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      ["cn", "clsx", "twMerge", "cx"].includes(node.expression.text)
    ) {
      const parts = node.arguments.map((argument) =>
        classStrings(argument, seen),
      );
      return parts.every((part) => part !== undefined)
        ? parts.flatMap((part) => part)
        : undefined;
    }
    if (ts.isArrayLiteralExpression(node)) {
      const parts = node.elements.map((element) => classStrings(element, seen));
      return parts.every((part) => part !== undefined)
        ? parts.flatMap((part) => part)
        : undefined;
    }
    return undefined;
  }

  function report(node: ts.Node, component: string, message: string) {
    violations.push({
      file,
      line: tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1,
      component,
      message,
    });
  }

  function visit(node: ts.Node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(tree);
      const [namespace, member] = tag.split(".");
      const component =
        aliases.get(tag) ??
        (namespace && member && namespaces.has(namespace) ? member : undefined);
      if (component && standardizedComponents.has(component)) {
        const excepted = exceptions.some(
          (exception) =>
            exception.file === file && exception.component === component,
        );
        if (!excepted)
          for (const attribute of node.attributes.properties) {
            if (ts.isJsxSpreadAttribute(attribute)) {
              const spread = attribute.expression;
              if (ts.isObjectLiteralExpression(spread)) {
                if (
                  spread.properties.some(
                    (property) =>
                      property.name?.getText(tree) === "className" ||
                      property.name?.getText(tree) === "style",
                  )
                ) {
                  report(
                    attribute,
                    component,
                    "Appearance cannot be supplied through a JSX spread.",
                  );
                }
              } else
                report(
                  attribute,
                  component,
                  "Use explicit control props so className and style can be checked.",
                );
            } else if (
              attribute.name.getText(tree) === "className" &&
              attribute.initializer
            ) {
              const initializer = attribute.initializer;
              const value = ts.isJsxExpression(initializer)
                ? initializer.expression
                : initializer;
              const strings = value ? classStrings(value) : [];
              if (!strings)
                report(
                  attribute,
                  component,
                  "Unresolved class recipe. Use a typed component variant.",
                );
              else {
                const forbidden = strings
                  .flatMap((value) => value.split(/\s+/u))
                  .filter(
                    (token) =>
                      appearanceClass.test(utilityName(token)) ||
                      /^\[(?:color|background|padding|border|font|height):/u.test(
                        utilityName(token),
                      ),
                  );
                if (forbidden.length)
                  report(
                    attribute,
                    component,
                    `Use component variants for ${[...new Set(forbidden)].join(", ")}.`,
                  );
              }
            } else if (
              attribute.name.getText(tree) === "style" &&
              attribute.initializer
            ) {
              const initializer = attribute.initializer;
              const value = ts.isJsxExpression(initializer)
                ? initializer.expression
                : undefined;
              if (!value || !ts.isObjectLiteralExpression(value))
                report(
                  attribute,
                  component,
                  "Unresolved inline style. Use a typed component variant.",
                );
              else
                for (const property of value.properties) {
                  if (
                    !property.name ||
                    appearanceProperty.test(
                      property.name.getText(tree).replace(/["']/gu, ""),
                    )
                  )
                    report(
                      property,
                      component,
                      "Inline appearance belongs in a component variant.",
                    );
                }
            }
          }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return violations;
}
