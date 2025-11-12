import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
export default function EaseOut() {
  const ballRef = useRef(null);

  useLayoutEffect(() => {
    const ball = ballRef.current;

    gsap.to(ball, {
      x: window.screen.width - 60, // di chuyển 500px sang phải
      duration: 3, // thời gian 3 giây
      ease: "power1.out", // ease-out: bắt đầu nhanh, kết thúc chậm
      repeat: -1, // lặp vô hạn
      yoyo: true, // quay ngược lại khi xong
    });
  }, []);

  return (
    <div className="flex">
      <h1>EaseOut</h1>
      <div
        ref={ballRef}
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#60a5fa",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></div>
      <img
        src="https://miro.medium.com/v2/resize:fit:2000/format:webp/1*JhyE_rYlaad9DQt6VHFeEA.gif"
        alt="Overview Image"
        width={600}
        height={400}
        style={{ display: "block" }}
      />
    </div>
  );
}
