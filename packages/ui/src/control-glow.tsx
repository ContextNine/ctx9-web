"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export function ControlGlow({
  children,
  disabled = false,
}: {
  children: React.ReactNode;
  disabled?: boolean | undefined;
}): React.JSX.Element {
  const [visible, setVisible] = React.useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const moveGlow = React.useCallback(
    (clientX: number, clientY: number, currentTarget: HTMLDivElement) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY],
  );

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible && !disabled ? "100px" : "0px"} circle at ${mouseX}px ${mouseY}px,
            var(--colors-brandPrimary),
            transparent 80%
          )
        `,
      }}
      onMouseMove={(event) => {
        moveGlow(event.clientX, event.clientY, event.currentTarget);
      }}
      onMouseEnter={() => {
        setVisible(true);
      }}
      onMouseLeave={() => {
        setVisible(false);
      }}
      className="group/input rounded-lg p-[2px] transition duration-150"
    >
      {children}
    </motion.div>
  );
}
