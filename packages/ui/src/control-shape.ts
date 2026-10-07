export type ControlShape =
  | "default"
  | "small"
  | "medium"
  | "large"
  | "extraLarge"
  | "pill"
  | "square";

export const controlShapeClassNames: Record<ControlShape, string> = {
  default: "",
  small: "rounded-sm",
  medium: "rounded-md",
  large: "rounded-lg",
  extraLarge: "rounded-xl",
  pill: "rounded-full",
  square: "rounded-none",
};
