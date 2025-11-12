import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export default function InteractiveBallAnimation() {
  const containerRef = useRef(null);
  const circleRef = useRef(null);
  const ballRef = useRef(null);
  const textRefs = useRef([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 🌈 Nền chuyển động
      gsap.to(containerRef.current, {
        background:
          "linear-gradient(135deg, #1e3a8a, #6d28d9, #0ea5e9, #14b8a6)",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // ✨ Text xuất hiện bật nảy
      gsap.from(textRefs.current, {
        y: 200,
        opacity: 0,
        rotation: 30,
        scale: 0.6,
        duration: 1.2,
        ease: "back.out(2.5)",
        stagger: 0.1,
      });

      // 💫 Quả cầu sáng nhỏ bay quanh
      gsap.to(circleRef.current, {
        duration: 5,
        repeat: -1,
        ease: "power1.inOut",
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: 300, y: -120 },
            { x: 600, y: 0 },
            { x: 300, y: 120 },
            { x: 0, y: 0 },
          ],
          curviness: 1.6,
          autoRotate: true,
        },
      });

      // 🔥 Timeline cho cú "sút"
      tlRef.current = gsap.timeline({ paused: true });

      // Quả bóng bay vào
      tlRef.current.fromTo(
        ballRef.current,
        { x: -400, y: -200, scale: 0.8, opacity: 1 },
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.inOut",
        }
      );

      // Khi bóng chạm → chữ văng tung tóe
      tlRef.current.add(() => {
        gsap.to(textRefs.current, {
          x: () => gsap.utils.random(-300, 300),
          y: () => gsap.utils.random(-200, 200),
          rotation: () => gsap.utils.random(-720, 720),
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          ease: "power4.in",
          stagger: 0.03,
        });
      }, "-=0.2");

      // Bóng nảy nhẹ
      tlRef.current.to(
        ballRef.current,
        {
          y: "+=80",
          scale: 1.3,
          duration: 0.3,
          ease: "bounce.out",
          yoyo: true,
          repeat: 1,
        },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 🚀 Khi click container → kích hoạt animation
  const handleShoot = () => {
    if (tlRef.current) tlRef.current.restart();
  };

  return (
    <div
      ref={containerRef}
      onClick={handleShoot}
      style={{
        width: "100%",
        height: "100vh",
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "80px",
          fontWeight: "900",
          letterSpacing: "8px",
          display: "flex",
          textTransform: "uppercase",
        }}
      >
        {"NAVER VIET NAM".split("").map((ch, i) => (
          <span
            key={i}
            ref={(el) => (textRefs.current[i] = el)}
            style={{
              display: "inline-block",
              textShadow: "0 0 20px rgba(255,255,255,0.4)",
              transformOrigin: "center bottom",
              color: "#2db400",
            }}
          >
            {ch}
          </span>
        ))}
      </h1>

      {/* Vòng sáng chuyển động */}
      <div
        ref={circleRef}
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 30%, #f0f, #0ff, transparent)",
          boxShadow: "0 0 40px 10px rgba(255,0,255,0.5)",
          position: "absolute",
          top: "65%",
          left: "calc(50% - 300px)",
        }}
      ></div>

      {/* ⚽ Quả bóng chờ sẵn */}
      <img
        src="/ball.png"
        ref={ballRef}
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 30% 30%, #fff, #0ea5e9, #1e3a8a)",
          boxShadow: "0 0 60px 15px rgba(14,165,233,0.5)",
          position: "absolute",
          left: 100,
          bottom: 100,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
