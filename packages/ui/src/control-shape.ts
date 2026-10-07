export type ControlShape =
  | "default"
  | "medium"
  | "large"
  | "extraLarge"
  | "pill"
  | "square";

export const controlShapeClassNames: Record<ControlShape, string> = {
  default: "",
  medium: "rounded-md",
  large: "rounded-lg",
  extraLarge: "rounded-xl",
  pill: "rounded-full",
  square: "rounded-none",
};
