import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
export default function EaseIn() {
  const ballRef = useRef(null);

  useLayoutEffect(() => {
    const ball = ballRef.current;

    gsap.to(ball, {
      x: window.screen.width - 60, // di chuyển 500px sang phải
      duration: 3, // thời gian 3 giây
      ease: "power1.in", // ease-in: bắt đầu chậm, kết thúc nhanh
      repeat: -1, // lặp vô hạn
      yoyo: true, // quay ngược lại khi xong
    });
  }, []);
  return (
    <div className="relative h-48 overflow-hidden">
      <h1>EaseIn</h1>
      <div
        ref={ballRef}
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#60a5fa",
          // position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></div>
      <img
        src="https://miro.medium.com/v2/resize:fit:2000/format:webp/1*4q5Yvr4ROgeasK59AQks2w.gif"
        alt="Overview Image"
        width={600}
        height={400}
        style={{ display: "contain" }}
      />
    </div>
  );
}
