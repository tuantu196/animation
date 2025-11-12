// src/pages/GSAPPluginsDemo.tsx
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(MotionPathPlugin, Draggable, InertiaPlugin, ScrollTrigger);

export default function GSAPPluginsDemo() {
  const ballRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);
  const scrollBoxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // 1️⃣ MotionPathPlugin
    if (ballRef.current && pathRef.current) {
      gsap.to(ballRef.current, {
        duration: 5,
        repeat: -1,
        ease: "power1.inOut",
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
        },
      });
    }

    // 2️⃣ Draggable + InertiaPlugin
    if (draggableRef.current) {
      Draggable.create(draggableRef.current, {
        type: "x,y",
        inertia: true, // InertiaPlugin
        bounds: { minX: 0, maxX: 400, minY: 0, maxY: 300 },
      });
    }

    // 3️⃣ ScrollTrigger
    if (scrollBoxRef.current) {
      gsap.to(scrollBoxRef.current, {
        x: 400,
        rotation: 360,
        scrollTrigger: {
          trigger: scrollBoxRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
          markers: true,
        },
      });
    }
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>GSAP Plugins Demo</h1>

      {/* MotionPath */}
      <h2>MotionPathPlugin</h2>
      <svg width={400} height={200} style={{ border: "1px solid #ccc" }}>
        <path
          ref={pathRef}
          d="M20,100 C100,0 300,200 380,100"
          stroke="lightblue"
          fill="transparent"
        />
        <circle
          ref={ballRef}
          r={15}
          fill="tomato"
          style={{ transformOrigin: "center" }}
        />
      </svg>

      {/* Draggable + Inertia */}
      <h2>Draggable + InertiaPlugin</h2>
      <div
        ref={draggableRef}
        style={{
          width: 60,
          height: 60,
          backgroundColor: "skyblue",
          marginTop: 20,
          cursor: "grab",
        }}
      ></div>

      {/* ScrollTrigger */}
      <h2>ScrollTrigger</h2>
      <div
        style={{
          height: "150vh",
          border: "1px dashed #ccc",
          marginTop: 40,
          padding: 20,
        }}
      >
        <div
          ref={scrollBoxRef}
          style={{
            width: 50,
            height: 50,
            backgroundColor: "green",
          }}
        ></div>
        <p>Scroll down to see the animation triggered!</p>
      </div>
    </div>
  );
}
