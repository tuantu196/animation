import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export default function GsapDemo() {
  const hoverRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<HTMLDivElement>(null);
  const bounceRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  const staggerRefs = useRef<HTMLDivElement[]>([]);
  const loopRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // 1️⃣ Hover / interactive
    if (hoverRef.current) {
      const el = hoverRef.current;
      el.addEventListener("mouseenter", () => {
        gsap.to(el, {
          scale: 1.3,
          rotation: 10,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }

    // 2️⃣ Entrance / exit
    if (entranceRef.current) {
      gsap.from(entranceRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    }

    // 3️⃣ Bounce / elastic
    if (bounceRef.current) {
      gsap.to(bounceRef.current, {
        y: -50,
        duration: 0.6,
        ease: "bounce.out",
        yoyo: true,
        repeat: -1,
      });
    }

    // 4️⃣ Motion path
    if (pathRef.current) {
      gsap.to(pathRef.current, {
        duration: 5,
        repeat: -1,
        ease: "power1.inOut",
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 300, y: -100 },
            { x: 500, y: 50 },
            { x: 100, y: 150 },
            { x: 0, y: 0 },
          ],
          curviness: 1.5,
          autoRotate: true,
        },
      });
    }

    // 5️⃣ Stagger
    gsap.from(staggerRefs.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
    });

    // 6️⃣ Looping / idle
    if (loopRef.current) {
      gsap.to(loopRef.current, {
        y: -20,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <div className="p-6 space-y-12">
      {/* Hover */}
      <div
        ref={hoverRef}
        className="w-40 h-20 bg-red-300 flex items-center justify-center rounded cursor-pointer"
      >
        Hover Me
      </div>

      {/* Entrance */}
      <div
        ref={entranceRef}
        className="w-40 h-20 bg-blue-300 flex items-center justify-center rounded"
      >
        Entrance
      </div>

      {/* Bounce / elastic */}
      <div
        ref={bounceRef}
        className="w-40 h-20 bg-green-300 flex items-center justify-center rounded"
      >
        Bounce
      </div>

      {/* Motion path */}
      <div
        ref={pathRef}
        className="w-12 h-12 bg-purple-500 rounded-full"
        style={{ position: "absolute", top: 400, left: 50 }}
      ></div>

      {/* Stagger */}
      <div className="flex gap-4">
        {["1", "2", "3", "4", "5"].map((n, i) => (
          <div
            key={i}
            ref={(el) => (staggerRefs.current[i] = el!)}
            className="w-12 h-12 bg-yellow-400 flex items-center justify-center rounded"
          >
            {n}
          </div>
        ))}
      </div>

      {/* Looping / idle */}
      <div
        ref={loopRef}
        className="w-32 h-32 bg-pink-400 flex items-center justify-center rounded-full"
      >
        Floating
      </div>
    </div>
  );
}
