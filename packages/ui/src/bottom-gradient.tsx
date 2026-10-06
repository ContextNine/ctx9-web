const gradientViaClassNames = {
  brandPrimary: {
    primary: "via-brandFunkyStart",
    secondary: "via-brandFunkyEnd",
  },
  black: { primary: "via-white", secondary: "via-mono-100" },
  pink: { primary: "via-yellow-100", secondary: "via-yellow" },
  default: { primary: "via-brandPrimaryLight", secondary: "via-brandPrimary" },
};

export type BottomGradientVariant = keyof typeof gradientViaClassNames;

export function BottomGradient({
  variant = "default",
}: {
  variant?: BottomGradientVariant;
}) {
  const { primary, secondary } = gradientViaClassNames[variant];
  return (
    <>
      <span
        className={`absolute inset-x-0 -bottom-px h-[2px] block mx-auto w-[70%] bg-gradient-to-r from-transparent ${primary} to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100`}
      />
      <span
        className={`absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent ${secondary} to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100`}
      />
    </>
  );
}
