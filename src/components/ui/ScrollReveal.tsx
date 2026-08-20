import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Props {
  children: ReactNode;
  direction?: "left" | "right";
  delay?: number;
  className?: string;
}

const ScrollReveal = ({
  children,
  direction = "left",
  delay = 0,
  className = "",
}: Props) => {
  const { ref, style } = useScrollReveal({ delay, direction });

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
