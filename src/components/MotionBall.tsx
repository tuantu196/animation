import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type MotionBallProps = {
  label: string;
  color?: "blue" | "green" | "pink" | "purple" | "yellow";
  xDistance?: number;
  duration?: number;
  easing?: string;
  enableBlur?: boolean;
};

export default function MotionBall({
  label,
  color = "blue",
  xDistance = 300,
  duration = 2,
  easing = "none",
  enableBlur = false,
}: MotionBallProps) {
  const ballRef = useRef<HTMLDivElement>(null);

  const colorClass =
    color === "blue"
      ? "bg-blue-500"
      : color === "green"
      ? "bg-green-500"
      : color === "pink"
      ? "bg-pink-500"
      : color === "purple"
      ? "bg-purple-500"
      : color === "yellow"
      ? "bg-yellow-400"
      : "bg-gray-500";

  useEffect(() => {
    if (!ballRef.current) return;
    gsap.to(ballRef.current, {
      x: xDistance,
      duration,
      ease: easing,
      repeat: -1,
      yoyo: true,
      onUpdate: enableBlur
        ? () => {
            const el = ballRef.current!;
            const currentX = gsap.getProperty(el, "x") as number;
            const prevX = el.dataset.prevX ? parseFloat(el.dataset.prevX) : 0;
            const velocity = currentX - prevX;
            el.style.filter = `blur(${Math.min(Math.abs(velocity) / 10, 8)}px)`;
            el.dataset.prevX = currentX.toString();
          }
        : undefined,
    });
  }, [xDistance, duration, easing, enableBlur]);

  return (
    <div className="flex flex-col items-center mb-6">
      <h3 className="mb-2 font-semibold text-lg">{label}</h3>
      <div className="relative w-[400px] h-[120px] bg-gray-200 rounded-lg overflow-hidden">
        <div
          ref={ballRef}
          data-prev-x="0"
          className={`absolute top-1/2 left-2 -translate-y-1/2 w-10 h-10 rounded-full ${colorClass}`}
        />
      </div>
    </div>
  );
}
