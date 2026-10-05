export type ControlShape =
  | "default"
  | "large"
  | "extraLarge"
  | "pill"
  | "square";

export const controlShapeClassNames: Record<ControlShape, string> = {
  default: "",
  large: "rounded-lg",
  extraLarge: "rounded-xl",
  pill: "rounded-full",
  square: "rounded-none",
};
