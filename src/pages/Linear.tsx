import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Linear() {
  const ballRef = useRef(null);

  useLayoutEffect(() => {
    const ball = ballRef.current;

    // animation tuyến tính: không tăng giảm tốc, di chuyển đều
    gsap.to(ball, {
      x: window.screen.width - 60, // di chuyển 500px sang phải
      duration: 3, // trong 3 giây
      ease: "linear", // tốc độ tuyến tính
      repeat: -1, // lặp vô hạn
      yoyo: true, // quay lại điểm ban đầu
    });
  }, []);
  return (
    <div>
      <h1>Linear</h1>
      <div
        ref={ballRef}
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#4ade80",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></div>
    </div>
  );
}
