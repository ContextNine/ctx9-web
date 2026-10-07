import ts from "typescript";
import { resolve } from "node:path";

/** Appearance belongs to component variants; consumers may supply placement. */
export const standardizedComponents = new Set([
  "Button",
  "FunkyLoaderButton",
  "ShimmerBorderButton",
  "CTAActionButton",
  "PriorityPill",
  "ThemeToggle",
  "ButtonGroup",
  "Checkbox",
  "ColorPicker",
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
  "DropdownMenuTrigger",
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
  "AlertDialogOverlay",
  "AlertDialogTrigger",
  "AlertDialogHeader",
  "AlertDialogFooter",
  "AlertDialogTitle",
  "AlertDialogDescription",
  "AlertDialogAction",
  "AlertDialogCancel",
  "PopoverContent",
  "TooltipContent",
  "TooltipTrigger",
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
  "NumberSelect",
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
  "SheetHeader",
  "SheetFooter",
  "SheetTitle",
  "SheetDescription",
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
export interface StylePolicyOptions {
  /** Additional component packages use the same appearance boundary. */
  packages?: readonly string[];
  exceptions?: readonly StyleException[];
  /** Optional consumer type information for otherwise opaque control props. */
  program?: ts.Program;
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
  { packages = [], exceptions = [], program }: StylePolicyOptions = {},
) {
  const checkedSource = program?.getSourceFile(resolve(file));
  const tree =
    checkedSource?.text === source
      ? checkedSource
      : ts.createSourceFile(
          file,
          source,
          ts.ScriptTarget.Latest,
          true,
          ts.ScriptKind.TSX,
        );
  const checker =
    tree === checkedSource ? program?.getTypeChecker() : undefined;
  const aliases = new Map<string, string>();
  const namespaces = new Set<string>();
  const constants = new Map<string, ts.Expression>();
  const violations: StyleViolation[] = [];
  const componentPackages = ["@ctx9/ui", ...packages];

  function collect(node: ts.Node) {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier)
    ) {
      const module = node.moduleSpecifier.text;
      if (
        componentPackages.some(
          (name) => module === name || module.startsWith(`${name}/`),
        )
      ) {
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

  function typedSpreadAppearance(
    expression: ts.Expression,
  ): "appearance" | "opaque" | undefined {
    if (!checker) return "opaque";
    const inspect = (type: ts.Type): "appearance" | "opaque" | undefined => {
      if (
        type.flags &
        (ts.TypeFlags.Any | ts.TypeFlags.Unknown | ts.TypeFlags.TypeParameter)
      )
        return "opaque";
      if (type.isUnion()) {
        const results = type.types.map(inspect);
        return results.includes("appearance")
          ? "appearance"
          : results.includes("opaque")
            ? "opaque"
            : undefined;
      }
      if (
        type.flags &
        (ts.TypeFlags.Undefined | ts.TypeFlags.Null | ts.TypeFlags.Never)
      )
        return undefined;
      if (
        !(type.flags & ts.TypeFlags.Object) ||
        checker.getIndexInfosOfType(type).length
      )
        return "opaque";
      for (const name of ["className", "style"]) {
        const property = checker.getPropertyOfType(type, name);
        if (!property) continue;
        const value = checker.getTypeOfSymbolAtLocation(property, expression);
        const members = value.isUnion() ? value.types : [value];
        if (
          members.some(
            (member) =>
              !(member.flags & (ts.TypeFlags.Never | ts.TypeFlags.Undefined)),
          )
        )
          return "appearance";
      }
      return undefined;
    };
    return inspect(checker.getTypeAtLocation(expression));
  }

  function spreadAppearance(
    expression: ts.Expression,
    seen = new Set<string>(),
  ): "appearance" | "opaque" | undefined {
    if (ts.isParenthesizedExpression(expression))
      return spreadAppearance(expression.expression, seen);
    if (ts.isIdentifier(expression)) {
      if (seen.has(expression.text)) return "opaque";
      const initializer = constants.get(expression.text);
      return initializer
        ? spreadAppearance(initializer, new Set([...seen, expression.text]))
        : "opaque";
    }
    if (!ts.isObjectLiteralExpression(expression)) return "opaque";
    let opaque = false;
    for (const property of expression.properties) {
      if (ts.isSpreadAssignment(property)) {
        const result = spreadAppearance(property.expression, seen);
        if (result === "appearance") return result;
        opaque ||= result === "opaque";
      } else {
        const name = property.name;
        const literal = ts.isComputedPropertyName(name)
          ? name.expression
          : name;
        if (ts.isIdentifier(literal) && !ts.isComputedPropertyName(name)) {
          if (["className", "style"].includes(literal.text))
            return "appearance";
        } else if (ts.isStringLiteralLike(literal)) {
          if (["className", "style"].includes(literal.text))
            return "appearance";
        } else opaque = true;
      }
    }
    return opaque ? "opaque" : undefined;
  }

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
        : finiteTypedClassStrings(node);
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

  function finiteTypedClassStrings(node: ts.Node): string[] | undefined {
    if (!checker) return undefined;
    const type = checker.getTypeAtLocation(node);
    const members = type.isUnion() ? type.types : [type];
    const strings: string[] = [];
    for (const member of members) {
      if (member.isStringLiteral()) strings.push(member.value);
      else if (
        !(
          member.flags &
          (ts.TypeFlags.Undefined | ts.TypeFlags.Null | ts.TypeFlags.Never)
        )
      )
        return undefined;
    }
    return strings;
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
              const syntaxResult = spreadAppearance(attribute.expression);
              const result =
                syntaxResult === "opaque"
                  ? typedSpreadAppearance(attribute.expression)
                  : syntaxResult;
              if (result === "appearance")
                report(
                  attribute,
                  component,
                  "Appearance cannot be supplied through a JSX spread.",
                );
              else if (result === "opaque")
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
