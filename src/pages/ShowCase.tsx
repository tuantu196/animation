import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

// toàn bộ danh sách easing bạn đưa
const eases = [
  "none",
  "power1",
  "power1.in",
  "power1.out",
  "power1.inOut",
  "power2",
  "power2.in",
  "power2.out",
  "power2.inOut",
  "power3",
  "power3.in",
  "power3.out",
  "power3.inOut",
  "power4",
  "power4.in",
  "power4.out",
  "power4.inOut",
  "back",
  "back.in",
  "back.out",
  "back.inOut",
  "bounce",
  "bounce.in",
  "bounce.out",
  "bounce.inOut",
  "circ",
  "circ.in",
  "circ.out",
  "circ.inOut",
  "elastic",
  "elastic.in",
  "elastic.out",
  "elastic.inOut",
  "expo",
  "expo.in",
  "expo.out",
  "expo.inOut",
  "sine",
  "sine.in",
  "sine.out",
  "sine.inOut",
];

export default function Showcase() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        x: window.screen.width - 60,
        duration: 5,
        ease: eases[i],
        repeat: -1,
        yoyo: true,
      });
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>GSAP Easing Showcase</h1>
      {eases.map((ease, i) => (
        <div
          key={ease}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div
            ref={(el) => {
              refs.current[i] = el; // <-- Không trả về gì (void)
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: "#60a5fa",
              marginRight: 12,
            }}
          ></div>
          <span style={{ fontFamily: "monospace", fontSize: 14 }}>{ease}</span>
        </div>
      ))}
    </div>
  );
}
